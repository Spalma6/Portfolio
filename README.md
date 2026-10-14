# Portfolio

## Run the server

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to a valid MongoDB connection string in `.env`.
3. Start the server:

   ```powershell
   node server.js
   ```

The API listens on port `5000` by default. Set `PORT` in `.env` to use a
different port.

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
