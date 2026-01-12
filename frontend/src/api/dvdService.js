// src/api/dvdService.js

const API_URL = "http://localhost:8000";

export const calculateCart = async (rawText) => {
  try {
    const response = await fetch(`${API_URL}/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // On correspond exactement au schéma Pydantic "CartInput"
      body: JSON.stringify({ raw_text: rawText }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors du calcul du prix");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
