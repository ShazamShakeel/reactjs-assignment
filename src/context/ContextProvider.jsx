import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import { db, storage } from "../config/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

export const AppContext = createContext();

function ContextProvider({ children }) {
  // UI States
  const [isDnDDisabled, setIsDnDDisabled] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  // Data States
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#000000");
  const [isEditText, setIsEditText] = useState(false);
  const [editedText, setEditedText] = useState({
    heading: "",
    paragraph: "",
  });
  const [textData, setTextData] = useState({
    id: "",
    heading: "",
    paragraph: "",
  });
  // Image States
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [images, setImages] = useState([]);
  // Chatbot States
  const [messages, setMessages] = useState([
    { id: 0, message: "Hi", sender: "bot" },
    { id: 1, message: "How are you?", sender: "bot" },
  ]);

  // Text Functions

  const handleIsEditText = (value) => {
    setIsEditText(value);
    if (!value) {
      setEditedText({
        heading: textData?.heading ?? "",
        paragraph: textData?.paragraph ?? "",
      });
    }
  };

  const getTextData = useCallback(async () => {
    try {
      const textDataCollectionRef = collection(db, "textdata");
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

  useEffect(() => {
    setEditedText({
      heading: textData?.heading ?? "",
      paragraph: textData?.paragraph ?? "",
    });
  }, [textData]);

  useEffect(() => {
    getTextData();
  }, [getTextData]);

  // Image Functions

  const getImages = useCallback(async () => {
    try {
      setIsImageLoading(true);
      const data = await listAll(ref(storage, "/"));
      const promises = data.items.map((item) => getDownloadURL(item));
      const urls = await Promise.all(promises);
      setImages(urls);
    } catch (err) {
      console.error(err);
    } finally {
      setIsImageLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadImage = useCallback(
    async (image) => {
      if (!image) return;
      try {
        setIsImageLoading(true);
        const storageRef = ref(storage, `${image.name + v4(0)}`);
        const snapshot = await uploadBytes(storageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        setImages([...images, url]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsImageLoading(false);
      }
    },
    [images]
  );

  const addImage = (e) => {
    if (images.length >= 4) {
      e.target.value = "";
      return alert("You can only add 4 images");
    }
    const image = e.target.files[0];
    uploadImage(image);
    e.target.value = "";
  };

  const removeImage = useCallback(async () => {
    //it will remove the last image using firebase storage
    const lastImage = images[images.length - 1];
    const storageRef = ref(storage, lastImage);
    try {
      await deleteObject(storageRef);
      setImages(images.slice(0, images.length - 1));
    } catch (err) {
      console.error(err);
    }
  }, [images]);

  useEffect(() => {
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Chatbot Functions

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
        selectedComponent,
        setSelectedComponent,
        fontColor,
        setFontColor,
        isEditText,
        setIsEditText,
        editedText,
        setEditedText,
        handleIsEditText,
        fontSize,
        setFontSize,
        textData,
        updateTextData,
        images,
        addImage,
        removeImage,
        isImageLoading,
        messages,
        addMessage,
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
