import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, Paper, PaperProps, Box, Checkbox } from '@mui/material';
import { IResultGridItem, ITrack } from './IResultsTypes';
import { cardResultsGridStyles, typographyStyles, paperStyles, clickedPaperStyles, checkboxBoxStyles, checkboxStyles } from './results-grid-styles';

type ResultGridItemProps = PaperProps & IResultGridItem;

const ResultGridItem:React.FC<ResultGridItemProps> = (props: ResultGridItemProps) => {
    const [paperStyling, setPaperStyling] = useState(paperStyles);
    const [styleManager, setStyleManager] = useState<boolean>(true);

    useEffect(() => {
        if (styleManager) {
            setPaperStyling(paperStyles);
        } else {
            setPaperStyling(clickedPaperStyles);
        }
    }, [styleManager])

    return (
        <Grid 
            alignItems='center'
            justifyContent='center'
            container
        >
            <Paper 
                sx={paperStyling}
                {...props}
                
            >
                <Grid container direction='row'>
                    <Grid 
                        onClick={() => {
                            console.log();
                        }}                
                        item
                    >
                        <Card sx={cardResultsGridStyles}>
                            <img
                                src={props.image}
                            >
                            </img>
                        </Card>
                        <Box
                            sx={{
                                paddingLeft: '2px'
                            }}  
                        >
                            <Typography 
                                sx={typographyStyles}
                                noWrap
                            >
                                {props.song}
                            </Typography>
                            <Typography 
                                sx={typographyStyles}
                                noWrap
                            >
                                {props.artist}
                            </Typography>
                            <Typography 
                                sx={typographyStyles}
                                noWrap
                            >
                                {props.album}
                             </Typography>
                        </Box>
                    </Grid>
                    <Box
                        sx={checkboxBoxStyles}
                    >
                        <Checkbox
                            sx={checkboxStyles}
                            onClick={() => {
                                setStyleManager(!styleManager);
                                const item: ITrack = {
                                    song: props.song,
                                    album: props.album,
                                    artist: props.artist,
                                    uri: props.uri,
                                    id: props.id,
                                }
                                props.updateMap(item);
                            }}
                        />
                      </Box>
                </Grid>
            </Paper>
        </Grid>
    )   
}

export default ResultGridItem;