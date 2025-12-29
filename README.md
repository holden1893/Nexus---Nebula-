# Nexus Nebula Universe (Next.js + FastAPI monorepo)

This is a Replit-ready monorepo built from the recommended code in our chat:
- FastAPI backend with async SQLAlchemy marketplace
- Next.js frontend marketplace page
- Docker + GitHub Actions scaffold

## Run locally (dev)

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
# set API base if needed
cp .env.local.example .env.local
npm run dev
```

Open:
- Frontend: http://localhost:3000/marketplace
- Backend: http://localhost:8000/health

## Run with Docker
```bash
docker compose up --build
```

Open:
- Frontend: http://localhost:3000/marketplace
- Backend: http://localhost:8000/health

## Notes
- `backend/app/auth.py` is a demo stub. Replace with real auth before production.
- Stripe keys go in environment variables (never commit secrets).
