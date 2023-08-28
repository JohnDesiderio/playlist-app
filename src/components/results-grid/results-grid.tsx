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
    const [submitClicked, setSubmitClicked] = useState<boolean>(false);

    useEffect(() => {
        if (itemsSize === 0) {
            setDisableSubmit(true);
        } else {
            setDisableSubmit(false);
        }
    }, [itemsSize])

    useEffect(() => {
        addSelectedSongs(mappedItems);
        mappedItems.clear();
        setItemsSize(0);
        props.resetResponse();
    }, [submitClicked])


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
                                    onClick={() => {
                                        if (mappedItems.has(item.id)) {
                                            mappedItems.delete(item.id);
                                        } else {
                                            const temp: ITrack = {
                                                song: item.name,
                                                album: item.album.name,
                                                id: item.id,
                                                artist: item.album.artists.at(0)?.name,
                                            }
                                            mappedItems.set(item.id, temp);
                                        }
                                        setItemsSize(mappedItems.size);
                                    }}
                                    song={item.name}
                                    album={item.album.name}
                                    id={item.id}
                                    artist={item.album.artists.at(0)?.name}
                                    image={item.album.images.at(2)?.url}
                                />
                            </>
                        )}
                    </Grid>
                </Grid>
                <Button 
                    sx={sendResultsStyles}
                    disabled={disableSubmit}
                    onClick={() => {
                        setSubmitClicked(!submitClicked);
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