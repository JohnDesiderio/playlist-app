import React, { useState } from 'react';
import SearchTextField from './search-textfield';
import { Grid } from '@mui/material';
import SearchButton from './search-button';

const TextfieldSearchGrid:React.FC<{}> = () => {
    const [disableSearch, setDisableSearch] = useState<boolean>(true);
    const [query, setQuery] = useState<string>('');

    const textfieldCallback = (disable: boolean, text: string) => {
        setDisableSearch(disable);
        setQuery(text);
    }

    return (
        <Grid 
            container 
            alignItems='center' 
            justifyContent='center' 
            direction='column'
            sx={{marginTop: '2vh'}}
        >
            <SearchTextField
                handleDisable={textfieldCallback}
            />
            <SearchButton 
                onClick={() => {console.log(query)}}
                disabled={disableSearch}
            />
            
        </Grid>
    );
}

export default TextfieldSearchGrid;