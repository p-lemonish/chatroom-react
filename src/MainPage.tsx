import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Chatroom from "./Chatroom";

function MainPage() {
  const location = useLocation();
  const username = location.state?.username;
  const [roomname, setRoomname] = useState("");
  const [joinName, setJoinName] = useState("main");

  const handleJoin = () => {
    setJoinName(roomname.trim() !== "" ? roomname : "main");
    setRoomname("");
  };

  function handleRoomnameChange(event: any): void {
    setRoomname(event.target.value);
  }

  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        height: "100vh",
        maxHeight: 600,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexShrink: 0, paddingTop: 2 }}>
        <Typography variant="h5">
          Time to start chatting, {username}!
        </Typography>
        <Typography>Choose a room to join or create your own!</Typography>
        <Box>
          <TextField
            variant="outlined"
            value={roomname}
            onChange={handleRoomnameChange}
            placeholder="Enter a room name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleJoin();
              }
            }}
          />
          <Button variant="contained" onClick={handleJoin}>
            Join
          </Button>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <Chatroom key={joinName} roomname={joinName} />
      </Box>
    </Container>
  );
}
export default MainPage;
