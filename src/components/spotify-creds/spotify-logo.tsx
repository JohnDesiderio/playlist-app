import React from 'react';
import { Grid, GridProps, Typography, Box } from '@mui/material';
import SpotifyLogo from '../../assets/SpotifyLogo.svg'
import { spotifyLogoContainerStyles, spotifyLogoBox, typographyStyles } from './spotify-logo-styles';

const SpotifyLogoCreds:React.FC<GridProps> = (props: GridProps) => {
    return (
        <Grid container 
            {...props}
            sx={spotifyLogoContainerStyles}
            direction='column'
            justifyContent='center'
            alignItems='center'
        >
            <Grid container justifyContent='center' direction='row'>
                <Typography sx={typographyStyles}>
                    Powered by Spotify
                </Typography>
                <Box
                    sx={spotifyLogoBox}
                >
                    <img
                        src={SpotifyLogo}
                    ></img>
                </Box>
            </Grid> 
        </Grid>
    )
}

export default SpotifyLogoCreds;