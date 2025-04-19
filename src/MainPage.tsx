import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebSocketMessage } from "react-use-websocket/dist/lib/types";

function MainPage() {
    const location = useLocation();
    const username = location.state?.username;
    const [rooms, setRooms] = useState<string[]>([]);
    const roonmsUrl = "http://localhost:8080/rooms";

    const getAvailableRooms = async () => {
        try {
            const response = await fetch(roonmsUrl);
            const json = await response.json();
            if (response.ok) {
                setRooms(json.rooms);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                paddingBottom: '20px',
                paddingTop: '20px',
            }}>
            <Typography variant="h3">
                Welcome to the Main page, {username}.
            </Typography>
            <Typography variant="h5">
                Choose a room to join or create your own!
            </Typography>
            <Box
                height={'100vh'}
                justifyContent={'flex-end'}
                alignItems={'flex-start'}
                flexDirection={'column'}
                sx={{ overflowY: 'auto' }}
            >
                {rooms.length !== 0 ?
                    (
                        rooms.map((roomName: any, idx: any) => (
                            <Typography key={idx}>
                                {roomName ? (
                                    roomName.data + " join"
                                ) : (
                                    "Unnamed room"
                                )}
                            </Typography>
                        ))
                    ) : (
                        <Typography>
                            No rooms yet, create one!
                        </Typography>
                    )
                }
            </Box>

        </Container>
    );
}
export default MainPage;
