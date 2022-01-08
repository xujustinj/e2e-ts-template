# E2E TS Backend Template

A fully-typed backend API server template.

## Structure

The server is split into 3 layers. From innermost to outermost:

- **Data**: domain object repositories
  - `/src/data`: interfaces exposed to outer layers
  - `/src/data-mikro-postgres`: PostgreSQL implementation via MikroORM
- **Service**: core business logic
  - `/src/service`: interfaces exposed to outer layers
  - `/src/service-base`: default implementation
- **API**: external-facing interface(s)
  - `/src/api-express-trpc`: RPC API implementation via tRPC and Express

All layers use configuration helpers from `config` and domain object type definitions from `model`.
