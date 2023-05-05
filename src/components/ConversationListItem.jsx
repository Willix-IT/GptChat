import React, { useEffect, useState } from "react";

const ConversationListItem = ({ id }) => {
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(id)) || [];
    if (storedMessages.length) {
      setLastMessage(storedMessages[storedMessages.length - 1].content);
    }
  }, [id]);

  const truncateMessage = (message, maxLength = 100) => {
    if (message.length > maxLength) {
      return message.slice(0, maxLength) + "...";
    }
    return message;
  };

  const truncatedMessage = truncateMessage(lastMessage);

  return (
    <div style={{ marginBottom: "50px" }}>
      <h3>Conversation {id}</h3>
      <p>
        {lastMessage ? `Dernier message: ${truncatedMessage}` : "Aucun message"}
      </p>
    </div>
  );
};

export default ConversationListItem;
