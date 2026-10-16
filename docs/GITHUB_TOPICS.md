# GitHub Topics

Repo → About → ⚙️ → Topics:

```
education
nextjs
turkey
open-source
spaced-repetition
quiz
markdown
typescript
```

API (token ile):

```bash
gh api -X PUT repos/Rustemt/dersMD/topics \
  -f names[]=education -f names[]=nextjs -f names[]=turkey \
  -f names[]=open-source -f names[]=spaced-repetition \
  -f names[]=quiz -f names[]=markdown -f names[]=typescript
```
