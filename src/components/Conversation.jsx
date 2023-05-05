import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";

function Conversation({ apiKey }) {
  const { id: conversationId } = useParams();
  const [messages, setMessages] = useState(() =>
    localStorage.getItem(conversationId)
      ? JSON.parse(localStorage.getItem(conversationId))
      : [{"role": "system", "content": "You are a now a helpful assistant."},]
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    saveToLocalStorage(conversationId, messages);
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setInput("Votre requête est en cours de traitement")
    if (!input) return;
    const userMessage = { role: "user", content: input };
    const temp = [...messages, userMessage]
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const assistantMessage = await fetchAssistantResponse(temp);
    setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    setLoading(false)
    setInput("");
  };

  async function fetchAssistantResponse(prompt) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: prompt,
          max_tokens: 3000,
          temperature: 0.5,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        }),
      });

      const data = await response.json();
      const message = {
        role: "assistant",
        content: data.choices[0].message.content.trim(),
      };
      return message;
    } catch (error) {
      console.error("Error fetching assistant response:", error);
      return {
        role: "assistant",
        content: "Désolé, je n'ai pas pu traiter votre demande.",
      };
    }
  }

  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde dans le localStorage:",
        error
      );
    }
  };

  return (
    <div style={{ width: "60%", margin: "auto" }}>
      <h2>Conversation {conversationId}</h2>
      <div>
        {messages.map((message, index) => (
          <Message key={uuidv4()} role={message.role} content={message.content} />
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ height: "50px", margin: "20px 0" }}
      >
        <textarea
          style={{ width: "100%", height: "100%", padding: "5px" }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={loading ? "Chargement..." : "Tapez votre message"}
          disabled={loading}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#404040",
            color: "#fff",
            fontSize: "1.5em",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Conversation;
