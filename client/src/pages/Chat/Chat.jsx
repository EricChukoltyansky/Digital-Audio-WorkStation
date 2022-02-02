import {useState, useEffect} from "react";
import queryString from "query-string";
import io from 'socket.io-client';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import "./Chat.css";

var connectionOptions = {
	"force new connection" : true,
	"reconnectionAttempts": "Infinity",
	"timeout" : 10000,				
	"transports" : ["websocket"]
};

var socket = io.connect('https://localhost:5000',connectionOptions);


const Chat = ({location}) => {

	const [name, setName] = useState('');
	const [room, setRoom] = useState("");
	const [users, setUsers] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const ENDPOINT = 'localhost:5000';

	useEffect( () => {
		const {name, room} = queryString.parse(location.search);

		setName(name);
		setRoom(room);

		socket.emit('join',{name, room}, (error) => {
			if(error) {
				alert(error);
			}
		})
		return () => {
			socket.emit('disconnect');
			socket.off();
		}
		
	},[ENDPOINT, location.search]);

	useEffect( () => {
		socket.on('message', (message) => {
			setMessages([...messages,message]);
		})

		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});
	},[messages, users])

	//Function for Sending Message
	const sendMessage = (e) => {
		e.preventDefault();
		if(message) {
			socket.emit('sendMessage', message, () => setMessage(''))
		}
	}

	console.log(message ,messages);

	return (
		<div className="outerContainer">
			<div className="container">
		
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input message={message} setMessage={setMessage}
				sendMessage={sendMessage} />
			</div>
			<TextContainer users={users}/>
		</div>
	)
};

export default Chat;
