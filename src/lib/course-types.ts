export type Quiz = {
  prompt: string;
  choices: string[];
  answerIndex: number;
  explain: string;
};

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  body: string[];
  quiz: Quiz;
};

export type Course = {
  id: string;
  title: string;
  level: string;
  minutes: number;
  summary: string;
  audience: string;
  lessons: Lesson[];
};
