import { useMemo } from "react";
import { type Message } from "~/types/types";
import { formatOutput } from "~/utils/formatter";

const MessageBubble = ({ message }: { message: Message }) => {
  const parsedMessage = useMemo(
    () => formatOutput(message.content),
    [message.content]
  );
  console.log(parsedMessage);
  // TODO: parse message to show actions differently
  return (
    <>
      {message.role === "user" && (
        <div className="chat chat-start">
          <div
            className="chat-bubble chat-bubble-secondary"
            dangerouslySetInnerHTML={{ __html: parsedMessage }}
          />
          {/* <div className="chat-bubble chat-bubble-secondary">
            {parsedMessage}
          </div> */}
        </div>
      )}
      {message.role === "assistant" && (
        <div className="chat chat-start">
          <div
            className="chat-bubble chat-bubble-primary"
            dangerouslySetInnerHTML={{ __html: parsedMessage }}
          />
          {/* <div className="chat-bubble chat-bubble-primary">
            {typing ? <TypingText text={message.content} /> : message.content}
          </div> */}
        </div>
      )}
    </>
  );
};

export default MessageBubble;
