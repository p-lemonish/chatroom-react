import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function MainPage() {
    const location = useLocation();
    const username = location.state?.username;

    const handleSubmitMessage = async () => {

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

            <Typography variant="h1">
                Welcome to the Main page, {username}
            </Typography>
            <Box height={'100vh'}>
                chat here
            </Box>
            <TextField
                required
                type='text'
                fullWidth
                margin='normal'
                label="Write your message"
                variant="filled"
            />
            <Button variant='contained' onClick={handleSubmitMessage}>
                Chat!
            </Button>



        </Container >
    );
}
export default MainPage;
