import { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function FrontPage() {
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

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
            if (response.ok) {
                navigate("/main", {
                    state: {
                        username: username,
                    }
                });
            } else {
                alert("Something went wrong, try again");
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

export default FrontPage;
