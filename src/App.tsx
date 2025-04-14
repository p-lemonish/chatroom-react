import { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';

function App() {
    const [username, setUsername] = useState("");

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    };
    const handleSubmitUsername = async () => {
        const url = "http://localhost:8080/start";
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ username: username })
            });
            console.log(response.status);
            setUsername("");
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
            <Typography variant='h1'>
                LiveChat
            </Typography>
            <Typography variant='h3'>
                Welcome! Type a username to start chatting.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4 }}>
                Change Password
            </Typography>
            <TextField
                required
                type='text'
                fullWidth
                margin='normal'
                label="Write a username here"
                variant="filled"
                value={username}
                onChange={handleUsernameChange}
            />
            <Button variant='contained' onClick={handleSubmitUsername}>
                Chat!
            </Button>
        </Container>
    );
}

export default App;
