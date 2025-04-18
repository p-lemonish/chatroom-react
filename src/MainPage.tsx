import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebSocketMessage } from "react-use-websocket/dist/lib/types";

function MainPage() {

    const socketUrl = 'ws://localhost:8080/main';
    const {
        sendJsonMessage,
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl, {
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: () => true,
        onOpen: (() => {
            sendJsonMessage({
                type: "auth",
                username: username + "_supersecretmessage",
                text: "hello server",
            });
        }),
    });
    const location = useLocation();
    const username = location.state?.username;
    const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
    const [message, setMessage] = useState<WebSocketMessage>("");

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev: any) => prev.concat(lastMessage));
        }
    }, [lastMessage]);

    const handleClickSendMessage = useCallback(() => {
        sendJsonMessage({
            type: "message",
            username: username,
            text: message,
        });
        setMessage("");
    }, [message]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    function handleMessageChange(event: any) {
        setMessage(event.target.value);
    }

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
            <Typography variant="h4">
                Welcome to the Main page (Connection status: {connectionStatus})
            </Typography>
            <Box height={'100vh'}>
                {messageHistory.map((message: any, idx: any) => (
                    <Typography key={idx}>
                        {message ? message.data : null}
                    </Typography>
                ))}
            </Box>
            <TextField variant='outlined' value={message} onChange={handleMessageChange}>
            </TextField>
            <Button variant='contained' onClick={handleClickSendMessage}>
                Chat!
            </Button>
        </Container >
    );
}
export default MainPage;
