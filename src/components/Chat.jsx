import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Stack } from "react-bootstrap";
import { Send } from "react-bootstrap-icons";

function Chat() {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: "chat-content",
    });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        transition,
      }
    : undefined;

  const messages = [
    //array of 10 messages
    { id: 0, message: "...", sender: "user" },
    { id: 1, message: "Hello", sender: "user" },
    { id: 2, message: "Hi", sender: "bot" },
    { id: 3, message: "How are you?", sender: "bot" },
    { id: 4, message: "I'm fine", sender: "user" },
    { id: 5, message: "How about you?", sender: "user" },
    { id: 6, message: "I'm fine too", sender: "bot" },
    { id: 7, message: "What are you doing?", sender: "bot" },
    { id: 8, message: "I'm working", sender: "user" },
    { id: 9, message: "What about you?", sender: "user" },
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="h-100 w-100 d-flex flex-column justify-content-between bg-white p-2 gap-2"
    >
      <Stack
        direction="vertical"
        gap={2}
        className="h-100 w-100 overflow-y-auto"
      >
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={`border rounded p-1 ${
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
      <Stack direction="horizontal" gap={2}>
        <input className="w-100" type="text" />
        <Send size={30} className="bg-secondary text-white p-1 rounded" />
      </Stack>
    </div>
  );
}

export default Chat;
