import React from 'react';
import { Grid, GridProps, Typography, Button } from '@mui/material';
import { gridModalStyles, typographyStyles, exitButtonStyles } from './modal-styles';
import { IModal } from './IModalTypes';

type emptyModalProps = GridProps & IModal;

const EmptyModal:React.FC<emptyModalProps> = (props: emptyModalProps) => {
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
                        There are no songs in the global database right now 😕📉🍳
                        <br/>
                        I think you should go put the first song in there 🫣🦧🫦
                    </Typography>
                </Grid>
                <Button
                    onClick={props.exitFunction}
                    sx={exitButtonStyles}
                >
                    Exit
                </Button>
            </Grid>
        </Grid>
    )
}

export default EmptyModal;