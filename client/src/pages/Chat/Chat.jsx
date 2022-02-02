import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import TextContainer from "../../components/TextContainer/TextContainer";
import Messages from "../../components/Messages/Messages";
import InfoBar from "../../components/InfoBar/InfoBar";
import Input from "../../components/Input/Input";
import "./Chat.css";
import { useLocation } from "react-router-dom";

const Chat = ({ socket }) => {
  console.log(socket);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:3001";

  const location = useLocation();

  console.log(socket);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log(name, room);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search, socket]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages, users]);

  //Function for Sending Message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  )
}

export default Chat;