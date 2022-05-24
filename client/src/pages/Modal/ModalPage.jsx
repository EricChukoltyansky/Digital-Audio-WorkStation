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
<<<<<<< HEAD:client/src/pages/Modal/ModalPage.jsx
=======

>>>>>>> b65af953118459a8613e0e6ee17dc7f632ecd070:client/src/pages/Modal/ModalPage.tsx
