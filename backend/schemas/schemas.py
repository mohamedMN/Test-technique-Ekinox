from pydantic import BaseModel


class CartDetails(BaseModel):
    bttf_count: int
    unique_bttf_count: int
    others_count: int
    discount_applied: str
    saved_amount: float


class CartOutput(BaseModel):
    total_price: float
    details: CartDetails


class CartInput(BaseModel):
    raw_text: str
