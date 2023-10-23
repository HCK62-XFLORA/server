import React, { useEffect, useState, useCallback } from "react";
import { socket } from "../socket";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleRoomChange = useCallback((roomId) => {
    setCurrentRoom(roomId);
  }, []);

  const handleJoinRoomClick = useCallback(() => {
    if (currentRoom !== null) {
      socket.emit("joinRoom", { ThreadId: currentRoom });
    }
  }, [currentRoom]);

  const handleLeaveRoomClick = useCallback(() => {
    if (currentRoom !== null) {
      socket.emit("leaveRoom", { ThreadId: currentRoom });
      setCurrentRoom(null);
    }
  }, [currentRoom]);

  // axios 
  const handleMessageSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (inputValue.trim() !== "") {

        socket.emit("clientMessage", {
          ThreadId: currentRoom, // Ganti dengan ID ruangan yang sesuai
          comment: inputValue,
          UserId: 1, // Ganti dengan ID pengguna yang sesuai
        });
        setInputValue("");
      }
    },
    [inputValue, currentRoom]
  );

  useEffect(() => {
    socket.on("serverMessage", (message) => {
      console.log(message, "<<");
      // console.log();
      setMessages((prevMessages) => [...prevMessages, { text: message }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Tombol-tombol */}
      <div style={{ marginBottom: "1rem" }}>
        {/* Tombol-tombol ruangan */}
        {[1, 2, 3].map((roomId) => (
          <button
            key={roomId}
            className={`middle none center mr-4 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase shadow-md transition-all focus:opacity-[0.85] focus:shadow-none disabled:pointer-events-none ${
              currentRoom === roomId ? "bg-green-500 text-white shadow-lg" : "bg-gray-300 text-gray-700"
            }`}
            data-ripple-light="true"
            onClick={() => handleRoomChange(roomId)}
          >
            {roomId}
          </button>
        ))}
        
        {/* Tombol Join Room */}
        <button
          className={`middle none center mr-4 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase shadow-md transition-all focus:opacity-[0.85] focus:shadow-none disabled:pointer-events-none ${
            currentRoom !== null ? "bg-purple-500 text-white shadow-lg" : "bg-gray-300 text-gray-700"
          }`}
          data-ripple-light="true"
          onClick={() => handleJoinRoomClick(currentRoom)}
        >
          Join Room
        </button>

        {/* Tombol Leave Room */}
        <button
          className={`middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase shadow-md transition-all focus:opacity-[0.85] focus:shadow-none disabled:pointer-events-none ${
            currentRoom !== null ? "bg-red-500 text-white shadow-lg" : "bg-gray-300 text-gray-700"
          }`}
          data-ripple-light="true"
          onClick={handleLeaveRoomClick}
        >
          Leave Room
        </button>
      </div>

      <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
        {messages.map((message, index) => (
          <li
            key={index}
            style={{
              padding: "0.5rem 1rem",
              background: index % 2 === 0 ? "#efefef" : "white",
            }}
          >
            {message.text}
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleMessageSubmit}
        style={{
          background: "rgba(0, 0, 0, 0.15)",
          padding: "0.25rem",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          height: "3rem",
          boxSizing: "border-box",
          backdropFilter: "blur(10px)",
        }}
      >
        <input
          id="input"
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          style={{
            border: "none",
            padding: "0 1rem",
            flexGrow: 1,
            borderRadius: "2rem",
            margin: "0.25rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#333",
            border: "none",
            padding: "0 1rem",
            margin: "0.25rem",
            borderRadius: "3px",
            outline: "none",
            color: "#fff",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
