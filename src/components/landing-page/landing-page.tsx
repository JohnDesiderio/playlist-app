import React, { useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { landingPageStyles } from './landing-page-styles';
import ComponentManagerGrid from '../component-manager/component-manager';
import TextfieldSearchGrid from '../textfield-search/textfield-search-grid';

/*
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const api = SpotifyApi.withUserAuthorization(
    '9dc3cfe6f686431f878571165c601f37',
    'http:127.0.0.1:5000/create',
    ['playlist-modify-private', 'playlist-modify-public']
)
*/

/*
remember that it pings ~/Code/simple-flask-backend/app.py
if (count !== 0) {
    const foo = async (sdk: SpotifyApi) => {
        return await sdk.currentUser.profile();
    }

    const sdk = SpotifyApi.withUserAuthorization('9dc3cfe6f686431f878571165c601f37', 'http://127.0.0.1:5000/create', ['playlist-modify-private', 'playlist-modify-public']);

    foo(sdk)
    .then(res => { console.log(res); })
}
*/

const LandingPage:React.FC<{}> = () => {
    // use useEffect to call spotify token then pass down the props

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