import { Box, Button, Container, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

function MainPage() {

    const socketUrl = 'ws://localhost:8080/main';

    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
    });
    const location = useLocation();
    const username = location.state?.username;

    const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev: any) => prev.concat(lastMessage));
        }
    }, [lastMessage]);

    const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

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
            <Typography variant="h1">
                Welcome to the Main page, {username}
            </Typography>
            <Typography>
                The websocket is currently {connectionStatus}
            </Typography>
            <Box height={'100vh'}>
                {lastMessage ?
                    <Typography>
                        Last message: {lastMessage.data}
                    </Typography>
                    : null}
                {messageHistory.map((message: any, idx: any) => (
                    <Typography key={idx}>
                        {message ? message.data : null}
                    </Typography>
                ))}
            </Box>
            <Button variant='contained' onClick={handleClickSendMessage}>
                Chat!
            </Button>
        </Container >
    );
}
export default MainPage;
