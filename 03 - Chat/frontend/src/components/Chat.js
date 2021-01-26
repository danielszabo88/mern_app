import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App"
import { Container, Col, Row } from "react-bootstrap";
import io from "socket.io-client";

const socket = io();

const Chat = () => {
  const [chatUsers, setChatUsers] = useState([])
  const [chatMessage, setChatMessage] = useState({name: "", msg: "", room: "", isPrivate: false})
  const [msgList, setMsgList] = useState([])
  const [currentRoom, setCurrentRoom] = useState("General Chat")

  useEffect(() => {
    socket.emit("userJoin", userData.user.name);
  }, []);

  const { userData, setUserData } = useContext(UserContext)

  socket.on("newMessage", newMessage => {
    setMsgList([...msgList, {name: newMessage.name, msg: newMessage.msg, isPrivate: newMessage.isPrivate}])
  })

  socket.on("userList", (userList) => {
    setChatUsers(userList);
    setChatMessage({name: userData.user.name, msg: chatMessage.msg})
  });

  const handleChange = (e) => {
    setChatMessage({...chatMessage, [e.target.name]: e.target.value})
  }

  const newMessageSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      name: chatMessage.name,
      msg: chatMessage.msg,
      room: currentRoom,
      isPrivate: isChatPrivate(currentRoom, chatUsers)
    }

    socket.emit("newMessage", newMessage)

    setChatMessage({
      name: userData.user.name,
      msg: ""
    })
  }

  const enteringRoom = (e) => {
    let oldRoom = currentRoom
    let newRoom = e.target.textContent
    setCurrentRoom(newRoom)
    socket.emit("roomEntered", { oldRoom, newRoom })
    setMsgList([])
  }

  const isChatPrivate = (roomName, userList) => {
    let isPrivate = false
    userList.forEach(userName => {
      if(userName === roomName){
        isPrivate = true
      }
    })
    return isPrivate
  }

  return (
    <Container>
      <Row>
        <Col xs={5} style={{ border: "1px solid black" }}>
          <br/>
          <h6 onClick={enteringRoom} style={{ cursor: "pointer" }}>General Chat</h6>
          <br />
          <p><b>Chat Rooms</b></p>
          <ul style={{ listStyleType: "none" }}>
            <li onClick={enteringRoom} style={{ cursor: "pointer" }}>Apple</li>
            <li onClick={enteringRoom} style={{ cursor: "pointer" }}>Banana</li>
            <li onClick={enteringRoom} style={{ cursor: "pointer" }}>Carrot</li>
          </ul>
          <p><b>Currently Connected Users:</b></p>
          <ul style={{ listStyleType: "none" }}>
            {chatUsers.map((user) => {
              return <li onClick={enteringRoom} style={{cursor:"pointer"}}
                key={user}>{user}</li>;
            })}
          </ul>
        </Col>
        <Col style={{ border: "1px solid black" }}>
          <p>Chat Messages ({currentRoom})</p>
          <form onSubmit={newMessageSubmit}>
            <input type="text" name="msg" 
              value={chatMessage.msg}
              onChange={handleChange} required style={{ width: "80%" }} />
            <input type="submit" value="Message!" />
          </form>
          <div id="chatMessages" style={{ border: "1px solid black" }}>
            Messages
            <ul style={{ listStyle:"none" }}>
              {msgList.map((msgList, index) => {
                return (
                  <li key={index}>
                    <b>{msgList.name}: </b>
                    <i>
                      <span style={{color: msgList.isPrivate ? "red" : "black"}}>
                        {msgList.msg}
                      </span></i>
                  </li>
                )
              })}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
