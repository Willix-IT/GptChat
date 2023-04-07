import React, { useEffect, useState } from "react";

const ConversationListItem = ({ id }) => {
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(id)) || [];
    if (storedMessages.length) {
      setLastMessage(storedMessages[storedMessages.length - 1].content);
    }
  }, [id]);

  return (
    <div style={{ marginBottom: "50px" }}>
      <h3>Conversation {id}</h3>
      <p>{lastMessage ? `Dernier message: ${lastMessage}` : "Aucun message"}</p>
    </div>
  );
};

export default ConversationListItem;
