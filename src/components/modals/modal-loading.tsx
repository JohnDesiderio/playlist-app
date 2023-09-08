import React from 'react';
import { Grid, GridProps, Typography, CircularProgress } from '@mui/material';
import { gridModalStyles, typographyStyles, circularProgress } from './modal-styles';

const LoadingModal:React.FC<GridProps> = (props: GridProps) => {
    return (
        <Grid 
            container
            justifyContent='center'
            alignItems='center'
            {...props}
        >
            <Grid
                container
                alignItems='center' 
                justifyContent='center'
                direction='column'
                sx={gridModalStyles}
            >
                <Grid item>
                    <Typography sx={typographyStyles}>
                        Loading...
                    </Typography>
                </Grid>   
                <Grid item>
                    <CircularProgress sx={circularProgress}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LoadingModal