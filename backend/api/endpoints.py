from fastapi import APIRouter, HTTPException
from core.config import settings
from schemas.schemas import CartInput, CartOutput
from services.services import PriceCalculatorService

# Création du routeur
router = APIRouter()

# Instanciation du service
calculator_service = PriceCalculatorService()
@router.get("/")
def health_check():
    """Route simple pour vérifier que l'API tourne."""
    return {"status": "online", "project": settings.PROJECT_NAME}


@router.post("/calculate", response_model=CartOutput)
def calculate_price(cart: CartInput):
    """
    Reçoit un panier brut, appelle le service de calcul, 
    et retourne le prix formaté.
    """
    try:
        # On délègue tout le travail complexe au service
        result = calculator_service.process_cart(cart.raw_text)
        return result
    except Exception as e:
        # En cas de crash imprévu, on renvoie une erreur 500 propre
        raise HTTPException(status_code=500, detail=str(e))
