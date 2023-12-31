import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext } from "react";
import { Camera } from "react-bootstrap-icons";
import { AppContext } from "../context/ContextProvider";
import { Spinner } from "react-bootstrap";

function Image() {
  const { images, isImageLoading, setSelectedComponent } =
    useContext(AppContext);
  const { isDnDDisabled } = useContext(AppContext);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: "image-content",
      disabled: isDnDDisabled,
    });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        transition,
      }
    : undefined;

  if (isImageLoading)
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Uploading...</span>
        </Spinner>
      </div>
    );

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, overflowY: "auto" }}
      {...listeners}
      {...attributes}
      className="h-100 bg-white"
      onClick={() => setSelectedComponent("image-content")}
    >
      {images.length ? (
        <div
          className="d-flex flex-row flex-wrap gap-2 overflow-y-auto h-100"
          style={{
            maxHeight: "85vh",
          }}
        >
          {images.map((image, index) => (
            <div className="flex-grow-1" key={index}>
              <img
                src={image}
                className="object-fit-contain rounded p-1"
                style={{
                  height: "auto",
                  width: "100%",
                }}
                alt="image"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <Camera size={50} />
        </div>
      )}
    </div>
  );
}

export default Image;
