# 🎬 DVD Store Manager - Frontend

A modern React application for managing DVD sales with real-time price calculation and discount optimization.

---

## 🚀 Quick Start

```bash
# Clone and navigate
git clone
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── api/
│   └── dvdService.js          # API client
├── assets/                     # Images, fonts, etc.
├── components/
│   ├── CartInput.jsx          # Cart input with presets
│   └── Receipt.jsx            # Receipt display
├── pages/
│   ├── Dashboard.jsx          # Main calculator page
│   └── LandingPage.jsx        # Hero landing page
├── App.jsx                     # Router & navigation
├── App.css                     # Global styles
├── main.jsx                    # Entry point
└── index.css                   # Tailwind imports
```

---

## 🎨 Features

✅ **Landing Page** - Modern hero section with call-to-action  
✅ **Cart Input** - Quick preset examples for testing  
✅ **Real-time Calculation** - Instant price updates  
✅ **Smart Discounts** - Visual feedback on savings  
✅ **Responsive Design** - Mobile-first approach  
✅ **Error Handling** - User-friendly error messages

---

## 🔧 Configuration

### Backend API URL

Edit `src/api/dvdService.js`:

```javascript
const API_BASE_URL = "http://localhost:8000"; // Change for production
```

### Available Presets

| Preset              | Description           | Use Case            |
| ------------------- | --------------------- | ------------------- |
| **Basic**           | 3 unique BTTF titles  | 20% discount demo   |
| **Promo Mix**       | 2 BTTF + 1 other      | 10% discount demo   |
| **With Duplicates** | Includes duplicates   | Duplicate pricing   |
| **No Discount**     | Single title repeated | 0% discount         |
| **Max Discount**    | 3+ unique BTTF        | Maximum savings     |
| **Mixed Catalog**   | BTTF + Various        | Real-world scenario |

---

## 🛠️ Development

### Run dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint code

```bash
npm run lint
```

---

## 📦 Dependencies

### Core

- **React 18** - UI library
- **Vite** - Build tool & dev server

### UI/UX

- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### HTTP

- **Axios** (or Fetch API) - API requests

---

## 🎯 Component Guide

### `<CartInput />`

Cart textarea with preset buttons.

```jsx
<CartInput onCalculate={(text) => handleCalculate(text)} isLoading={loading} />
```

**Props:**

- `onCalculate`: Function called with cart text
- `isLoading`: Boolean to disable during calculation

---

### `<Receipt />`

Displays calculation results.

```jsx

```

**Props:**

- `data`: Object with `total_price` and `details`

**Example data:**

```javascript
{
  total_price: 47.0,
  details: {
    bttf_count: 2,
    unique_bttf_count: 2,
    duplicate_bttf_count: 0,
    others_count: 1,
    discount_applied: "10%",
    saved_amount: 3.0
  }
}
```

---

## 🌐 API Integration

### Calculate Cart

```javascript
import { calculateCart } from "./api/dvdService";

const text = "Back to the Future 1\nInception";
const result = await calculateCart(text);
console.log(result.total_price); // 32.5
```

### Error Handling

```javascript
try {
  const result = await calculateCart(text);
  setResult(result);
} catch (error) {
  setError("Unable to calculate. Please try again.");
}
```

---

## 🎨 Styling

### Tailwind Configuration

The project uses Tailwind's utility classes. Custom colors:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#2563eb',  // Blue-600
      success: '#10b981',  // Green-500
      warning: '#f59e0b',  // Amber-500
    }
  }
}
```

### Global Styles

Located in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🧪 Testing Scenarios

### Scenario 1: No Discount

**Input:**

```
Back to the Future 1
Back to the Future 1
```

**Expected:** 30€ (2 × 15€, no discount)

### Scenario 2: 10% Discount

**Input:**

```
Back to the Future 1
Back to the Future 2
The Matrix
```

**Expected:** 47€ (27€ + 20€)

### Scenario 3: 20% Discount

**Input:**

```
Back to the Future 1
Back to the Future 2
Back to the Future 3
```

**Expected:** 36€ (3 × 15€ × 0.8)

---

## 📱 Responsive Breakpoints

| Breakpoint | Width          | Layout        |
| ---------- | -------------- | ------------- |
| Mobile     | < 768px        | Single column |
| Tablet     | 768px - 1024px | Single column |
| Desktop    | > 1024px       | Two columns   |

---

## 🚀 Deployment

### Vercel

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
```

---

## 🔒 Environment Variables

Create `.env` file:

```bash
VITE_API_URL=http://localhost:8000
VITE_APP_NAME="DVD Store Manager"
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🐛 Troubleshooting

### CORS Errors

Ensure backend has proper CORS configuration:

```python
# backend/core/config.py
CORS_ORIGINS = ["http://localhost:5173"]
```

### Build Fails

```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### API Connection Issues

Check `dvdService.js` API_BASE_URL matches backend port.

---

## 📄 License

MIT License

---
