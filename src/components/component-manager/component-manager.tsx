import React, { useState, useEffect } from 'react';
import { Grid, GridProps, Typography, Button, Modal } from '@mui/material';
import { headerTextStyles, buttonStyles, headerGridStyles } from './component-manager-styles';
import TextfieldSearchGrid from '../textfield-search/textfield-search-grid';
import { 
    getAllDocuments, 
    redirectToAuthCodeFlow, 
    getAccessToken, 
    getUserProfile,
} from './business-logic/appRequest';
import EmptyModal from '../modals/modal-empty-col';
import AboutModal from '../modals/modal-about';
import ResetSiteModal from '../modals/modal-reset-site';
import LoadingModal from '../modals/modal-loading';
import ChoiceModal from '../modals/choice-modal/modal-choice';
import SpotifyLogoCreds from '../spotify-creds/spotify-logo';

// Bear in mind the implementation using PKCE Authorization pattern for improved security.
// Other option is the implicit grant flow which is much weaker security lol.
const client_id = "9dc3cfe6f686431f878571165c601f37"

const ComponentManagerGrid:React.FC<GridProps> = (props: GridProps) => {
    const [buttonPress, setButtonPress] = useState<number>(0);
    const [emptyModal, setEmptyModal] = useState<boolean>(false);
    const [aboutModal, setAboutModal] = useState<boolean>(false);
    const [resetModal, setResetModal] = useState<boolean>(false);
    const [loadingModal, setLoadingModal] = useState<boolean>(false);
    const [choiceModal, setChoiceModal] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [displayName, setDisplayName] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<string | undefined>(undefined);

    const handleEmptyModalOpen = () => setEmptyModal(true);
    const handleEmptyModalClose = () => setEmptyModal(false);

    const handleAboutModalOpen = () => setAboutModal(true);
    const handleAboutModalClose = () => setAboutModal(false);

    const handleResetModalOpen = () => setResetModal(true);

    const handleLoadingModal = (open: boolean) => setLoadingModal(open);

    const handleChoiceModal = (open: boolean) => setChoiceModal(open);

    // Avoid nesting too many async functions cuz it needs to be readable lol
    // Refactor and introduce new page using routing for redesign!!!
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        if (code) {
            getAccessToken(client_id, code)
            .then((res) => {
                if (res?.data.access_token != undefined) {
                    setAccessToken(res.data.access_token);
                    getUserProfile(res.data.access_token)
                    .then(response => {
                        if (response?.data !== null) {
                            setDisplayName(response?.data.display_name);
                            setUserId(response?.data.id);
                        }
                    })
                .catch(e => { console.log(e) })
                }
            });
        }
    }, [])

    useEffect(() => {    
        if (displayName !== undefined && userId !== undefined && accessToken !== undefined) {
            handleChoiceModal(true);
        }
    }, [displayName, userId])

    // Mange flow to spotify authorization website
    useEffect(() => {
        if (buttonPress !== 0) {
            getAllDocuments()
            .then(res => {
                if (res === 0) {
                    handleEmptyModalOpen();
                } else {
                    redirectToAuthCodeFlow(client_id);   
                }
            })
            .catch(e => {console.log(e)});
        }
    }, [buttonPress]);

    return (
        <Grid {...props} sx={headerGridStyles} container justifyContent='center'>
            <Grid item>
                <Typography
                    sx={headerTextStyles}
                >
                    Vibe Curator for Playlists
                </Typography>
                <SpotifyLogoCreds/>
            </Grid>
            <Grid
                container
                justifyContent='center'
            >   
                <Grid item>
                    <Button
                        data-testid='mock-about-button'
                        onClick={handleAboutModalOpen}
                        sx={buttonStyles}
                    >
                        About
                    </Button>
                    <Button
                        data-testid='mock-mix-songs-button'
                        onClick={() => {
                            setButtonPress(buttonPress + 1);
                        }}
                        sx={buttonStyles}
                    >
                        Mix Songs
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <TextfieldSearchGrid
                    executeLoadingModal={handleLoadingModal}
                />
            </Grid>
            <Modal open={emptyModal} onClose={handleEmptyModalClose}>
                <EmptyModal exit_function={handleEmptyModalClose}/>
            </Modal>
            <Modal open={aboutModal} onClose={handleAboutModalClose}>
                <AboutModal exit_function={handleAboutModalClose}/>
            </Modal>
            <Modal open={resetModal}>
                <ResetSiteModal/>
            </Modal>
            <Modal open={loadingModal}>
                <LoadingModal/>
            </Modal>
            <Modal open={choiceModal}>
                <ChoiceModal 
                    display_name={displayName}
                    loading_modal={handleLoadingModal}
                    exit_function={handleChoiceModal}
                    access_token={accessToken}
                    user_id={userId}
                    handle_reset_modal={handleResetModalOpen}
                />
            </Modal>
        </Grid>
    )
}

export default ComponentManagerGrid;