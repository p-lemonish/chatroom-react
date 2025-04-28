import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

type ChatroomProps = {
  roomname: string;
};

function Chatroom({ roomname }: ChatroomProps) {
  // TODOs
  // - ui work, would like to see the chat interface looking more like a terminal? for example the TextField
  //      for building the message could look like ->  username > messagehere, kind of oldschool look?

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${protocol}//${window.location.host}/chat`;
  const socketUrl = wsUrl;
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: () => true,
    onOpen: () => {
      sendJsonMessage({
        type: "message",
        username: username,
        roomname: roomname,
        text: "hello server",
      });
    },
  });
  const location = useLocation();
  const username = location.state?.username;
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
  const [message, setMessage] = useState<string>("");
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const MAXMESSAGEAMOUNT = 200;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev: any) => [
        ...prev.slice(0, MAXMESSAGEAMOUNT),
        lastMessage,
      ]);
    }
  }, [lastMessage]);

  useEffect(() => {
    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
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
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  function handleMessageChange(event: any) {
    setMessage(event.target.value);
  }

  const send = () => {
    if (!message.trim()) {
      alert("Message can't be empty");
      return;
    }
    handleClickSendMessage();
    setMessage("");
    inputRef.current?.focus();
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingTop: 2,
      }}
    >
      <Typography variant="h6">
        Joined room: {roomname} (Connection status: {connectionStatus})
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messageHistory.map((message: any, idx: any) => (
          <Typography key={idx}>{message ? message.data : null}</Typography>
        ))}
        <div ref={messageEndRef} />
      </Box>
      <TextField
        variant="outlined"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            send();
          }
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          send();
        }}
      >
        Chat!
      </Button>
    </Container>
  );
}
export default Chatroom;
