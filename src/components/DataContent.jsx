import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext } from "react";
import { AppContext } from "../context/ContextProvider";

function DataContent() {
  const {
    textData,
    isEditText,
    editedText,
    setEditedText,
    isDnDDisabled,
    setSelectedComponent,
    fontColor,
    fontSize,
  } = useContext(AppContext);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: "data-content",
      disabled: isDnDDisabled,
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
      style={{
        ...style,
        overflowY: "auto",
        maxHeight: "85vh",
        color: isEditText ? "#000" : fontColor,
        fontSize: isEditText ? "1rem" : `${fontSize}px`,
      }}
      {...listeners}
      {...attributes}
      className="h-100 p-2 bg-white"
      onClick={() => {
        setSelectedComponent("data-content");
      }}
    >
      {isEditText ? (
        <div className="d-flex flex-column gap-2 w-100 h-100">
          <div>
            <p className="fw-bold">Heading</p>
            <textarea
              value={editedText?.heading ?? ""}
              onChange={(e) => {
                setEditedText({
                  heading: e.target.value,
                  paragraph: editedText?.paragraph,
                });
              }}
              className="w-100"
              style={{ resize: "none" }}
            />
          </div>
          <div className="w-100 h-auto">
            <p className="fw-bold">Paragraph</p>
            <textarea
              value={editedText?.paragraph ?? ""}
              onChange={(e) => {
                setEditedText({
                  heading: editedText?.heading,
                  paragraph: e.target.value,
                });
              }}
              className="w-100 h-100"
              style={{ resize: "none" }}
            />
          </div>
        </div>
      ) : (
        <>
          <h1 style={{ fontSize: "1.5em" }}>{textData?.heading ?? ""}</h1>
          <p style={{ fontSize: "1em" }}>{textData?.paragraph ?? ""}</p>
        </>
      )}
    </div>
  );
}

export default DataContent;
