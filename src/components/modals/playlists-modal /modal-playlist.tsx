import React, { useEffect, useState } from 'react'; 
import { Grid, GridProps, Typography, Button } from '@mui/material';
import { gridModalStyles } from '../modal-styles';
import { IModal } from '../IModalTypes';
import { gatherPlaylists } from './business-logic/appRequest';
import { IPlaylistModal, IPlaylistCard } from './business-logic/IPlaylistTypes';
import PlaylistCard from './playlist-card';
import { parentResultsGridStyles, headerStyling, buttonStyles } from './playlist-card-styles'; 
import { placeTracksInPlaylist } from './business-logic/appRequest';

type PlaylistsModal = GridProps & IModal & IPlaylistModal;

// Use this to control state variable, should reset on exiting modal...
const playlists = new Set<string>();

const PlaylistsModal:React.FC<PlaylistsModal> = (props: PlaylistsModal) => {
    const [playlistData, setPlaylistData] = useState<Array<IPlaylistCard>>([]);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
    const [selectedPlaylists, setSelectedPlaylists] = useState<number>(playlists.size);
    const [submitButtonClicked, setSubmitButtonClicked] = useState<boolean>(false);

    const handlePlaylistsUpdate = (
        playlistId: string,    
    ) => {

        if (playlists.has(playlistId)) {
            playlists.delete(playlistId)
        } else {
            playlists.add(playlistId);
        }   

        setSelectedPlaylists(playlists.size);
    }

    useEffect(() => {
        if (selectedPlaylists === 0) {
            setDisableSubmit(true);
        } else {
            setDisableSubmit(false);
        }
    }, [selectedPlaylists])

    useEffect(() => {
        if (props.access_token !== undefined && props.user_id !== undefined) {
            gatherPlaylists(props.access_token, props.user_id)
            .then((response) => {
                const res = new Array<IPlaylistCard>();

                response?.data.items.forEach((item) => {
                    const dataPoint: IPlaylistCard = {
                        image: item.images.at(0)?.url,
                        name: item.name,
                        id: item.id,
                        handleCallback: handlePlaylistsUpdate,
                    }
                    res.push(dataPoint);
                });
                setPlaylistData(res);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [])

    useEffect(() => {
        if (submitButtonClicked) {
            if (props.access_token != undefined) {
                placeTracksInPlaylist(Array.from(playlists), props.access_token, props.loading_modal);
            }
            playlists.clear();
            setSelectedPlaylists(0);
            props.exit_function();
            props.reset_modal();
        }
    }, [submitButtonClicked])

   
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
                    <Typography
                        sx={headerStyling}
                    >Choose a Playlist</Typography>
                </Grid>
                <Grid
                    container
                    justifyContent='center'
                    sx={parentResultsGridStyles}
                >
                    {playlistData.map(item => 
                        <PlaylistCard
                            {...item}
                        />
                    )}
                </Grid>
                {playlistData.length !== 0 // fit the stuff above in the conditional statement rendering
                    ? 
                        <Button
                                sx={buttonStyles}
                                disabled={disableSubmit}
                                onClick={() => {
                                    setSubmitButtonClicked(true);
                                }}
                            >
                                Submit
                        </Button>
                    : 
                        <div></div>
                }
            </Grid>
        </Grid>
    )
    
}

export default PlaylistsModal;