import { useState } from "react";

type Props = {
  children: (props: { toggle: () => void }) => JSX.Element;
}

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
