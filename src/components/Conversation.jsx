import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";

function Conversation({ apiKey }) {
  const { id: conversationId } = useParams();
  const [messages, setMessages] = useState(() =>
    localStorage.getItem(conversationId)
      ? JSON.parse(localStorage.getItem(conversationId))
      : []
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    saveToLocalStorage(conversationId, messages);
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const assistantMessage = await fetchAssistantResponse(input);
    setMessages((prevMessages) => [...prevMessages, assistantMessage]);

    setInput("");
  };

  async function fetchAssistantResponse(prompt) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: `User: ${prompt}\nAssistant:`,
          max_tokens: 100,
          n: 1,
          stop: null,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const message = {
        sender: "assistant",
        text: response.data.choices[0].text.trim(),
      };
      return message;
    } catch (error) {
      console.error("Error fetching assistant response:", error);
      return {
        sender: "assistant",
        text: "Désolé, je n'ai pas pu traiter votre demande.",
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
          <Message key={uuidv4()} sender={message.sender} text={message.text} />
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ height: "50px", margin: "20px 0" }}
      >
        <input
          style={{ width: "100%", height: "100%" }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
