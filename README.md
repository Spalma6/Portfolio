# Portfolio

## Run the server

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to a valid MongoDB connection string in `.env`.
3. Set `JWT_SECRET` and the administrator variables in `.env`. 
4. Provide a bcrypt hash in `ADMIN_PASSWORD_HASH`
5. Start the server:

   ```powershell
   node server.js
   ```

The API listens on port `5000` by default. Set `PORT` in `.env` to use a
different port.

## Authentication

Register and sign in with JSON requests:

```text
POST /api/users
POST /auth/signup
POST /auth/signin
POST /api/users/login
```

Both successful responses include a JWT in `token`. Send it on protected
requests as `Authorization: Bearer <token>`. For example,
`GET /api/users/<userId>` returns `401` without a token and returns the user
with a valid token. Sign out with `POST /api/users/logout` (or
`POST /auth/signout`); this stateless JWT design clears the cookie and requires
the client to remove its stored bearer token. Existing access tokens remain
valid until they expire.

The React client stores the access token in `localStorage` under
`portfolio_access_token` and sends it only in the Authorization header. This
keeps the JWT out of source code and screenshots; clear the key when signing
out. Server-side authorization remains authoritative, so regular users cannot
mutate records even if they call the API directly.

On startup, the server upserts the administrator identified by
`ADMIN_EMAIL`, using `ADMIN_NAME` and the bcrypt `ADMIN_PASSWORD_HASH`.
`GET /api/admin` requires a valid administrator JWT; a missing or invalid token
returns `401`, and a non-administrator token returns `403`.

## Retrieve data with Postman

Start the API with `node server.js`, then send requests to:

```text
GET http://localhost:5000/api/projects
GET http://localhost:5000/api/qualifications
GET http://localhost:5000/api/contacts
GET http://localhost:5000/api/users
```

For requests that create or update records, select **Body > raw > JSON** and
set the `Content-Type: application/json` header. For example:

```json
{
  "title": "Portfolio website",
  "completionDate": "2026-10-14",
  "description": "Personal portfolio project"
}
```

An empty array (`[]`) means the request succeeded but the selected MongoDB
collection has no records yet. A `500` response generally means the MongoDB
connection configured in `.env` cannot be reached.

### API verification

In Postman, create requests for the following sequence. Save the `token` from
signup or signin as a collection variable and use it as a Bearer Token on the
protected requests:

1. `POST /auth/signup` with `{ "name": "...", "email": "...", "password": "..." }`
   returns `201` and a JWT.
2. `POST /auth/signin` with the same email and password returns `200` and a
   JWT.
3. `GET /api/admin` without a token returns `401`.
4. `GET /api/admin` with the seeded administrator token returns `200`.
5. `POST /auth/signout` returns `200`; remove the collection's token because
   existing stateless JWTs remain valid until expiry.

The client provides `/signup`, `/signin`, and `/admin` routes. The admin
dashboard supports create, read, update, and delete operations for projects,
qualifications, and contact submissions. Public project and qualification
pages read from the API, while the contact form creates a backend contact
submission and displays loading, success, validation, and error states.
