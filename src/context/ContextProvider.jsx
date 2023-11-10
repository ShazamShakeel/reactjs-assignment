import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const AppContext = createContext();

function ContextProvider({ children }) {
  const [isDnDDisabled, setIsDnDDisabled] = useState(false);
  const [images, setImages] = useState([]);
  const [fontColor, setFontColor] = useState("#000000");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [messages, setMessages] = useState([
    { id: 0, message: "Hi", sender: "bot" },
    { id: 1, message: "How are you?", sender: "bot" },
  ]);

  const addImage = (e) => {
    const image = e.target.files[0];
    if (image && images.length < 4) {
      setImages([...images, image]);
    } else if (images.length === 4) {
      e.target.value = "";
      alert("You can only add 4 images");
    }
  };

  const removeImage = () => {
    //it will remove the last image
    images?.length && setImages(images.slice(0, images.length - 1));
  };

  const addMessage = (message) => {
    if (message)
      setMessages([
        ...messages,
        { id: messages.length, message, sender: "user" },
      ]);
  };

  return (
    <AppContext.Provider
      value={{
        isDnDDisabled,
        setIsDnDDisabled,
        images,
        addImage,
        removeImage,
        selectedComponent,
        setSelectedComponent,
        messages,
        addMessage,
        fontColor,
        setFontColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.any,
};

export default ContextProvider;
