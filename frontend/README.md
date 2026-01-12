# 🎬 DVD Store API

A simple FastAPI service that calculates prices for a DVD shopping cart with special discounts for the "Back to the Future" saga.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Pricing Rules](#pricing-rules)
- [Testing](#testing)
- [Examples](#examples)

---

## Overview

This backend service exposes two endpoints:

| Endpoint     | Method | Description                          |
| ------------ | ------ | ------------------------------------ |
| `/`          | GET    | Health check                         |
| `/calculate` | POST   | Calculate total price from cart text |

### Key Features

- ✅ Recognizes DVD titles starting with a configurable saga prefix (default: `"Back to the Future"`)
- ✅ Applies discounts based on the number of **unique** saga titles
- ✅ Duplicate saga entries are **ignored** (only unique titles count)
- ✅ Case-insensitive duplicate detection

---

## Project Structure

backend/
├── main.py # FastAPI app and routes
├── core/
│ └── config.py # Application settings (prices, discounts, CORS)
├── services/
│ └── services.py # Business logic (price calculation)
├── schemas/
│ └── schemas.py # Request/Response Pydantic models
├── tests/
│ └── test_price_calculator.py # Unit tests
├── requirements.txt # Python dependencies
└── README.md

text

---

## Requirements

- **Python 3.11+**
- Dependencies (see `requirements.txt`):
  - `fastapi`
  - `uvicorn`
  - `pydantic-settings`
  - `pytest` (for testing)

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd backend
2. Create a virtual environment
Windows (PowerShell)
PowerShell

python -m venv .venv
.\.venv\Scripts\Activate.ps1

# If blocked by execution policy, run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Windows (Command Prompt)
bat

python -m venv .venv
.venv\Scripts\activate.bat
macOS / Linux
Bash

python3 -m venv .venv
source .venv/bin/activate
3. Install dependencies
Bash

pip install --upgrade pip
pip install -r requirements.txt
Configuration
All settings are in core/config.py. You can customize:

Setting	Default	Description
SAGA_PREFIX	"Back to the Future"	Prefix to identify saga titles
PRICE_BTTF	15.0	Price for saga DVDs
PRICE_OTHER	20.0	Price for non-saga DVDs
DISCOUNT_THRESHOLD_1	2	Min unique titles for 1st discount
DISCOUNT_RATE_1	0.9	10% discount multiplier
DISCOUNT_THRESHOLD_2	3	Min unique titles for 2nd discount
DISCOUNT_RATE_2	0.8	20% discount multiplier
Running the Server
Bash

uvicorn main:app --reload --host 0.0.0.0 --port 8000
Once running, access the API documentation:

Documentation	URL
Swagger UI	http://127.0.0.1:8000/docs
ReDoc	http://127.0.0.1:8000/redoc
API Endpoints
1. Health Check
http

GET /
Response:

JSON

{
  "status": "online",
  "project": "DVD Store API"
}
2. Calculate Price
http

POST /calculate
Content-Type: application/json
Request Body:

JSON

{
  "raw_text": "Back to the Future\nBack to the Future II\nThe Matrix"
}
📝 Each line in raw_text represents one DVD in the cart.

Response:

JSON

{
  "total_price": 47.0,
  "details": {
    "bttf_count": 2,
    "unique_bttf_count": 2,
    "others_count": 1,
    "discount_applied": "10%",
    "saved_amount": 3.0
  }
}
Response Fields:

Field	Description
total_price	Final price after discounts
bttf_count	Number of unique saga DVDs
unique_bttf_count	Same as bttf_count
others_count	Number of non-saga DVDs
discount_applied	Discount percentage applied
saved_amount	Amount saved from discount
Pricing Rules
text

┌─────────────────────────────────────────────────────────┐
│                    DISCOUNT TIERS                       │
├─────────────────────────────────────────────────────────┤
│  Unique BTTF DVDs  │  Discount  │  Example (3 DVDs)    │
├────────────────────┼────────────┼──────────────────────┤
│       1            │    0%      │  1 × 15 = 15€        │
│       2            │   10%      │  2 × 15 × 0.9 = 27€  │
│       3+           │   20%      │  3 × 15 × 0.8 = 36€  │
└─────────────────────────────────────────────────────────┘

⚠️ Note: Duplicate saga titles are IGNORED (not counted or charged)
Testing
Run all tests
Bash

pytest tests/ -v
Run with coverage report
Bash

pytest tests/ --cov=services --cov-report=html
Run performance tests only
Bash

pytest tests/ -k performance -v
Examples
Using cURL
Bash

curl -X POST "http://127.0.0.1:8000/calculate" \
  -H "Content-Type: application/json" \
  -d '{"raw_text":"Back to the Future\nBack to the Future II\nThe Matrix"}'
Using PowerShell
PowerShell

$body = @{
    raw_text = "Back to the Future`nBack to the Future II`nThe Matrix"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/calculate" -Method POST -Body $body -ContentType "application/json"
Using Python
Python

import requests

response = requests.post(
    "http://127.0.0.1:8000/calculate",
    json={"raw_text": "Back to the Future\nBack to the Future II\nThe Matrix"}
)
print(response.json())
Quick Start Summary
Bash

# 1. Create virtual environment
python -m venv .venv

# 2. Activate it
source .venv/bin/activate  # Linux/Mac
# or
.\.venv\Scripts\Activate.ps1  # Windows PowerShell

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run server
uvicorn main:app --reload --port 8000

# 5. Test the API
curl http://127.0.0.1:8000/
License
MIT License
```
