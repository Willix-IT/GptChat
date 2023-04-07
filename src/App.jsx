import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Global, css } from "@emotion/react";
import Conversation from "./components/Conversation";
import ApiKeyForm from "./components/ApiKeyForm";
import ConversationList from "./components/ConversationList";
import "./App.css";
const globalStyles = css`
  body {
    background-color: #181818;
    color: #ffffff;
    font-family: "Arial", sans-serif;
  }
`;

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde dans le localStorage:", error);
  }
};

const loadFromLocalStorage = (key) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue || "";
  } catch (error) {
    console.error("Erreur lors du chargement du localStorage:", error);
    return "";
  }
};

function App() {
  const [apiKey, setApiKey] = useState(loadFromLocalStorage("apiKey"));

  useEffect(() => {
    saveToLocalStorage("apiKey", apiKey);
  }, [apiKey]);

  const handleApiKeySubmit = (key) => {
    setApiKey(key);
  };

  return (
    <div>
      <Global styles={globalStyles} />
      <Router>
        <h1 style={{ textAlign: "center" }}>React GPT-4</h1>
        {!apiKey && <ApiKeyForm onSubmit={handleApiKeySubmit} />}
        {apiKey && (
          <button
            onClick={() => setApiKey("")}
            style={{
              backgroundColor: "#404040",
              color: "#fff",
              fontSize: "1em",
              marginTop: "10px",
              textAlign: "center",
              position: "absolute",
              left: 50,
              top: 50,
            }}
          >
            Reset APIKEY
          </button>
        )}
        <br />
        <Link to="/" style={{ margin: "90px" }}>
          Revenir aux Conversations
        </Link>
        <Routes>
          <Route index element={<ConversationList />} />
          <Route
            path="conversation/:id"
            element={<Conversation apiKey={apiKey} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
