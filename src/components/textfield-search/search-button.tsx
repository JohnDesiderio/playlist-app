import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { searchButtonStyles } from './textfield-search-styles';

const SearchButton:React.FC<ButtonProps> = (props: ButtonProps) => {

    return (
        <Button {...props} sx={searchButtonStyles}>Submit</Button>
    )
}

export default SearchButton;