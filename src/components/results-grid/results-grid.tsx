import React, { useEffect } from 'react';
import { Grid, GridProps, Button } from '@mui/material';
import { IRGProps } from './IResultsTypes';
import { parentResultsGridStyles, sendResultsStyles, paperStyles } from './results-grid-styles';
import ResultGridItem from './results-grid-item';

type ResultsGridProps = GridProps & IRGProps;

const ResultsGrid:React.FC<ResultsGridProps> = (props: ResultsGridProps) => {
    useEffect(() => {
        console.log(props.response)
    }, [props.response])
    
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
                                    sx={paperStyles}
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
                <Button sx={sendResultsStyles}>Submit</Button>
            </Grid>
        );
    } else {
        return <Grid item/>
    }
}

export default ResultsGrid;