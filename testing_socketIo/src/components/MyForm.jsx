import React, { useState, useEffect } from "react";
import { socket } from "../socket";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [receivedData, setReceivedData] = useState(null);

  useEffect(() => {
    // Menangani event 'create-something' dari server
    socket.on("create-something", (data) => {
      console.log("Received create-something event with data:", data);
      setReceivedData(data);
    });

    // Membersihkan event listener ketika komponen unmount
    return () => {
      socket.off("create-something");
    };
  }, []); // [] berarti useEffect akan dijalankan hanya sekali setelah render pertama

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.emit("create-something", value, () => {
      setIsLoading(false);
    });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={(e) => setValue(e.target.value)} />

        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>

      {receivedData && (
        <div>
          <h2>Data Received from Server:</h2>
          <pree>{JSON.stringify(receivedData, null, 2)}</pree>
        </div>
      )}
    </div>
  );
}
