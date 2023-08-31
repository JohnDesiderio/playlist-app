import React from 'react';
import { Grid, GridProps, Typography, Button } from '@mui/material';
import { gridModalStyles, typographyStyles, exitButtonStyles } from './modal-styles';
import { IModal } from './IModalTypes';

type AboutModalProps = GridProps & IModal;

const AboutModal:React.FC<AboutModalProps> = (props: AboutModalProps) => {
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
                        A global database to manage song recommendations! 🌎🌏🌍
                        <br/>
                        There are two functions to the app: give or take. 🍞🍷🫁
                        <br/>
                        - Give: Submit a song and put it in the global database! 🦕⚡️🌪️
                        <br/>
                        - Take: Download the tracks submitted in the global
                    <br/>into a playlist that belongs to you and only you 💋🇬🇮🆙
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        onClick={props.exitFunction}
                        sx={exitButtonStyles}
                    >
                        Exit
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AboutModal;