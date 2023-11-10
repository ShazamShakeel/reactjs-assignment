import { useContext } from "react";
import { Button } from "react-bootstrap";
import { AppContext } from "../context/ContextProvider";

function AppActionButtons() {
  const { isDnDDisabled, setIsDnDDisabled } = useContext(AppContext);

  if (isDnDDisabled) {
    return (
      <Button
        variant="primary"
        disabled={!isDnDDisabled}
        onClick={() => {
          setIsDnDDisabled(false);
        }}
      >
        Preview
      </Button>
    );
  }

  if (!isDnDDisabled) {
    return (
      <Button
        variant="primary"
        onClick={() => {
          setIsDnDDisabled(true);
        }}
      >
        Launch
      </Button>
    );
  }
}

export default AppActionButtons;
