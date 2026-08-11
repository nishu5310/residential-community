# MI PASS — HL City
Full-stack foundation for:
- My Society
- My Services
- My Life

## Stack
Frontend: Next.js + React + TypeScript
Backend: Python + FastAPI
Database: PostgreSQL
Cache/jobs: Redis
Deployment: Docker

## Run backend
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload

API: http://127.0.0.1:8000
Docs: http://127.0.0.1:8000/docs

## Run frontend
cd frontend
npm install
npm run dev

Website: http://localhost:3000

The current project contains a polished MVP frontend and a structured backend/database foundation. Configure real OTP, authentication, notifications, storage and production secrets before deployment.
