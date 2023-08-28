import React from 'react';
import SearchTextField from './search-textfield';
import { Grid } from '@mui/material';
import SearchButton from './search-button';

const TextfieldSearchGrid:React.FC<{}> = (props) => {
    return (
        <Grid 
            container 
            alignItems='center' 
            justifyContent='center' 
            direction='column'
            sx={{marginTop: '2vh'}}
        >
            <SearchTextField/>
            <SearchButton/>
        </Grid>
    );
}

export default TextfieldSearchGrid;