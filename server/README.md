# PERN Template Server

A template Express server using PostgreSQL.

## Structure

The server is split into 3 layers. From innermost to outermost:

- **Data**: repositories
  - `data` contains the interfaces exposed to outer layers
- **Service**: core business logic
  - `service` contains the interfaces exposed to outer layers
- **API**: external-facing interface(s)

All layers use configuration helpers from `config` and domain object type definitions from `model`.
