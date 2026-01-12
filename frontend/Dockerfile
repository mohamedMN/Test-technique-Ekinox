FROM node:20-slim

WORKDIR /app

# On ne copie QUE le package.json pour l'installation
COPY package.json ./

# On force l'installation propre dans l'environnement Linux
RUN npm install

# On copie le reste du code (le .dockerignore ignorera ton node_modules local)
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]