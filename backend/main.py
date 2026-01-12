# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Imports de nos modules propres
from core.config import settings
from schemas.schemas import CartInput, CartOutput
from services.services import PriceCalculatorService
from api.endpoints import router as api_router


# 1. Initialisation de l'App
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

# 2. Configuration de la Sécurité (CORS)
# C'est ici qu'on autorise React à parler à Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,  # Vient de config.py
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],  # Autorise tous les headers
)

# 3. Instanciation du Service
# (Dans un gros projet, on utiliserait l'injection de dépendances ici)
calculator_service = PriceCalculatorService()

# Inclusion des routes
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


