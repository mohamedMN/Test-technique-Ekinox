# 🎬 DVD Store Manager

## 🚀 Quick Start avec Docker

### Prérequis

- Docker Desktop installé ([Télécharger](https://www.docker.com/products/docker-desktop))
- Git installé

### Installation en 2 commandes

```bash
# 1. Cloner le projet
git clone https://github.com/mohamedMN/Test-technique-Ekinox
cd dvd-store

2. ⚙️ Configuration (Important)
Avant de lancer l'application, exécutez le script de configuration pour générer automatiquement les fichiers d'environnement (.env) :

Bash:

python backend/scripts/setup_env.py

# 2. Lancer avec Docker Compose
docker-compose up --build
```

✅ **C'est tout !** Ouvrez votre navigateur :

- Frontend : http://localhost:5173
- Backend API : http://localhost:8000
- Documentation : http://localhost:8000/docs

### Arrêter les services

```bash
docker-compose down
```

### Voir les logs

```bash
docker-compose logs -f
```

## 📦 Développement sans Docker

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
