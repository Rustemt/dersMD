# @dersmd/schema

DersMD `ders.json` paket doğrulayıcı.

```bash
npm i @dersmd/schema
```

```ts
import { validateCoursePackage } from "@dersmd/schema";

const result = validateCoursePackage(json);
if (!result.ok) console.error(result.errors);
```

Yayın: `npm publish --access public` (`packages/schema` içinde, build sonrası).
