import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebSocketMessage } from "react-use-websocket/dist/lib/types";

function Chatroom() {

    // TODOs
    // - current contents of this component to be reused as component for chatrooms generally
    // - mainpage for joining/creating chats, there should always be the main chat avaialble by default
    // - sidepanel for navigating/creating chatrooms
    // - ui work, would like to see the chat interface looking more like a terminal? for example the TextField
    //      for building the message could look like ->  username > messagehere, kind of oldschool look?

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
                username: username + "_supersecretmessage", // this could be a request to the backend to send a jwt as well.
                chatName: chatName,
                text: "hello server",
            });
        }),
    });
    let params = useParams();
    const chatName = params.room;
    const location = useLocation();
    const username = location.state?.username;
    const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
    const [message, setMessage] = useState<WebSocketMessage>("");
    const messageEndRef = useRef<null | HTMLDivElement>(null);
    const MAXMESSAGESIZE = 200;

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev: any) => [lastMessage, ...prev.slice(0, MAXMESSAGESIZE)]);
        }
    }, [lastMessage]);

    useEffect(() => {
        const scrollToBottom = () => {
            messageEndRef.current?.scrollIntoView({ behavior: "instant", block: "end" });
        };
        scrollToBottom();
    }, [messageHistory]);

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
                Welcome to {chatName} (Connection status: {connectionStatus})
            </Typography>
            <Box
                height={'100vh'}
                justifyContent={'flex-end'}
                alignItems={'flex-start'}
                flexDirection={'column'}
                sx={{ overflowY: 'auto' }}
            >
                {messageHistory.map((message: any, idx: any) => (
                    <Typography key={idx}>
                        {message ? message.data : null}
                    </Typography>
                ))}
                <div ref={messageEndRef} />
            </Box>
            <TextField variant='outlined' value={message} onChange={handleMessageChange}>
            </TextField>
            <Button variant='contained' onClick={handleClickSendMessage}>
                Chat!
            </Button>
        </Container >
    );
}
export default Chatroom;
