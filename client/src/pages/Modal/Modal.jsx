import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">Close window</span>
                </button>
              </div>
              <p>
                Hi, just wanted to let you know, that even though it's fun to
                play solo, the best time spent is with your friends. So send the
                app to your friends, make sure you are on the Sequencer page and
                start pushing buttons! Both of you should hear live what the
                other one is pushing!!!!
              </p>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
