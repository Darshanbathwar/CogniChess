from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chess.pgn
import chess.engine
import json
import io
from groq import Groq
import dotenv

app = FastAPI()

# VERY IMPORTANT: Enable CORS so your React frontend can talk to your FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, change this to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=GROQ_API_KEY)

class GameRequest(BaseModel):
    pgn_text: str

# Mocking the ML Payload for speed (Keep this here!)
ml_api_payload = {
  "model_accuracies": {"random_forest": 44.4, "ada_boosting": 55.6},
  "feature_weights": {"blunders": 0.146, "tilt_states": 0.124, "avg_centipawn_loss": 0.73},
  "global_coach_insight": "Based on 150 historical games, your biggest weakness is 'avg_centipawn_loss'."
}

@app.post("/api/analyze")
async def analyze_game(request: GameRequest):
    try:
        # 1. Read the PGN from the frontend
        pgn_io = io.StringIO(request.pgn_text)
        game = chess.pgn.read_game(pgn_io)
        if game is None:
            raise HTTPException(status_code=400, detail="Invalid PGN format")

        # 2. Run the Stockfish + Custom Python Algorithms
        # (PASTE THE ENTIRE 'WITH OPEN' LOOP HERE from our previous master script)
        # ... 
        
        # 3. MOCK DATA FOR IMMEDIATE FRONTEND TESTING
        # Until you paste the full Stockfish loop above, use this mock payload to test the UI instantly!
        mock_response = {
            "predictive_analytics": {"estimated_elo_played": 1785, "elo_justification": "The estimated ELO of 1785 is derived from the high average centipawn loss of 81."},
            "cognitive_computing_profile": {"resilience_score": 44, "psychological_verdict": "With 4 tilt states detected, your cognitive resilience is critically low."},
            "expert_system_playstyle_analysis": {"opening_feedback": "Your 'Tactical & Open' style is prone to early positional concessions.", "middlegame_verdict": "Your 'Aggressive Center-Brawler' style leads to unforced errors."},
            "critical_blunder_deep_dive": {"move_number": 4, "piece_moved": "Pawn", "geometric_flaw": "Playing d4 in this specific e4 structure allows Black to exploit the weakened e4 square."},
            "personalized_training_schedule": [
                {"day": "Day 1", "focus": "Opening Structure & Safety", "drill": "Analyze 10 games where you played e4 and d4 early."},
                {"day": "Day 2", "focus": "Tactical Precision in Chaos", "drill": "Solve 20 tactical puzzles involving forced sequences."},
                {"day": "Day 3", "focus": "Reducing Centipawn Loss", "drill": "Review your last 5 games and identify the single move with the highest CP loss."}
            ]
        }
        return mock_response # When ready, replace this with the actual Groq completion return!

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))