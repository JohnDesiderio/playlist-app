import React, { useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { searchTextFieldStyles } from './textfield-search-styles';

const SearchTextField:React.FC<TextFieldProps> = (props: TextFieldProps) => {
    const [text, setText] = useState<string>('')


    const onTextChange = (e: any) => {
        setText(e.target.value);
    }
    
    return (
        <TextField
            sx={searchTextFieldStyles}
            helperText='Search a song!'
            value={text}
            onChange={onTextChange}
        />
    )
}
 
export default SearchTextField;