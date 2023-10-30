import React, { useEffect, useState } from 'react';
import { Grid, GridProps, Typography, Button, Modal } from '@mui/material';
import { gridModalStyles, typographyStyles, choiceModalStyles } from '../modal-styles';
import { IChoiceModalProps } from './IChoiceModalProps';
import PlaylistsModal from '../playlists-modal /modal-playlist';
import { buildThePlaylist } from '../../component-manager/business-logic/appRequest';

type ChoiceModalProps = GridProps & IChoiceModalProps;

const ChoiceModal:React.FC<ChoiceModalProps> = (props: ChoiceModalProps) => {
    const [choice, setChoice] = useState<number>(0);
    const [openPlaylistModal, setOpenPlaylistModal] = useState<boolean>(false)

    const handlePlaylistModal = () => setOpenPlaylistModal(false);

    useEffect(() => {

        if (props.access_token != undefined && props.user_id != undefined && props.display_name != undefined) {
            if (choice === 1) {
                props.exit_function(true);
                buildThePlaylist(
                    props.access_token, 
                    props.user_id, 
                    props.display_name,
                    props.handle_reset_modal,
                    props.loading_modal    
                );
                props.handle_reset_modal();
            } else if (choice === 2) {
                props.exit_function(true);
                setOpenPlaylistModal(true);
            } 

        } 

    }, [choice])

    return (
        <Grid 
            container
            justifyContent='center'
            alignItems='center'
            {...props}
        >
            <Grid
                container
                alignItems='center' 
                justifyContent='center'
                direction='column'
                sx={gridModalStyles}
            >
                <Grid item>
                    <Typography sx={typographyStyles}>
                        It would seem like you have a choice 🥶🤮☠
                        <br/>
                        You want a new playlist? 🙊🚰‼
                        <br/>
                        OR: Do you want to place the songs in an
                        <br/> existing playlist on your Spotify account?
                        <br/>
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => setChoice(1)}
                        sx={choiceModalStyles}
                    >
                        New Playlist!!
                    </Button>
                    <Button
                        onClick={() => setChoice(2)}
                        sx={choiceModalStyles}
                    >
                        I Want to Add to One!!
                    </Button>
                    <Modal open={openPlaylistModal}>
                        <PlaylistsModal
                            loading_modal={props.loading_modal}
                            exit_function={handlePlaylistModal}
                            access_token={props.access_token}
                            user_id={props.user_id}
                            reset_modal={props.handle_reset_modal}
                        />
                    </Modal>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ChoiceModal;