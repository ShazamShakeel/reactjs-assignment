import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DataContent() {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: "data-content",
    });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        transition,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, overflowY: "auto", maxHeight: "85vh" }}
      {...listeners}
      {...attributes}
      className="h-100 p-2 bg-white"
    >
      <h1>Data Heading</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, numquam
        in suscipit aperiam commodi vero laboriosam voluptatum libero minus a.
        Eligendi ipsum suscipit temporibus quia expedita fugit tempora non
        laboriosam.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, numquam
        in suscipit aperiam commodi vero laboriosam voluptatum libero minus a.
        Eligendi ipsum suscipit temporibus quia expedita fugit tempora non
        laboriosam.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, numquam
        in suscipit aperiam commodi vero laboriosam voluptatum libero minus a.
        Eligendi ipsum suscipit temporibus quia expedita fugit tempora non
        laboriosam.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, numquam
        in suscipit aperiam commodi vero laboriosam voluptatum libero minus a.
        Eligendi ipsum suscipit temporibus quia expedita fugit tempora non
        laboriosam.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, numquam
        in suscipit aperiam commodi vero laboriosam voluptatum libero minus a.
        Eligendi ipsum suscipit temporibus quia expedita fugit tempora non
        laboriosam.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, numquam
        in suscipit aperiam commodi vero laboriosam voluptatum libero minus a.
        Eligendi ipsum suscipit temporibus quia expedita fugit tempora non
        laboriosam.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, numquam
        in suscipit aperiam commodi vero laboriosam voluptatum libero minus a.
        Eligendi ipsum suscipit temporibus quia expedita fugit tempora non
        laboriosam.
      </p>
    </div>
  );
}

export default DataContent;
