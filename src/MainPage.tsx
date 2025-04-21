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
        if (roomname.length > 0) {
            setJoinName(roomname);
        } else {
            setJoinName("main");
        }
        setRoomname("");
    };

    function handleRoomnameChange(event: any): void {
        setRoomname(event.target.value);
    }

    return (
        <Container
            maxWidth="lg"
            disableGutters
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Box sx={{ flexShrink: 0, paddingTop: 2 }}>
                <Typography variant="h5">
                    Time to start chatting, {username}!
                </Typography>
                <Typography>
                    Choose a room to join or create your own!
                </Typography>
                <Box>
                    <TextField
                        variant="outlined"
                        value={roomname}
                        onChange={handleRoomnameChange}
                        placeholder="Enter a room name"
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
