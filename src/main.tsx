import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import FrontPage from './FrontPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './MainPage.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <FrontPage />
    },
    {
        path: "/main",
        element: <MainPage />
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline />
        <RouterProvider router={router} />
    </StrictMode>,
);
