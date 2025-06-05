export interface User {
    id: string,
    name: string,
    email: string,
    profilePhoto: string,
    selected?: boolean
};

export interface UserFormData {
    name: string,
    email: string,
    profilePhoto: File | null,
};

