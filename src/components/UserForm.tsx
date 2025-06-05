import {useCallback, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDropzone} from 'react-dropzone';
import {
    TextField,
    Button,
    Box,
    CircularProgress,
    Typography,
    Paper,
} from '@mui/material';
import {CloudUpload} from '@mui/icons-material';
import toast from 'react-hot-toast';
import {UserFormData} from '@/types/user';
import {processExcelFile, validateFileType} from '@/utils/fileProcessing';
import {useRouter} from 'next/navigation';
import {useAppDispatch} from '@/store/hooks';
import {addUser, setUsers} from '@/store/features/userSlice';
import {v4 as uuidv4} from 'uuid';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    profilePhoto: Yup.mixed().required('Profile photo is required'),
});

export default function UserForm() {
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const formik = useFormik<UserFormData>({
        initialValues: {
            name: '',
            email: '',
            profilePhoto: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {

                await new Promise((resolve) => setTimeout(resolve, 1500));

                const newUser = {
                    id: uuidv4(),
                    name: values.name,
                    email: values.email,
                    profilePhoto: previewUrl || 'https://i.pravatar.cc/150',
                    selected: false,
                };

                dispatch(addUser(newUser));
                toast.success('User added successfully!');
                router.push('/users');
            } catch (error) {
                toast.error('Failed to add user');
            } finally {
                setLoading(false);
            }
        },
    });

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (file) {
                formik.setFieldValue('profilePhoto', file);
                const reader = new FileReader();
                reader.onload = () => {
                    setPreviewUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        },
        [formik]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        maxFiles: 1,
    });

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!validateFileType(file)) {
            toast.error('Please upload a valid Excel or CSV file');
            return;
        }

        try {
            setLoading(true);
            const data = await processExcelFile(file);
            // Add IDs to imported users and set selected to false
            const usersWithIds = data.map(user => ({
                ...user,
                id: uuidv4(),
                selected: false,
                profilePhoto: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
            })) as any[];

            dispatch(setUsers(usersWithIds));
            toast.success('Users imported successfully!');
            router.push('/users');
        } catch (error) {
            toast.error('Error processing file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper className="p-6 max-w-md mx-auto mt-8">
            <Typography variant="h5" className="mb-4">
                Add New User
            </Typography>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />

                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <Box
                    {...getRootProps()}
                    className={`p-4 border-2 border-dashed rounded-md text-center cursor-pointer ${
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                >
                    <input {...getInputProps()} />
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-h-32 mx-auto rounded"
                        />
                    ) : (
                        <CloudUpload className="text-gray-400 text-3xl mb-2"/>
                    )}
                    <Typography>
                        {isDragActive
                            ? 'Drop the image here'
                            : 'Drag and drop a profile photo, or click to select'}
                    </Typography>
                </Box>

                <Box className="space-y-2">
                    <Typography variant="subtitle2" className="mb-2">
                        Or upload user data from Excel/CSV
                    </Typography>
                    <input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="excel-upload"
                    />
                    <label htmlFor="excel-upload">
                        <Button
                            component="span"
                            variant="outlined"
                            fullWidth
                            disabled={loading}
                        >
                            Upload Excel/CSV File
                        </Button>
                    </label>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    className="mt-4"
                >
                    {loading ? <CircularProgress size={24}/> : 'Submit'}
                </Button>
            </form>
        </Paper>
    );
}