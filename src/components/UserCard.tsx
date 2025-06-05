import {Checkbox, Card, CardContent, Typography, Avatar, Box} from '@mui/material';
import {User} from '@/types/user';

interface UserCardProps {
    user: User;
    onSelect: (userId: string, selected: boolean) => void;
}

export default function UserCard({user, onSelect}: UserCardProps) {
    return (
        <Card
            className="relative hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800">
            <CardContent className="flex items-center p-6">
                <Box className="relative flex-shrink-0">
                    <Avatar
                        src={user.profilePhoto}
                        alt={user.name}
                        className="w-16 h-16 ring-2 ring-primary-500 shadow-lg"
                    />
                    <Checkbox
                        checked={user.selected}
                        onChange={(e) => onSelect(user.id, e.target.checked)}
                        className="absolute -top-2 -right-2 bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    />
                </Box>
                <Box className="ml-6 flex-grow">
                    <Typography variant="h6" className="font-semibold mb-1">
                        {user.name}
                    </Typography>
                    <Typography variant="body2" className="text-gray-400">
                        {user.email}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}