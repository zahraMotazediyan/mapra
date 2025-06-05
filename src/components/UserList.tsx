import {useEffect} from 'react';
import {Grid, CircularProgress, Box} from '@mui/material';
import UserCard from './UserCard';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {setLoading, setUsers, toggleUserSelection} from '@/store/features/userSlice';
import {User} from '@/types/user';

interface UserListProps {
    onUsersLoad?: (users: User[]) => void;
}

export default function UserList({onUsersLoad}: UserListProps) {
    const dispatch = useAppDispatch();
    const {users, loading} = useAppSelector((state) => state.users);

    useEffect(() => {
        const fetchUsers = async () => {
            if (users.length === 0) {
                dispatch(setLoading(true));
                try {

                    const mockUsers = Array.from({length: 10}, (_, index) => ({
                        id: `user-${index + 1}`,
                        name: `User ${index + 1}`,
                        email: `user${index + 1}@example.com`,
                        profilePhoto: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
                        selected: false,
                    }));

                    dispatch(setUsers(mockUsers));
                    onUsersLoad?.(mockUsers);
                } catch (error) {
                    console.error('Error initializing users:', error);
                } finally {
                    dispatch(setLoading(false));
                }
            } else {
                onUsersLoad?.(users);
            }
        };

        fetchUsers();
    }, [dispatch, onUsersLoad, users.length]);

    const handleUserSelect = (userId: string, selected: boolean) => {
        dispatch(toggleUserSelection({userId, selected}));
    };

    if (loading) {
        return (
            <Box className="flex justify-center items-center min-h-screen">
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Box className="p-4">
            <Grid container spacing={2}>
                {users.map((user) => (
                    <Box key={user.id} sx={{width: {xs: '100%', sm: '50%', md: '33.33%', lg: '25%'}, p: 1}}>
                        <UserCard user={user} onSelect={handleUserSelect}/>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
}