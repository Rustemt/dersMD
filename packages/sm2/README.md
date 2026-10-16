# @dersmd/sm2

Minimal SM-2 spaced repetition helpers.

```bash
npm i @dersmd/sm2
```

```ts
import { createCardState, reviewCard } from "@dersmd/sm2";

let card = createCardState("q1");
card = reviewCard(card, 2); // good
```
