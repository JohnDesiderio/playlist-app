import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const SearchTextField:React.FC<TextFieldProps> = (props: TextFieldProps) => {
    return (
        <TextField
            sx={{
            
            }}
            helperText='Search a song!'
        />
    )
}
 
export default SearchTextField;