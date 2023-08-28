import React from 'react';
import { Grid, GridProps, Typography, Button } from '@mui/material';
import { headerTextStyles, buttonStyles, headerGridStyles } from './header-styles';

const HeaderGrid:React.FC<GridProps> = (props: GridProps) => {

    return (
        <Grid sx={headerGridStyles} container justifyContent='center'>
            <Grid item>
                <Typography
                    sx={headerTextStyles}
                >
                    Global Playlist Mixer
                </Typography>
            </Grid>
            <Grid
                container
                justifyContent='center'
            >   
                <Grid item>
                    <Button
                        sx={buttonStyles}
                    >
                        About
                    </Button>
                    <Button
                        sx={buttonStyles}
                    >
                        Mix Songs
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <Button>Yo</Button>
            </Grid>
        </Grid>
    )
}

export default HeaderGrid;