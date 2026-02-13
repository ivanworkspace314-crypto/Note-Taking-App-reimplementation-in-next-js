# ThinkBoard (Next.js)

Reimplementation of the ThinkBoard frontend using Next.js App Router. The existing Express/Mongo backend stays unchanged.

## Prerequisites

- Node.js 18+
- MongoDB connection string

## Environment

Create a `.env.local` file with your Mongo connection string. Optionally set the app URL for server-side fetches.

```
MONGO_URI=your_mongodb_connection_string
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

If `NEXT_PUBLIC_API_BASE_URL` is provided, the app will target that instead of the built-in API routes.

## Development

```
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Routes

- `/` list notes
- `/create` create a note
- `/note/[id]` edit a note
