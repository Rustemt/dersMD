# npm yayınlama

```bash
npm login
npm run build -w @dersmd/schema && npm publish -w @dersmd/schema --access public
npm run build -w @dersmd/sm2 && npm publish -w @dersmd/sm2 --access public
npm run build -w @dersmd/cli && npm publish -w @dersmd/cli --access public
```

Not: Kapsamlı paketler (`@dersmd/...`) için npm’de `dersmd` organization’ı yoksa önce oluştur veya isimleri scope’suz yayınla.
