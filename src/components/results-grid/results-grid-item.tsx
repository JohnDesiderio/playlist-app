import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, Paper, PaperProps, Box, Checkbox } from '@mui/material';
import { IResultGridItem, ITrack } from './IResultsTypes';
import { cardResultsGridStyles, 
    typographyStyles, 
    paperStyles, 
    clickedPaperStyles, 
    checkboxBoxStyles, 
    checkboxStyles,
    redirectUrlBox
} from './results-grid-styles';

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

    const redirectToUrl = () => {
        document.location = props.redirect_url;
    }

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
                    <Card 
                        data-testid='result-grid-card'
                        onClick={redirectToUrl}
                        sx={cardResultsGridStyles}
                    >
                        <img
                            src={props.image}
                        >
                        </img>
                    </Card>
                    <Box
                        onClick={redirectToUrl}
                        sx={redirectUrlBox}  
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
                    <Box
                        sx={checkboxBoxStyles}
                    >
                        <Checkbox
                            data-testid='result-grid-checkbox'
                            sx={checkboxStyles}
                            onClick={() => {
                                setStyleManager(!styleManager);
                                const item: ITrack = {
                                    song: props.song,
                                    album: props.album,
                                    artist: props.artist,
                                    uri: props.uri,
                                    id: props.id,
                                    external_url: props.redirect_url,
                                    metrics: props.metrics,
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