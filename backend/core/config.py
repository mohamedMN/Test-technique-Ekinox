# core/config.py
import json
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Variables simples
    SAGA_PREFIX: str
    PRICE_BTTF: float
    PRICE_OTHER: float
    DISCOUNT_THRESHOLD_1: int
    DISCOUNT_RATE_1: float
    DISCOUNT_THRESHOLD_2: int
    DISCOUNT_RATE_2: float
    PROJECT_NAME: str
    VERSION: str

    # Configuration CORS
    ALLOWED_ORIGINS: List[str]

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        # Si c'est déjà une liste, on la renvoie
        if isinstance(v, list):
            return v
        # Si c'est une chaîne de caractères (venant du .env), on la décode comme du JSON
        if isinstance(v, str) and v.startswith("["):
            return json.loads(v)
        # Sinon, on suppose que c'est une chaîne séparée par des virgules
        elif isinstance(v, str):
            return [i.strip() for i in v.split(",")]
        return v

    class Config:
        env_file = ".env"
        case_sensitive = True  


settings = Settings()
