import React, { useState, useEffect } from 'react';
import { Grid, GridProps, Button } from '@mui/material';
import { IRGProps, ITrack } from './IResultsTypes';
import { parentResultsGridStyles, sendResultsStyles } from './results-grid-styles';
import ResultGridItem from './results-grid-item';
import { addSelectedSongs } from './business-logic/appRequest';

type ResultsGridProps = GridProps & IRGProps;

const mappedItems = new Map<string, ITrack>();

const ResultsGrid:React.FC<ResultsGridProps> = (props: ResultsGridProps) => {
    const [itemsSize, setItemsSize] = useState<number>(mappedItems.size);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
    const [submitClicked, setSubmitClicked] = useState<number>(0);

    useEffect(() => {
        if (itemsSize === 0) {
            setDisableSubmit(true);
        } else {
            setDisableSubmit(false);
        }
    }, [itemsSize])

    useEffect(() => {
        if (submitClicked !== 0) {
            addSelectedSongs(mappedItems);
            mappedItems.clear();
            setItemsSize(0);
            props.openThankYou();
            props.resetResponse();
        }
    }, [submitClicked])


    const updateMappedItems = (item: ITrack) => {
        if (mappedItems.has(item.id)) {
            mappedItems.delete(item.id);
        } else {
            const temp: ITrack = {
                song: item.song,
                album: item.album,
                id: item.id,
                artist: item.artist,
                uri: item.uri,
            }
            mappedItems.set(item.id, temp);
        }
        setItemsSize(mappedItems.size);
    }

    if (props.response !== undefined) {
        return (
            <Grid container justifyContent='center' alignItems='center' direction='column'>
                <Grid
                    container
                    justifyContent='center'
                    sx={parentResultsGridStyles}
                >
                    <Grid {...props}>
                        {props.response.tracks.items.map(item =>
                            <>
                                <ResultGridItem
                                    updateMap={updateMappedItems}
                                    song={item.name}
                                    album={item.album.name}
                                    id={item.id}
                                    artist={item.album.artists.at(0)?.name}
                                    image={item.album.images.at(2)?.url}
                                    uri={item.uri}
                                    redirect_url={item.external_urls.spotify}
                                />
                            </>
                        )}
                    </Grid>
                </Grid>
                <Button 
                    sx={sendResultsStyles}
                    disabled={disableSubmit}
                    onClick={() => {
                        setSubmitClicked(submitClicked + 1);
                    }}
                >
                        Submit
                </Button>
            </Grid>
        );
    } else {
        return <Grid item/>
    }
}

export default ResultsGrid;