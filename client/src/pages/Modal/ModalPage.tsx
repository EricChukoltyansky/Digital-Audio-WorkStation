
import React from "react";
import Modal from "./Modal";
import useModal from "./useModal";

import "./styles.css";

const ModalPage = () => {
  const { isShowing, toggle } = useModal();
  return (
    <div className="page">
      <button className="button-default" onClick={toggle}>
        Instructions
      </button>
      <Modal isShowing={isShowing} hide={toggle} />
    </div>
  );
};

export default ModalPage;

