import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export const AppContext = createContext();

function ContextProvider({ children }) {
  const textDataCollectionRef = collection(db, "textdata");

  const [isDnDDisabled, setIsDnDDisabled] = useState(false);
  const [images, setImages] = useState([]);
  const [textData, setTextData] = useState({
    id: "",
    heading: "",
    paragraph: "",
  });
  const [isEditText, setIsEditText] = useState(false);
  const [editedText, setEditedText] = useState({
    heading: "",
    paragraph: "",
  });
  const [fontSize, setFontSize] = useState(16);
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

  const getTextData = useCallback(async () => {
    try {
      const data = await getDocs(textDataCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTextData(filteredData[0]);
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTextData = useCallback(async () => {
    try {
      const document = doc(db, "textdata", textData?.id);
      await updateDoc(document, {
        heading: editedText?.heading,
        paragraph: editedText?.paragraph,
      });
      setTextData({
        ...textData,
        heading: editedText?.heading,
        paragraph: editedText?.paragraph,
      });
      handleIsEditText(false);
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedText, textData]);

  const handleIsEditText = (value) => {
    setIsEditText(value);
    if (!value) {
      setEditedText({
        heading: textData?.heading ?? "",
        paragraph: textData?.paragraph ?? "",
      });
    }
  };

  useEffect(() => {
    setEditedText({
      heading: textData?.heading ?? "",
      paragraph: textData?.paragraph ?? "",
    });
  }, [textData]);

  useEffect(() => {
    getTextData();
  }, [getTextData]);

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
        textData,
        isEditText,
        setIsEditText,
        editedText,
        setEditedText,
        handleIsEditText,
        updateTextData,
        fontSize,
        setFontSize,
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
