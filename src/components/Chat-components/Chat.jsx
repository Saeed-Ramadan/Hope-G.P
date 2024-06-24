import { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Cookie from "cookie-universal";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);
  const cookies = Cookie();
  const token = cookies.get("Cookie"); // Adjust the token retrieval as necessary

  useEffect(() => {
    if (!token) return;

    const newConnection = new HubConnectionBuilder()
      .withUrl("https://hope3221-001-site1.btempurl.com/Chat", {
        headers: {
          Authorization: `Bearer ${token}`, // or any other custom header name
        },
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Connection established");
        newConnection.on("newMessage", (message) => {
          const updatedChat = [...chat, message];
          setChat(updatedChat);
        });
      })
      .catch((e) => console.error("Connection failed: ", e));

    return () =>
      connection?.stop().then(() => console.log("Connection stopped"));
  }, [token]);

  const sendMessage = async (user, message) => {
    const chatMessage = {
      content: message,
      recipientId: user,
    };

    if (connection?.connectionStarted) {
      try {
        await connection.send("SendMessage", chatMessage);
      } catch (e) {
        console.error("Sending message failed: ", e);
      }
    } else {
      console.warn("No connection to server yet.");
    }
  };

  return (
    <div>
      <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatWindow chat={chat} />
    </div>
  );
};

export default Chat;
