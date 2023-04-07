import React from "react";
import styled from "@emotion/styled";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.sender === "assistant" ? "row" : "row-reverse"};
  margin-bottom: 8px;
`;

const MessageText = styled.div`
  padding: 8px;
  background-color: ${(props) =>
    props.sender === "assistant" ? "#404040" : "#00aaff"};
  border-radius: 4px;
  max-width: 70%;
`;

function Message({ sender, text }) {
  return (
    <MessageContainer sender={sender}>
      <MessageText sender={sender}>{text}</MessageText>
    </MessageContainer>
  );
}

export default Message;
