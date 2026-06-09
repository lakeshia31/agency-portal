# API Contracts - Berra Durur Hafızlık Davetiyesi

## Backend Endpoints (FastAPI, prefix `/api`)

### 1. `POST /api/wishes`
Yeni tebrik mesajı oluşturur.

**Request body:**
```json
{
  "name": "string (required, 2-100 chars)",
  "status": "katilacagim | katilamayacagim",
  "people": 1,  // int, 1-10, only if status==katilacagim
  "message": "string (required, 2-500 chars)"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "...",
  "status": "...",
  "people": 1,
  "message": "...",
  "created_at": "2026-06-09T16:30:00Z"
}
```

### 2. `GET /api/wishes`
Tüm yorumları döner, en yeni en üstte. (limit 500)

**Response (200):**
```json
[
  { id, name, status, people, message, created_at },
  ...
]
```

### 3. `GET /api/wishes/stats`
Özet sayılar.

**Response:**
```json
{
  "total": 12,
  "attending": 8,
  "not_attending": 4,
  "total_people": 18
}
```

## Mongo Collection
`wishes`
- `_id`: uuid string (we use `id` field instead of Mongo ObjectId for JSON-safe)
- `name`, `status`, `people`, `message`, `created_at`

## Frontend changes (replace mock + localStorage):
- `mock.js` -> keep `INVITATION_DATA`, remove `INITIAL_WISHES`.
- `App.js` -> remove localStorage logic, fetch `/api/wishes` on mount.
- `RSVPForm.jsx` -> POST to `/api/wishes`, on success caller refetches list.
- After submit, frontend re-fetches the list to include the new entry.

## Display formatting
- `created_at` is rendered client-side as "X dakika/saat/gün önce" + Turkish date.
