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
  white-space: pre-wrap;
`;

const MessageCode = styled.div`
  padding: 8px;
  font-family: monospace;
  background-color: ${(props) =>"#606060"};
  border-radius: 4px;
  max-width: 70%;
  white-space: pre-wrap;
`;

function Message({ role, content }) {
  const extractCodeBlock = (text) => {
    const codeBlockRegex = /```(?:([a-zA-Z]+)\n)?([\s\S]*?)```/g;
    let match;
    const segments = [];

    let lastIndex = 0;
    while ((match = codeBlockRegex.exec(text)) !== null) {
      const [fullMatch, language, code] = match;
      const index = match.index;

      segments.push({ type: "text", content: text.slice(lastIndex, index) });
      segments.push({ type: "code", content: code });
      lastIndex = index + fullMatch.length;
    }
    segments.push({ type: "text", content: text.slice(lastIndex) });

    return segments;
  };

  const segments = extractCodeBlock(content);

  return (
    <MessageContainer role={role}>
      <MessageText role={role}>
        <strong>{role === "user" ? "Vous: " : "Assistant: "}</strong>
        {segments.map((segment, index) =>
          segment.type === "code" ? (
            <MessageCode key={index}>{segment.content}</MessageCode>
          ) : segment.content
        )}
      </MessageText>
    </MessageContainer>
  );
}

export default Message;
