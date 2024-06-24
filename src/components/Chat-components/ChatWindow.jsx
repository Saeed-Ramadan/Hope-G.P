// ChatWindow.jsx

import Message from "./Message";

const ChatWindow = ({ chat }) => {
  // Make sure chat is an array before mapping over it
  const chatMessages = Array.isArray(chat)
    ? chat.map((m) => (
        <Message
          key={Date.now() * Math.random()}
          user={m.user}
          message={m.message}
        />
      ))
    : null;

  return <div>{chatMessages}</div>;
};

export default ChatWindow;
