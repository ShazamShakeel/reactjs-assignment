import PropTypes from "prop-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRef } from "react";
import { Camera } from "react-bootstrap-icons";

function Image({ image, handleImage }) {
  const imageRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: "image-content",
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
      style={style}
      {...listeners}
      {...attributes}
      className="h-100 d-flex align-items-center justify-content-center bg-white"
    >
      {image ? (
        <img
          src={image}
          style={{
            height: "auto",
            width: "100%",
            objectFit: "contain",
            maxHeight: "85vh",
          }}
          alt="image"
          onClick={() => {
            imageRef.current.click();
          }}
        />
      ) : (
        <Camera
          size={50}
          onClick={() => {
            imageRef.current.click();
          }}
        />
      )}
      <input
        type="file"
        ref={imageRef}
        style={{ display: "none" }}
        id="update-product-image"
        hidden
        accept="image/x-png,image/png,image/jpeg,image/jpg"
        onChange={handleImage}
      />
    </div>
  );
}

Image.propTypes = {
  handleImage: PropTypes.func,
  image: PropTypes.any,
};

export default Image;
