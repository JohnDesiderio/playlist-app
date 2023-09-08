import React from 'react';
import { Grid } from '@mui/material';
import { landingPageStyles } from './landing-page-styles';
import ComponentManagerGrid from '../component-manager/component-manager';

const LandingPage:React.FC<{}> = () => {

    return (
        <Grid
            container
            sx={landingPageStyles}
            justifyContent='center'
            flex={1}
        >
            <Grid item>
                <ComponentManagerGrid/>
            </Grid>
        </Grid>
    )
}

export default LandingPage;