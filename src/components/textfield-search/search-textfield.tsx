import React, { useState, useEffect } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { searchTextFieldStyles } from './textfield-search-styles';
import { ITextfieldProps } from './ITextfieldProps';

type SearchTextFieldProps = TextFieldProps & ITextfieldProps;

const SearchTextField:React.FC<SearchTextFieldProps> = (props: SearchTextFieldProps) => {
    const [disableSearch, setDisableSearch] = useState<boolean>(true);
    const [text, setText] = useState<string>('');

    const onTextChange = (e: any) => {
        if (/(?!^$)([^\s])/.test(e.target.value)) {
             setDisableSearch(false);
        } else {
            setDisableSearch(true);
        }
        setText(e.target.value);
    }
    
    useEffect(() => {
        props.handleDisable(disableSearch, text);
    }, [text])

    return (
        <TextField
            {...props}
            sx={searchTextFieldStyles}
            helperText='Search a song!'
            value={text}
            onChange={onTextChange}
        />
    )
}
 
export default SearchTextField;