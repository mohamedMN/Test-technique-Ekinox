markdown# 🎬 DVD Store API

A FastAPI service that calculates prices for DVD shopping carts with special discounts for the "Back to the Future" saga.

---

## 🚀 Quick Start

```bash
# Clone and navigate
git clone
cd backend

# Setup virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# or
.\.venv\Scripts\Activate.ps1  # Windows

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload --port 8000

# Test
curl http://127.0.0.1:8000/
```

---

## 📁 Project Structure

```
backend/
├── main.py                      # FastAPI app and routes
├── core/
│   └── config.py               # Application settings
├── services/
│   └── services.py             # Business logic
├── schemas/
│   └── schemas.py              # Pydantic models
├── tests/
│   └── test_price_calculator.py
└── requirements.txt
```

---

## 🔧 Configuration

Edit `core/config.py` to customize pricing and discounts:

| Setting                | Default                | Description                   |
| ---------------------- | ---------------------- | ----------------------------- |
| `SAGA_PREFIX`          | `"Back to the Future"` | Saga identifier               |
| `PRICE_BTTF`           | `15.0`                 | Price per saga DVD (€)        |
| `PRICE_OTHER`          | `20.0`                 | Price per other DVD (€)       |
| `DISCOUNT_THRESHOLD_1` | `2`                    | Min unique titles for 10% off |
| `DISCOUNT_THRESHOLD_2` | `3`                    | Min unique titles for 20% off |

---

## 📡 API Endpoints

### `GET /` - Health Check

**Response:**

```json
{
  "status": "online",
  "project": "DVD Store API"
}
```

### `POST /calculate` - Calculate Cart Total

**Request:**

```json
{
  "raw_text": "Back to the Future 1\nBack to the Future 2\nThe Matrix"
}
```

**Response:**

```json
{
  "total_price": 47.0,
  "details": {
    "bttf_count": 2,
    "unique_bttf_count": 2,
    "duplicate_bttf_count": 0,
    "others_count": 1,
    "discount_applied": "10%",
    "saved_amount": 3.0
  }
}
```

---

## 💰 Pricing Rules

### Discount Tiers

| Unique BTTF Titles | Discount | Example (2 BTTF + 1 Other) |
| ------------------ | -------- | -------------------------- |
| 1                  | 0%       | 15€ + 20€ = **35€**        |
| 2                  | 10%      | 27€ + 20€ = **47€**        |
| 3+                 | 20%      | 36€ + 20€ = **56€**        |

**Note:** Only unique saga titles count toward discount eligibility. Duplicates are charged full price without additional discount.

---

## 🧪 Testing

```bash
# Run all tests
pytest tests/ -v

# With coverage
pytest tests/ --cov=services --cov-report=html

# Performance tests only
pytest tests/ -k performance -v
```

---

## 📝 Usage Examples

### cURL

```bash
curl -X POST "http://127.0.0.1:8000/calculate" \
  -H "Content-Type: application/json" \
  -d '{"raw_text":"Back to the Future 1\nBack to the Future 2\nInception"}'
```

### Python

```python
import requests

response = requests.post(
    "http://127.0.0.1:8000/calculate",
    json={"raw_text": "Back to the Future 1\nBack to the Future 2\nInception"}
)
print(response.json())
```

### JavaScript

```javascript
fetch("http://127.0.0.1:8000/calculate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    raw_text: "Back to the Future 1\nBack to the Future 2\nInception",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

## 🛠️ Development

### Run with auto-reload

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Environment Setup (Windows PowerShell)

```powershell
# If execution policy blocks activation:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then activate
.\.venv\Scripts\Activate.ps1
```

---

## 📦 Requirements

- Python 3.11+
- FastAPI
- Uvicorn
- Pydantic Settings
- Pytest (testing)

use this command in shell :

    pip install -r .\requirements.txt

---

## 📄 License

MIT License
