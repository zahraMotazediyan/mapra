'use client';

import './globals.css';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Inter} from 'next/font/google';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@/store';

const inter = Inter({subsets: ['latin']});

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3f51b5',
            light: '#757de8',
            dark: '#002984',
        },
        secondary: {
            main: '#f50057',
            light: '#ff4081',
            dark: '#c51162',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily,
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                },
                outlined: {
                    borderWidth: '2px',
                    '&:hover': {
                        borderWidth: '2px',
                    },
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    borderRadius: 12,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {children}
                </ThemeProvider>
            </PersistGate>
        </Provider>
        </body>
        </html>
    );
}