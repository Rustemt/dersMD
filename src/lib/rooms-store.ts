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

const g = globalThis as unknown as { __dersmdRooms?: Map<string, Room> };

function store() {
  if (!g.__dersmdRooms) g.__dersmdRooms = new Map();
  return g.__dersmdRooms;
}

function code() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
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
  store().set(room.code, room);
  return room;
}

export function getRoom(c: string) {
  return store().get(c.toUpperCase());
}

export function joinRoom(c: string, name: string) {
  const room = getRoom(c);
  if (!room) return null;
  const id = `${name}-${Math.random().toString(36).slice(2, 6)}`;
  room.students[id] = { name, answers: {} };
  return { room, studentId: id };
}

export function answerRoom(
  c: string,
  studentId: string,
  choiceIndex: number,
) {
  const room = getRoom(c);
  if (!room || !room.students[studentId]) return null;
  room.students[studentId].answers[room.index] = choiceIndex;
  return room;
}

export function nextQuestion(c: string) {
  const room = getRoom(c);
  if (!room) return null;
  room.revealed = false;
  if (room.index < room.questions.length - 1) room.index += 1;
  return room;
}

export function revealRoom(c: string) {
  const room = getRoom(c);
  if (!room) return null;
  room.revealed = true;
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
