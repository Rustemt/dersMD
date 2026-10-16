import bank from "../../content/questions/matematik-oran.json";

export type BankQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explain: string;
};

export type QuestionBank = {
  id: string;
  title: string;
  topic: string;
  questions: BankQuestion[];
};

export function getBanks(): QuestionBank[] {
  return [bank as QuestionBank];
}
