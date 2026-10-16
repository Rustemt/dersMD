import matematik from "../../content/questions/matematik-oran.json";
import turkce from "../../content/questions/turkce-paragraf.json";
import fen from "../../content/questions/fen-kuvvet.json";
import denklem from "../../content/questions/matematik-denklem.json";

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
  return [
    matematik as QuestionBank,
    denklem as QuestionBank,
    turkce as QuestionBank,
    fen as QuestionBank,
  ];
}
