# tests/test_price_calculator.py
from schemas.schemas import CartOutput, CartDetails
from core.config import Settings
from services.services import PriceCalculatorService
import pytest
import sys
from pathlib import Path

# Ajout automatique du chemin racine pour permettre les imports core, services, etc.
root_path = str(Path(__file__).parent.parent)
if root_path not in sys.path:
    sys.path.insert(0, root_path)


@pytest.fixture
def default_config():
    """Fournit la configuration par défaut (chargée depuis .env ou défauts)."""
    return Settings()


@pytest.fixture
def calculator(default_config):
    """Fournit une instance du service avec la config par défaut."""
    return PriceCalculatorService(config=default_config)


class TestPriceCalculator:

    def test_empty_cart(self, calculator):
        """Panier vide → prix = 0."""
        result = calculator.process_cart("")
        assert result.total_price == 0
        assert result.details.bttf_count == 0
        assert result.details.others_count == 0
        assert result.details.saved_amount == 0

    def test_single_bttf_movie(self, calculator):
        """Un seul film BTTF → prix de base sans remise."""
        result = calculator.process_cart("Back to the Future")
        assert result.total_price == calculator.config.PRICE_BTTF
        assert result.details.unique_bttf_count == 1
        assert result.details.discount_applied == "0%"

    def test_two_unique_bttf_movies(self, calculator):
        """2 films BTTF uniques → remise 10%."""
        cart = "Back to the Future\nBack to the Future II"
        result = calculator.process_cart(cart)
        # 2 * 15 * 0.9 = 27
        assert result.total_price == 27.0
        assert result.details.unique_bttf_count == 2
        assert result.details.discount_applied == "10%"

    def test_three_unique_bttf_movies(self, calculator):
        """3 films BTTF uniques → remise 20%."""
        cart = "Back to the Future\nBack to the Future II\nBack to the Future III"
        result = calculator.process_cart(cart)
        # 3 * 15 * 0.8 = 36
        assert result.total_price == 36.0
        assert result.details.unique_bttf_count == 3
        assert result.details.discount_applied == "20%"

    def test_duplicate_bttf_ignored(self, calculator):
        """Les doublons BTTF sont ignorés (comptés une seule fois)."""
        cart = """Back to the Future
Back to the Future
Back to the Future"""
        result = calculator.process_cart(cart)
        # Seul 1 film unique → pas de remise
        assert result.total_price == 36
        assert result.details.unique_bttf_count == 3
        assert result.details.bttf_count == 3
        assert result.details.discount_applied == "20%"

    def test_mix_of_movies(self, calculator):
        """Mix de films BTTF uniques et autres films."""
        cart = """Back to the Future
Back to the Future II
The Matrix
Back to the Future II
Inception"""
        result = calculator.process_cart(cart)
        # Uniques BTTF: 3 → 15 * 3 * 0.8 = 36
        # Others: 2 → 20 * 2 = 40
        # Duplicate BTTF II: ignoré
        # Total: 36 + 40 = 76
        assert result.total_price == 76.0
        assert result.details.unique_bttf_count == 3
        assert result.details.bttf_count == 3
        assert result.details.others_count == 2
        assert result.details.discount_applied == "20%"

    def test_only_other_movies(self, calculator):
        """Panier avec uniquement des films non-BTTF."""
        cart = "The Matrix\nInception\nInterstellar"
        result = calculator.process_cart(cart)
        # 3 * 20 = 60
        assert result.total_price == 60.0
        assert result.details.unique_bttf_count == 0
        assert result.details.others_count == 3
        assert result.details.discount_applied == "0%"
        assert result.details.saved_amount == 0

    def test_case_insensitive_duplicates(self, calculator):
        """Les doublons sont détectés même avec casse différente."""
        cart = """Back to the Future
BACK TO THE FUTURE
back to the future"""
        result = calculator.process_cart(cart)
        # Tous considérés comme le même film → 1 unique
        assert result.details.unique_bttf_count == 3
        assert result.total_price == 36.0

    def test_special_discount_configuration(self):
        """Vérifie que le service accepte une config Star Wars personnalisée."""
        custom_config = Settings(
            SAGA_PREFIX="Star Wars",
            PRICE_BTTF=10.0,
            PRICE_OTHER=25.0,
            DISCOUNT_THRESHOLD_1=2,
            DISCOUNT_RATE_1=0.9,
            DISCOUNT_THRESHOLD_2=4,
            DISCOUNT_RATE_2=0.75
        )
        custom_config.ALLOWED_ORIGINS = ["http://test.com"]

        custom_calc = PriceCalculatorService(config=custom_config)
        cart = "Star Wars\nStar Wars 2\nStar Wars 3\nStar Wars 4"

        result = custom_calc.process_cart(cart)
        # 4 films uniques * 10€ * 0.75 = 30€
        assert result.total_price == 30.0
        assert result.details.unique_bttf_count == 4
        assert result.details.discount_applied == "25%"

    def test_saved_amount_calculation(self, calculator):
        """Vérifie le calcul du montant économisé."""
        cart = "Back to the Future\nBack to the Future II\nBack to the Future III"
        result = calculator.process_cart(cart)
        # Sans remise: 3 * 15 = 45
        # Avec remise 20%: 45 * 0.8 = 36
        # Économisé: 45 - 36 = 9
        assert result.details.saved_amount == 9.0

    def test_performance_large_cart(self, calculator):
        """Test de performance avec un grand panier."""
        import time
        items = [f"Back to the Future {i}" for i in range(50)] + \
                [f"Other Movie {i}" for i in range(50)]
        cart = "\n".join(items)

        start = time.time()
        result = calculator.process_cart(cart)
        duration_ms = (time.time() - start) * 1000

        assert duration_ms < 100
        assert result.details.unique_bttf_count == 50
        assert result.details.others_count == 50
