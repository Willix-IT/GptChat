import React from "react";
import { Link } from "react-router-dom";
import ConversationListItem from "./ConversationListItem";

const ConversationList = () => {
  const conversationIds =
    JSON.parse(localStorage.getItem("conversations")) || [];

  return (
    <div style={{ width: "70%", margin: "150px auto" }}>
      <button
        onClick={createNewConversation}
        style={{
          backgroundColor: "#404040",
          color: "#fff",
          fontSize: "1.5em",
          marginTop: "10px",
          textAlign: "center",
          position: "absolute",
          left: 50,
          top: 10,
        }}
      >
        Nouvelle conversation
      </button>
      <h2 style={{ marginLeft: "-30px" }}>Liste des conversations</h2>
      {conversationIds.map((id) => (
        <Link key={id} to={`/conversation/${id}`}>
          <ConversationListItem id={id} />
        </Link>
      ))}
    </div>
  );

  function createNewConversation() {
    const newId = Date.now();
    const updatedIds = [...conversationIds, newId];
    localStorage.setItem("conversations", JSON.stringify(updatedIds));
    window.location.reload();
  }
};

export default ConversationList;
