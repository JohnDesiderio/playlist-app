import React from 'react';
import { Grid, GridProps, Typography, Button } from '@mui/material';
import { gridModalStyles, typographyStyles, exitButtonStyles } from './modal-styles';
import { IModal } from './IModalTypes';

type EmptyModalProps = GridProps & IModal;

const EmptyModal:React.FC<EmptyModalProps> = (props: EmptyModalProps) => {
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
                    onClick={props.exit_function}
                    sx={exitButtonStyles}
                >
                    Exit
                </Button>
            </Grid>
        </Grid>
    )
}

export default EmptyModal;