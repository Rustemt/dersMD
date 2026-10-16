/** Minimal SM-2 style scheduling for flashcards. */
export type CardState = {
  id: string;
  ease: number;
  interval: number;
  repetitions: number;
  due: number;
};

export function createCardState(id: string, now?: number): CardState {
  const t = now ?? Date.now();
  return { id, ease: 2.5, interval: 0, repetitions: 0, due: t };
}

/** grade: 0 again, 1 hard, 2 good, 3 easy */
export function reviewCard(
  state: CardState,
  grade: 0 | 1 | 2 | 3,
  now?: number,
): CardState {
  const t = now ?? Date.now();
  let { ease, interval, repetitions } = state;

  if (grade === 0) {
    repetitions = 0;
    interval = 0;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 3;
    else interval = Math.round(interval * ease);

    repetitions += 1;
    ease = Math.max(1.3, ease + (0.1 - (3 - grade) * (0.08 + (3 - grade) * 0.02)));
  }

  const dayMs = 24 * 60 * 60 * 1000;
  return {
    ...state,
    ease,
    interval,
    repetitions,
    due: t + interval * dayMs,
  };
}
