import { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const apiUrl = ""; // placeholder for now, can be used for setting dev/stage/prod url later
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleSubmitUsername = async () => {
    const url = `${apiUrl}/start`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      });
      if (response.ok) {
        const data = await response.json();
        navigate("/chat", {
          state: {
            username: data.Username,
          },
        });
      } else {
        alert("The name could be in use. Try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxHeight: 600,
        paddingBottom: "20px",
        paddingTop: "20px",
      }}
    >
      <Typography variant="h1">Chatroom</Typography>
      <Typography variant="h3">
        Choose a name or stay incognito — your call!
      </Typography>
      <TextField
        type="text"
        fullWidth
        margin="normal"
        label="Write a username here if you want one"
        variant="filled"
        value={username}
        onChange={handleUsernameChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmitUsername();
          }
        }}
      />
      <Button variant="contained" onClick={handleSubmitUsername}>
        Chat!
      </Button>
      <Typography
        variant="caption"
        sx={{
          marginTop: "auto",
          paddingTop: "20px",
          textAlign: "center",
          color: "gray",
        }}
      >
        This chat doesn’t store messages or personal info. Your IP is
        temporarily logged by the server for technical reasons.
      </Typography>
    </Container>
  );
}

export default FrontPage;
