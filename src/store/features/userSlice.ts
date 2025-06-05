import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '@/types/user';

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        toggleUserSelection: (state, action: PayloadAction<{ userId: string; selected: boolean }>) => {
            const user = state.users.find(user => user.id === action.payload.userId);
            if (user) {
                user.selected = action.payload.selected;
            }
        },
    },
});

export const {
    setLoading,
    setError,
    setUsers,
    addUser,
    updateUser,
    toggleUserSelection,
} = userSlice.actions;

export default userSlice.reducer; 