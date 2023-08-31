import React, { useState, useEffect } from 'react';
import { Grid, GridProps, Typography, Button, Modal } from '@mui/material';
import { headerTextStyles, buttonStyles, headerGridStyles } from './component-manager-styles';
import TextfieldSearchGrid from '../textfield-search/textfield-search-grid';
import { 
    getAllDocuments, 
    redirectToAuthCodeFlow, 
    getAccessToken, 
    getUserProfile, 
    createThePlaylist,
    addTracksToPlaylist,
    assembleDocIds,
} from './business-logic/appRequest';
import EmptyModal from '../modals/modal-empty-col';
import AboutModal from '../modals/modal-about';

//Bear in mind the implementation using PKCE Authorization pattern for improved security.
// Other option is the implicit grant flow
const client_id = "9dc3cfe6f686431f878571165c601f37"

const ComponentManagerGrid:React.FC<GridProps> = (props: GridProps) => {
    const [buttonPress, setButtonPress] = useState<number>(0);
    const [emptyModal, setEmptyModal] = useState<boolean>(false);
    const [aboutModal, setAboutModal] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [displayName, setDisplayName] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<string | undefined>(undefined);

    const handleEmptyModalOpen = () => setEmptyModal(true);
    const handleEmptyModalClose = () => setEmptyModal(false);

    const handleAboutModalOpen = () => setAboutModal(true);
    const handleAboutModalClose = () => setAboutModal(false);

    //Avoid nesting too many async functions cuz I need to be able to read it lmao
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code')
        if (code) {
            getAccessToken(client_id, code)
            .then((res) => {
                setAccessToken(res);
                getUserProfile(res)
                .then(res => {
                    if (res?.data !== null) {
                        setDisplayName(res?.data.display_name);
                        setUserId(res?.data.id);
                    }
                })
                .catch(e => { console.log(e) })
            });
        }
    }, [])

    useEffect(() => {
        if (displayName !== undefined && userId !== undefined && accessToken !== undefined) {
            createThePlaylist(accessToken, userId, displayName)
            .then((res) => {
                if (res?.data !== undefined) {
                    const playlistId = res.data.id;
                    console.log(`Access token: ${accessToken}`)
                    console.log(`Playlist id: ${playlistId}`);
                    assembleDocIds()
                    .then(documentIds => {
                        documentIds.forEach(item => {
                            addTracksToPlaylist(accessToken, playlistId, item)
                            .then(response => {
                                console.log(response);
                            })
                            .catch(e => {
                                console.log(e);
                            });
                        });
                    });
                    //open another modal that resets the web page
                }
            }).catch(e => {
                console.log(e);
            })
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