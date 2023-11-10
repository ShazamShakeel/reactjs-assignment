import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";
import { AppContext } from "../context/ContextProvider";

function Chat() {
  const messagesContainerRef = useRef(null);
  const { isDnDDisabled, messages, addMessage, setSelectedComponent } =
    useContext(AppContext);
  const [message, setMessage] = useState("");

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: "chat-content",
      disabled: isDnDDisabled,
    });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        transition,
      }
    : undefined;

  const handleSendMessage = (e) => {
    e.preventDefault();
    addMessage(message);
    setMessage("");
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, overflowY: "auto", maxHeight: "85vh" }}
      {...listeners}
      {...attributes}
      className="h-100 w-100 d-flex flex-column justify-content-between bg-white p-2 gap-2"
      onClick={() => {
        setSelectedComponent("chat-content");
      }}
    >
      <Stack
        direction="vertical"
        gap={2}
        className="w-100 overflow-y-auto"
        style={{ flexGrow: 10 }}
        ref={messagesContainerRef}
      >
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={`border rounded py-1 px-2 ${
                message.sender === "user"
                  ? "bg-light"
                  : "bg-secondary text-white"
              }`}
            >
              {message.message}
            </div>
          );
        })}
      </Stack>
      <Stack
        as="form"
        direction="horizontal"
        gap={2}
        onSubmit={handleSendMessage}
      >
        <input
          className="w-100 p-1"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flexGrow: 1 }}
        />
        <Button type="submit">
          <Send size={18} />
        </Button>
      </Stack>
    </div>
  );
}

export default Chat;
