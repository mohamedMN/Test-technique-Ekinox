Frontend Project
This is the frontend of the application, built with React and Vite. It is designed to be lightweight, fast, and container-ready using Docker.

🚀 Tech Stack
Framework: React (JSX)

Build Tool: Vite

Linting: ESLint

Containerization: Docker

📂 Project Structure
Plaintext

frontend/
├── src/
│   ├── api/          # API service calls and configurations
│   ├── assets/       # Static assets like images and fonts
│   ├── components/   # Reusable UI components
│   ├── pages/        # Main page/view components
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
├── public/           # Public static files
├── Dockerfile        # Docker configuration
├── vite.config.js    # Vite configuration
└── eslint.config.js  # Linting rules
🛠️ Getting Started
Prerequisites
Node.js (Latest LTS recommended)

npm or yarn

Installation
Clone the repository:

Bash

git clone <repository-url>
cd frontend
Install dependencies:

Bash

npm install
Running Locally
To start the development server with Hot Module Replacement (HMR):

Bash

npm run dev
The app will be available at http://localhost:5173.

🐳 Docker Setup
To run the application using Docker, follow these steps:

Build the Docker image:

Bash

docker build -t frontend-app .
Run the container:

Bash

docker run -p 5173:5173 frontend-app
🏗️ Production Build
To create an optimized production build in the dist/ folder:

Bash

npm run build
To preview the production build locally:

Bash

npm run preview
🧹 Code Quality
This project uses ESLint to maintain code standards. You can check for linting issues by running:

Bash

npm run lint