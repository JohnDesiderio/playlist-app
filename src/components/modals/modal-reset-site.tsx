import React from 'react';
import { Grid, GridProps, Typography, Button } from '@mui/material';
import { gridModalStyles, typographyStyles, exitButtonStyles } from './modal-styles';

const ResetSiteModal:React.FC<GridProps> = (props: GridProps) => {
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
                        Hmmm, I think you should check your spotify 🤩🥸🤓
                        <br/>
                        If the playlist isn't there, send me an email
                        <br/>
                        @ johnfrancisdesiderio2@gmail.com, and let me
                        <br/>
                        know that you had a problem. Keep in mind, there
                        <br/>
                        is no money to maintain the cloud and it might've
                        <br/>
                        used all the free allowed for today.
                    </Typography>
                </Grid>
                <Button
                    onClick={() => {
                        document.location = 'https://johndesiderio.github.io/playlist-app/'
                    }}
                    sx={exitButtonStyles}
                >
                    Exit
                </Button>
            </Grid>
        </Grid>
    )
}

export default ResetSiteModal;