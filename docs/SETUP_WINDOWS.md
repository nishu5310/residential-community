# Windows setup

## Backend
cd D:\Downloads\MI_PASS_HL_CITY_COMPLETE\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload

Do NOT run `python main.py` from the project root because `main.py` is located at `backend/app/main.py`.

## Frontend
cd D:\Downloads\MI_PASS_HL_CITY_COMPLETE\frontend
npm install
npm run dev
