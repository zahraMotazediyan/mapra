import * as XLSX from 'xlsx';
import { User } from '@/types/user';

export const processExcelFile = async (file: File): Promise<Partial<User>[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet) as Partial<User>[];
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsBinaryString(file);
    });
};

export const validateFileType = (file: File): boolean => {
    const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
        'application/vnd.ms-excel', // xls
        'text/csv', // csv
    ];
    return validTypes.includes(file.type);
};

export const exportUsersToExcel = (users: User[]): void => {
    const exportData = users.map(({ id, name, email, profilePhoto }) => ({
        ID: id,
        Name: name,
        Email: email,
        'Profile Photo URL': profilePhoto,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');


    XLSX.writeFile(workbook, 'user_list.xlsx');
}; 