import React, { useState } from "react";

function ApiKeyForm({ onSubmit }) {
  const [key, setKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(key);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="api-key">Entrez votre clé API :</label>
      <input
        type="password"
        id="api-key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button type="submit">Valider</button>
    </form>
  );
}

export default ApiKeyForm;
