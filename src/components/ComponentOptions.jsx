import { Button, Stack } from "react-bootstrap";
import { AppContext } from "../context/ContextProvider";
import { useContext, useRef, useState } from "react";
import { ChromePicker } from "react-color";

function ComponentOptions() {
  const { selectedComponent } = useContext(AppContext);

  return (
    <Stack gap={2} className="h-100">
      <Button variant="dark pe-none">Options</Button>

      {selectedComponent === "data-content" && <DataContentOptions />}
      {selectedComponent === "image-content" && <ImageContentOptions />}
      {selectedComponent === "chat-content" && <ChatContentOptions />}
    </Stack>
  );
}

export default ComponentOptions;

function DataContentOptions() {
  const { fontColor, setFontColor } = useContext(AppContext);
  const [showColorSelector, setShowColorSelector] = useState(false);
  const handleColorChange = (value) => {
    setFontColor(value?.hex);
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  return (
    <>
      <Button variant="outline-secondary" disabled>
        Increase Font Size
      </Button>
      <Button variant="outline-secondary" disabled>
        Decrease Font Size
      </Button>
      <Button
        variant="outline-secondary"
        onClick={() => {
          setShowColorSelector(true);
        }}
      >
        Change Font Color
      </Button>

      {showColorSelector && (
        <div style={popover}>
          <div
            style={cover}
            onClick={() => {
              setShowColorSelector(false);
            }}
          />
          <ChromePicker color={fontColor} onChange={handleColorChange} />
        </div>
      )}
    </>
  );
}

function ImageContentOptions() {
  const { addImage, removeImage } = useContext(AppContext);
  const imageRef = useRef(null);

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => {
          imageRef.current.click();
        }}
      >
        Add Image
      </Button>
      <Button variant="outline-secondary" onClick={() => removeImage()}>
        Remove Image
      </Button>
      <input
        type="file"
        ref={imageRef}
        style={{ display: "none" }}
        id="update-product-image"
        hidden
        accept="image/png,image/jpeg,image/jpg"
        onChange={addImage}
      />
    </>
  );
}

function ChatContentOptions() {
  return (
    <>
      <Button variant="outline-secondary" disabled>
        No Options Available
      </Button>
    </>
  );
}
