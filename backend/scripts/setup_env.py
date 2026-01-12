# scripts/setup_env.py
import os
from pathlib import Path


def create_env_file():
    """Crée un fichier .env d'exemple."""
    env_content = """# Configuration du calculateur de prix
SAGA_PREFIX="Back to the Future"
PRICE_BTTF=15.0
PRICE_OTHER=20.0
DISCOUNT_THRESHOLD_1=2
DISCOUNT_RATE_1=0.9
DISCOUNT_THRESHOLD_2=3
DISCOUNT_RATE_2=0.8
"""

    env_path = Path(".env")
    if not env_path.exists():
        env_path.write_text(env_content)
        print("Fichier .env créé avec succès!")
    else:
        print("Le fichier .env existe déjà.")


if __name__ == "__main__":
    create_env_file()
