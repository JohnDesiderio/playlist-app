import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, Paper, PaperProps, Box } from '@mui/material';
import { ITrack } from './IResultsTypes';
import { cardResultsGridStyles, typographyStyles, paperStyles, clickedPaperStyles } from './results-grid-styles';

type ResultGridItemProps = PaperProps & ITrack;

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
            onClick={()=> {setStyleManager(!styleManager)}}
        >
            <Paper 
                sx={paperStyling}
                {...props}
                
            >
                <Grid container direction='row'>
                    <Card sx={cardResultsGridStyles}>
                        <img
                            src={props.image}
                        >
                        </img>
                    </Card>
                    <Box>
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
                    </Box>
                </Grid>
            </Paper>
        </Grid>
    )   
}

export default ResultGridItem;