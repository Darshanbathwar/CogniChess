# DS Miniproject

Full-stack application with a **React + TailwindCSS v4** frontend and a **FastAPI** backend.

## Project Structure

```
├── frontend/          # React + Vite + TailwindCSS v4
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/           # FastAPI
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server runs at [http://localhost:5173](http://localhost:5173).

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at [http://localhost:8000](http://localhost:8000).
Docs available at [http://localhost:8000/docs](http://localhost:8000/docs).
