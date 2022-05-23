import { useState, FunctionComponent } from "react";

const useModal:FunctionComponent<{ initial?: Boolean }> = ({ initial = false }) => {
  const [isShowing, setIsShowing] = useState(initial);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
