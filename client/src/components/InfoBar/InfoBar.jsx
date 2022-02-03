import React from "react";
import "./InfoBar.css";
import { useNavigate } from "react-router-dom";

const InfoBar = ({ name, room, socket }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <button
          onClick={() => {
            socket.emit("leave", { name, room }, (error) => {
              try {
                if (error) {
                  alert(error);
                }
              } catch (err) {
                alert(error);
              }
            });
            goHome();
          }}
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default InfoBar;
