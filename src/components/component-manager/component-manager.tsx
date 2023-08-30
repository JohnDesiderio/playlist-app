import React, { useState, useEffect } from 'react';
import { Grid, GridProps, Typography, Button, Modal } from '@mui/material';
import { headerTextStyles, buttonStyles, headerGridStyles } from './component-manager-styles';
import TextfieldSearchGrid from '../textfield-search/textfield-search-grid';
import { getAllDocuments, redirectToAuthCodeFlow, getAccessToken } from './business-logic/appRequest';
import EmptyModal from '../modals/modal-empty-col';
import AboutModal from '../modals/modal-about';

//Bear in mind the implementation using PKCE Authorization pattern for improved security.
// Other option is the implicit grant flow
const client_id = "9dc3cfe6f686431f878571165c601f37"

const ComponentManagerGrid:React.FC<GridProps> = (props: GridProps) => {
    const [buttonPress, setButtonPress] = useState<number>(0);
    const [emptyModal, setEmptyModal] = useState<boolean>(false);
    const [aboutModal, setAboutModal] = useState<boolean>(false);

    const handleEmptyModalOpen = () => setEmptyModal(true);
    const handleEmptyModalClose = () => setEmptyModal(false);

    const handleAboutModalOpen = () => setAboutModal(true);
    const handleAboutModalClose = () => setAboutModal(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code')
        if (code) {
            getAccessToken(client_id, code)
            .then((res) => {console.log(res)});
        }
    }, [])

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
                    Global Playlist Mixer
                </Typography>
            </Grid>
            <Grid
                container
                justifyContent='center'
            >   
                <Grid item>
                    <Button
                        onClick={handleAboutModalOpen}
                        sx={buttonStyles}
                    >
                        About
                    </Button>
                    <Button
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
                <TextfieldSearchGrid/>
            </Grid>
            <Modal open={emptyModal} onClose={handleEmptyModalClose}>
                <EmptyModal exitFunction={handleEmptyModalClose}/>
            </Modal>
            <Modal open={aboutModal} onClose={handleAboutModalClose}>
                <AboutModal exitFunction={handleAboutModalClose}/>
            </Modal>
        </Grid>
    )
}

export default ComponentManagerGrid;