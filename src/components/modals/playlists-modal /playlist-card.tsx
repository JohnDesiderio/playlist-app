import React, { useEffect, useState } from 'react';
import { Card, Paper, PaperProps, Typography, Box, Grid } from '@mui/material';
import { IPlaylistCard } from './business-logic/IPlaylistTypes';
import { cardResultsGridStyles, paperStyles, clickedPaperStyles, redirectUrlBox, typographyStyles } from './playlist-card-styles';

type PlaylistCardProps = PaperProps & IPlaylistCard;

const PlaylistCard:React.FC<PlaylistCardProps> = (props: PlaylistCardProps) => {
    const [styling, setStyling] = useState(paperStyles);
    const [styleManager, setStyleManager] = useState<boolean>(false);

    useEffect(() => {

        if (styleManager) {
            setStyling(clickedPaperStyles);
        } else {
            setStyling(paperStyles)
        }

    }, [styleManager])


    return (
        <Grid
            alignItems='center'
            justifyContent='center'
            container
        >
            <Paper
                data-testid='mock-playlist-card'
                sx={styling}
                {...props}
                onClick={() => {
                    setStyleManager(!styleManager);
                    props.handleCallback(props.id);
                }}
            >
                <Grid container direction='row'>
                    <Card
                        sx={cardResultsGridStyles}
                    >
                        <img
                            src={props.image}
                            height='64'
                            width='64'
                        >
                        </img>
                    </Card>
                    <Box
                        sx={redirectUrlBox}
                    >
                        <Typography
                            sx={typographyStyles}
                            noWrap
                        >
                            {props.name}
                        </Typography>
                    </Box>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default PlaylistCard;