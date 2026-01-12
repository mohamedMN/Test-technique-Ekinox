// src/App.jsx
import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <>
      {showLanding ? (
        <LandingPage onStart={() => setShowLanding(false)} />
      ) : (
        <Dashboard onLogout={() => setShowLanding(true)} />
      )}
    </>
  );
}

export default App;