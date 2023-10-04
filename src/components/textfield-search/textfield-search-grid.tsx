import React, { useState, useEffect } from 'react';
import SearchTextField from './search-textfield';
import { Grid, Modal } from '@mui/material';
import SearchButton from './search-button';
import { getAccessToken, getSearchResults, assembleMusic } from './business-logic/appRequest';
import ResultsGrid from '../results-grid/results-grid';
import { ISpotifyResponse } from './business-logic/ISpotifyTypes';
import ThankYouModal from '../modals/modal-thank-you';

const TextfieldSearchGrid:React.FC<{}> = () => {
    const [disableSearch, setDisableSearch] = useState<boolean>(true);
    const [query, setQuery] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string>('');
    const [buttonPress, setButtonPress] = useState<boolean>(false);
    const [response, setResponse] = useState<ISpotifyResponse | undefined>();
    const [thankYou, setThankYou] = useState<boolean>(false);

    const setThankYouOpen = () => setThankYou(true);
    const setThankYouClose = () => setThankYou(false); 

    const textfieldCallback = (disable: boolean, text: string) => {
        setDisableSearch(disable);
        setQuery(text);
    }

    const resetSearchBar = () => {
        setResponse(undefined);
    }

    useEffect(() => {
        getAccessToken()
        .then(res => {
            if (res?.data !== undefined) {
                setAccessToken(res.data.access_token);
            }
        })
        .catch(e => {console.log(e)});
    }, [buttonPress])

    useEffect(() => {
        if (query !== '') {
            const info = assembleMusic(accessToken, query);
            info.then((obs) => {
                obs.subscribe((track) => {
                    console.log(track);
                })
            });
            
        }
    }, [accessToken])

    return (
        <Grid 
            container 
            alignItems='center' 
            justifyContent='center' 
            direction='row'
        >
            <SearchTextField
                handleDisable={textfieldCallback}
            />
            <SearchButton 
                onClick={() => {setButtonPress(!buttonPress)}}
                disabled={disableSearch}
            />
            <ResultsGrid
                response={response}
                resetResponse={resetSearchBar}
                openThankYou={setThankYouOpen}
                accessToken={accessToken}
            />
            <Modal open={thankYou} onClose={() => setThankYou(false)}>
                <ThankYouModal exitFunction={setThankYouClose}/>
            </Modal>
        </Grid>
    );
}

export default TextfieldSearchGrid;