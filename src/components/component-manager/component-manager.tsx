import React, { useState, useEffect } from 'react';
import { Grid, GridProps, Typography, Button, Modal } from '@mui/material';
import { headerTextStyles, buttonStyles, headerGridStyles } from './component-manager-styles';
import TextfieldSearchGrid from '../textfield-search/textfield-search-grid';
import { getAllDocuments } from './business-logic/appRequest';
import EmptyModal from '../modals/modal-empty-col';

const ComponentManagerGrid:React.FC<GridProps> = (props: GridProps) => {
    const [buttonPress, setButtonPress] = useState<number>(0);
    const [emptyModal, setEmptyModal] = useState<boolean>(false);

    const handleEmptyModalOpen = () => setEmptyModal(true);
    const handleEmptyModalClose = () => setEmptyModal(false);

    useEffect(() => {
        if (buttonPress !== 0) {
            getAllDocuments()
            .then(res => {
                if (res === 0) {
                    handleEmptyModalOpen();
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
        </Grid>
    )
}

export default ComponentManagerGrid;