import React, { useState } from 'react';
import SearchTextField from './search-textfield';
import { Grid } from '@mui/material';
import SearchButton from './search-button';

const TextfieldSearchGrid:React.FC<{}> = () => {
    const [disableSearch, setDisableSearch] = useState<boolean>(true);
    
    const textfieldCallback = (disable: boolean) => {
        setDisableSearch(disable);
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
                disabled={disableSearch}
            />
        </Grid>
    );
}

export default TextfieldSearchGrid;