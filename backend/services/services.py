import re
from typing import List, Tuple, Optional
from core.config import settings, Settings
from schemas.schemas import CartOutput, CartDetails


class PriceCalculatorService:
    def __init__(self, config: Optional[Settings] = None):
        self.config = config or settings
        self._bttf_pattern = re.compile(
            rf"^{re.escape(self.config.SAGA_PREFIX)}.*$",
            re.IGNORECASE
        )

    def _parse_items(self, raw_text: str) -> List[str]:
        if not raw_text or not raw_text.strip():
            return []
        return [s for line in raw_text.splitlines() if (s := line.strip())]

    def _categorize_items(self, items: List[str]) -> Tuple[int, int]:
        """Returns (unique_bttf, others) counts only."""
        total_bttf = 0
        others = 0

        for item in items:
            if self._bttf_pattern.match(item):
                # Add to set (automatically handles uniqueness)
                total_bttf += 1
            else:
                others += 1

        return total_bttf, others

    def process_cart(self, raw_text: str) -> CartOutput:
        items = self._parse_items(raw_text)
        unique_c, others_c = self._categorize_items(items)

        # Determine discount rate
        discount_rate = 1.0
        if unique_c >= self.config.DISCOUNT_THRESHOLD_2:
            discount_rate = self.config.DISCOUNT_RATE_2
        elif unique_c >= self.config.DISCOUNT_THRESHOLD_1:
            discount_rate = self.config.DISCOUNT_RATE_1

        # Calculate prices
        subtotal_unique = unique_c * self.config.PRICE_BTTF
        total_unique = subtotal_unique * discount_rate
        saved = subtotal_unique - total_unique

        total_final = total_unique + (others_c * self.config.PRICE_OTHER)
        discount_pc = int(round((1 - discount_rate) * 100))

        return CartOutput(
            total_price=round(total_final, 2),
            details=CartDetails(
                bttf_count=unique_c,
                unique_bttf_count=unique_c,
                others_count=others_c,
                discount_applied=f"{discount_pc}%",
                saved_amount=round(saved, 2)
            )
        )
