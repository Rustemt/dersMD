import { getDb } from "./db";

export type RoomQuestion = {
  prompt: string;
  choices: string[];
  answerIndex: number;
};

export type Room = {
  code: string;
  title: string;
  questions: RoomQuestion[];
  index: number;
  revealed: boolean;
  students: Record<string, { name: string; answers: Record<number, number> }>;
  createdAt: number;
};

function code() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function save(room: Room) {
  const db = getDb();
  db.prepare(
    `INSERT INTO rooms (code, payload, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(code) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at`,
  ).run(room.code, JSON.stringify(room), Date.now());
}

export function createRoom(title: string, questions: RoomQuestion[]): Room {
  const room: Room = {
    code: code(),
    title,
    questions,
    index: 0,
    revealed: false,
    students: {},
    createdAt: Date.now(),
  };
  save(room);
  return room;
}

export function getRoom(c: string): Room | undefined {
  const row = getDb()
    .prepare(`SELECT payload FROM rooms WHERE code = ?`)
    .get(c.toUpperCase()) as { payload: string } | undefined;
  if (!row) return undefined;
  return JSON.parse(row.payload) as Room;
}

export function joinRoom(c: string, name: string) {
  const room = getRoom(c);
  if (!room) return null;
  const id = `${name}-${Math.random().toString(36).slice(2, 6)}`;
  room.students[id] = { name, answers: {} };
  save(room);
  return { room, studentId: id };
}

export function answerRoom(c: string, studentId: string, choiceIndex: number) {
  const room = getRoom(c);
  if (!room || !room.students[studentId]) return null;
  room.students[studentId].answers[room.index] = choiceIndex;
  save(room);
  return room;
}

export function nextQuestion(c: string) {
  const room = getRoom(c);
  if (!room) return null;
  room.revealed = false;
  if (room.index < room.questions.length - 1) room.index += 1;
  save(room);
  return room;
}

export function revealRoom(c: string) {
  const room = getRoom(c);
  if (!room) return null;
  room.revealed = true;
  save(room);
  return room;
}

export function publicRoom(room: Room) {
  const q = room.questions[room.index];
  return {
    code: room.code,
    title: room.title,
    index: room.index,
    total: room.questions.length,
    revealed: room.revealed,
    question: q
      ? {
          prompt: q.prompt,
          choices: q.choices,
          answerIndex: room.revealed ? q.answerIndex : undefined,
        }
      : null,
    students: Object.entries(room.students).map(([id, s]) => ({
      id,
      name: s.name,
      answered: s.answers[room.index] !== undefined,
      choice: room.revealed ? s.answers[room.index] : undefined,
    })),
  };
}
