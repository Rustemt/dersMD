import * as vscode from "vscode";

type ValidationResult = { ok: boolean; errors: string[] };

function validateCoursePackage(raw: unknown): ValidationResult {
  const errors: string[] = [];
  if (!raw || typeof raw !== "object") {
    return { ok: false, errors: ["Kök değer bir nesne olmalı."] };
  }
  const obj = raw as Record<string, unknown>;
  for (const key of ["id", "title", "level", "summary", "audience"] as const) {
    if (typeof obj[key] !== "string" || !(obj[key] as string).trim()) {
      errors.push(`"${key}" dolu bir metin olmalı.`);
    }
  }
  if (typeof obj.minutes !== "number" || obj.minutes <= 0) {
    errors.push('"minutes" pozitif sayı olmalı.');
  }
  if (!Array.isArray(obj.lessons) || obj.lessons.length === 0) {
    errors.push('"lessons" en az bir ders içermeli.');
  } else {
    obj.lessons.forEach((lesson, i) => {
      if (!lesson || typeof lesson !== "object") {
        errors.push(`lessons[${i}] nesne olmalı.`);
        return;
      }
      const L = lesson as Record<string, unknown>;
      if (typeof L.id !== "string") errors.push(`lessons[${i}].id eksik.`);
      if (typeof L.title !== "string") errors.push(`lessons[${i}].title eksik.`);
      if (!Array.isArray(L.body) || L.body.length === 0) {
        errors.push(`lessons[${i}].body boş olamaz.`);
      }
      const quiz = L.quiz as Record<string, unknown> | undefined;
      if (!quiz || typeof quiz !== "object") {
        errors.push(`lessons[${i}].quiz gerekli.`);
      } else if (!Array.isArray(quiz.choices) || quiz.choices.length < 2) {
        errors.push(`lessons[${i}].quiz.choices en az 2 şık olmalı.`);
      } else if (
        typeof quiz.answerIndex !== "number" ||
        quiz.answerIndex < 0 ||
        quiz.answerIndex >= quiz.choices.length
      ) {
        errors.push(`lessons[${i}].quiz.answerIndex geçersiz.`);
      }
    });
  }
  return { ok: errors.length === 0, errors };
}

export function activate(context: vscode.ExtensionContext) {
  const diag = vscode.languages.createDiagnosticCollection("dersmd");
  context.subscriptions.push(diag);

  const run = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== "json") {
      vscode.window.showWarningMessage("Açık bir JSON dosyası seç.");
      return;
    }
    const text = editor.document.getText();
    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      vscode.window.showErrorMessage("JSON parse hatası.");
      return;
    }
    const result = validateCoursePackage(raw);
    const uri = editor.document.uri;
    if (result.ok) {
      diag.delete(uri);
      vscode.window.showInformationMessage("DersMD: paket geçerli.");
      return;
    }
    const range = new vscode.Range(0, 0, 0, 1);
    diag.set(uri, [
      new vscode.Diagnostic(
        range,
        result.errors.join(" | "),
        vscode.DiagnosticSeverity.Error,
      ),
    ]);
    vscode.window.showErrorMessage(`DersMD: ${result.errors[0]}`);
  };

  context.subscriptions.push(
    vscode.commands.registerCommand("dersmd.validatePackage", run),
  );
}

export function deactivate() {}
