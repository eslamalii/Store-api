# store-api

## Project Structure

```
.
src
  ├── config
  │   └── db.ts
  ├── controllers
  │   ├── category.controller.ts
  │   └── product.controller.ts
  ├── interfaces
  │   ├── ICategoryService.ts
  │   └── IProductService.ts
  ├── middleware
  │   ├── asyncHandler.ts
  │   ├── errorHandler.ts
  │   └── validation
  │       ├── category.validation.ts
  │       ├── product.validation.ts
  │       └── validationZod.ts
  ├── routes
  │   ├── category.routes.ts
  │   ├── index.ts
  │   └── product.routes.ts
  ├── services
  │   ├── category.service.ts
  │   └── product.service.ts
  └── server.ts

```

---

## Running with Docker

Copy `.env.example` to `.env` and fill in your database credentials.

Build and start the containers:

```bash
docker-compose up --build
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

## Postman

Project's Collection : https://documenter.getpostman.com/view/19860605/2sB2j1gXQj

---

This project was created using `bun init` in bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
