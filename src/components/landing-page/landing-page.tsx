import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

/*
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
    
    return (
        <Box>
            <Button>
                Submit
            </Button>
        </Box>
    )
}

export default LandingPage;