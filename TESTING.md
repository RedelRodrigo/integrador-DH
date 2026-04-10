# Testing

## Unit and integration tests (Jest + React Testing Library)

- Run all: `npm test`
- Watch: `npm run test:watch`
- Coverage: `npm run test:coverage`

## E2E tests (Playwright)

- Install browsers: `npx playwright install`
- Run: `npm run test:e2e`
- UI mode: `npm run test:e2e:ui`

### Environment variables

- `PLAYWRIGHT_BASE_URL` (default: http://localhost:3000)
- `NEXT_DEV_COMMAND` (default: npm run dev)
- `E2E_LOGIN_EMAIL` and `E2E_LOGIN_PASSWORD` to enable the optional login test
