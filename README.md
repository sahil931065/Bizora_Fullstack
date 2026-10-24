# Bizora

Bizora is a premium business-acquisition marketplace for buyers and sellers. The public landing page, business discovery experience, and visual system are preserved. The project now includes business profiles, account flows, buyer and seller workspaces, saved opportunities, seller listings, private inquiries, and an administrator moderation API.

## Product areas

- **Public marketplace:** home, browse/search/filter/sort, business profiles, similar opportunities, and due-diligence guidance.
- **Buyer workspace:** preview or API-backed account access, saved businesses, inquiry inbox, and conversation replies.
- **Seller workspace:** listing submission, review status, and buyer conversations.
- **Moderation:** administrator-only API for reviewing, approving, or rejecting submitted listings. There is no public admin registration path.
- **Preview mode:** when `VITE_API_URL` is not set, the browser provides clearly labeled sample-data workspaces using local storage. This mode is for product review only; it is not authentication and should not be used for private or real financial information.

## Frontend

Requirements: Node.js compatible with the Vite version in `package.json`.

```sh
npm install
npm run dev
```

The Vite development server runs at the address shown in the terminal, normally `http://localhost:5173`.

## API and database

The API uses Node.js, Express, and MongoDB. No credentials or production data are included.

1. Install the API dependencies: `npm install --prefix server`
2. Copy `server/.env.example` to `server/.env`.
3. Set `MONGODB_URI` to your MongoDB connection string and `JWT_SECRET` to a randomly generated value of at least 32 characters. Set `CLIENT_ORIGIN` to the frontend origin.
4. Start the API with `npm run api` (or `npm --prefix server run start`).
5. Copy the root `.env.example` to `.env`. Set `VITE_API_URL=http://localhost:4000`, then restart Vite.

The API refuses to start without the database URI and signing secret. Keep real `.env` files private; the repository ignores them. The frontend uses the API for sign-in/register, published listings, saved businesses, inquiry threads, and seller listing creation once configured.

### API routes

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/businesses`, `GET /api/businesses/:id`, `GET /api/businesses/mine`, `POST /api/businesses`, `PATCH /api/businesses/:id`
- `GET /api/users/me/saved`, `POST /api/users/me/saved/:businessId`, `DELETE /api/users/me/saved/:businessId`
- `GET /api/inquiries`, `POST /api/inquiries`, `POST /api/inquiries/:id/messages`, `PATCH /api/inquiries/:id/status`
- `GET /api/admin/businesses/pending`, `PATCH /api/admin/businesses/:id`
- `GET /api/health`

Registration supports buyer and seller roles only. To provision an administrator, create a normal account and grant the `admin` role through a trusted database administration process. Never expose database credentials or an admin seed password in frontend code.

## Important limits

The included business cards are sample UI data. They are not verified businesses or real financial disclosures. Use the backend and reviewed listings before accepting real seller information. Before production, configure HTTPS, a production CORS origin, secure authentication/session storage, email verification and password recovery, privacy/terms, audit logs for moderation, backups, and monitoring. The source is published on GitHub; the app and API have not been deployed.
