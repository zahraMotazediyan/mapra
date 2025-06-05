'use client';

import UserList from '@/components/UserList';
import Link from 'next/link';
import {Button, Container, Box, Typography} from '@mui/material';
import {PersonAdd, FileDownload} from '@mui/icons-material';
import {exportUsersToExcel} from '@/utils/fileProcessing';
import {useState} from 'react';
import {User} from '@/types/user';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);

    const handleExport = () => {
        exportUsersToExcel(users);
    };

    return (
        <Container maxWidth={false}>
            <Box className="flex flex-col items-center mt-8 mb-12">
                <Typography variant="h4" component="h1" className="mb-4 font-bold text-center">
                    User Directory
                </Typography>
                <Typography variant="subtitle1" className="text-center text-gray-400 mb-8">
                    View and manage all registered users
                </Typography>
                <Box className="flex gap-4 mb-8">
                    <Link href="/" passHref>
                        <Button
                            variant="outlined"
                            component="a"
                            startIcon={<PersonAdd/>}
                            size="large"
                        >
                            Add New User
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        startIcon={<FileDownload/>}
                        size="large"
                        onClick={handleExport}
                    >
                        Export to Excel
                    </Button>
                </Box>
            </Box>
            <UserList onUsersLoad={setUsers}/>
        </Container>
    );
}