'use client';

import UserForm from '@/components/UserForm';
import {Toaster} from 'react-hot-toast';
import Link from 'next/link';
import {Button, Container, Box, Typography, Paper} from '@mui/material';
import {PeopleAlt} from '@mui/icons-material';

export default function Home() {
    return (
        <Container>
            <Box className="flex flex-col items-center mt-8 mb-12">
                <Typography variant="h4" component="h1" className="mb-4 font-bold text-center">
                    User Management System
                </Typography>
                <Box className="flex gap-4 mb-8">
                    <Link href="/users" passHref>
                        <Button
                            variant="outlined"
                            component="a"
                            startIcon={<PeopleAlt/>}
                            size="large"
                        >
                            View Users
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Paper elevation={0}
                   className="p-6 backdrop-blur-sm bg-opacity-50 bg-gradient-to-br from-gray-900 to-gray-800">
                <UserForm/>
            </Paper>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#333',
                        color: '#fff',
                        borderRadius: '8px',
                    },
                }}
            />
        </Container>
    );
}
