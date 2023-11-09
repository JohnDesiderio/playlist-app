import React, { useState, useEffect } from 'react';
import SearchTextField from './search-textfield';
import { Grid, Modal } from '@mui/material';
import SearchButton from './search-button';
import { getAccessToken, assembleMusic } from './business-logic/appRequest';
import ResultsGrid from '../results-grid/results-grid';
import ThankYouModal from '../modals/modal-thank-you';
import { ITrack } from '../results-grid/IResultsTypes';
import { ITextfieldSearchGrid } from './ITextfieldProps';

const TextfieldSearchGrid:React.FC<ITextfieldSearchGrid> = (props: ITextfieldSearchGrid) => {
    const [disableSearch, setDisableSearch] = useState<boolean>(true);
    const [query, setQuery] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string>('');
    const [buttonPress, setButtonPress] = useState<boolean>(false);
    const [response, setResponse] = useState<Array<ITrack> | undefined>();
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

    const setNewDisplaySongs = (songs: Array<ITrack> | undefined) => {
        setResponse(songs);
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
            assembleMusic(
                accessToken, 
                query, 
                props.executeLoadingModal,
                setNewDisplaySongs,    
            );
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
                data-testid='search-button'
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
                <ThankYouModal exit_function={setThankYouClose}/>
            </Modal>
        </Grid>
    );
}

export default TextfieldSearchGrid;