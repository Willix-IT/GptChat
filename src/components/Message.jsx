import React from "react";
import styled from "@emotion/styled";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.role === "assistant" ? "row" : "row-reverse"};
  margin-bottom: 8px;
`;

const MessageText = styled.div`
  padding: 8px;
  background-color: ${(props) =>
    props.role === "assistant"
      ? "#404040"
      : props.role === "user"
      ? "#00aaff"
      : "#54c6ff"};
  border-radius: 4px;
  max-width: 70%;
`;

function Message({ role, content }) {
  return (
    <MessageContainer role={role}>
      <MessageText role={role}>{content}</MessageText>
    </MessageContainer>
  );
}

export default Message;
