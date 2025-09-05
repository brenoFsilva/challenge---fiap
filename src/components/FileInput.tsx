import type { ChangeEvent } from 'react';
import * as XLSX from 'xlsx'
import type Data from '../interfaces/Data';

interface FileInputProps {
    setData: (arg0: Array<Data>) => void
}

function FileInput({setData}: FileInputProps) {

    const getFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const data = await file.arrayBuffer();

            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const json : Array<Data> = XLSX.utils.sheet_to_json(worksheet, { raw: false });
            setData(json);
        }
    };

    return (
        <>
            <input type="file" accept=".xlsx, .xls" onChange={getFile} />
        </>
    )
}

export default FileInput
