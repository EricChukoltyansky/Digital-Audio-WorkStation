import { useState, useEffect } from "react";
import queryString from "query-string";
import TextContainer from "./TextContainer/TextContainer";
import Messages from "./Messages/Messages";
import InfoBar from "./InfoBar/InfoBar";
import "./Main.css";
import { useLocation } from "react-router-dom";
import PlayerProvider from "../../components/Sequencer/PlayerProvider";
import Sequencer from "../../components/Sequencer/Sequencer";

const Main = ({ socket }) => {
  console.log(socket);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:3001";

  const location = useLocation();

  console.log(socket);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search, socket]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers([...users]);
    });
  }, [messages, users, socket]);

  //Function for Sending Message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  // console.log(message, messages);

  return (
    <div className="outerContainer">
				<PlayerProvider>
					{({ player }) => {
						if (!player) {
							return <p>loading....</p>;
						}
						return <Sequencer player={player} socket={socket} />;
					}}
				</PlayerProvider>
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
				<TextContainer users={users} />
        {/* <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        /> */}
      </div>
    </div>
  )
}

export default Main;