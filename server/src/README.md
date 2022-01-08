# PERN Template Server

A template Express server using PostgreSQL.

## Structure

The server is split into 3 layers. From innermost to outermost:

- **Data**: repositories
  - `data`: interfaces exposed to outer layers
  - `data-mikro`: PostgreSQL implementation via MikroORM
- **Service**: core business logic
  - `service`: interfaces exposed to outer layers
  - `service-base`: default implementation
- **API**: external-facing interface(s)
  - `api-express-trpc`: RPC API implementation via tRPC and Express

All layers use configuration helpers from `config` and domain object type definitions from `model`.
