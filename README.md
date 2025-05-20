# Driva Backend Service

This Express + TypeScript service powers the loan-application API for the Driva platform.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run in development mode**
   ```bash
   npm run dev
   ```
3. **Build & start**
   ```bash
   npm run build
   npm start
   ```
4. **Run tests**
   ```bash
   npm test
   ```

## Architecture

- **Express** server with JSON body parsing
- **Zod** schemas for runtime input validation
- **Helmet** & **CORS** middleware for security
- **In-memory store** (array) for simplicity
- **Jest** & **Supertest** for unit/API tests

## Testing

- **Unit tests** for `calculateMonthlyPayment` in `src/utils`
- **Integration tests** for `/api/apply` endpoint in `src/routes`

## Next steps

- Swap in a real database (e.g., Postgres)
- Add logging, metrics, & error-tracking
- Dockerize for containerized deployments
