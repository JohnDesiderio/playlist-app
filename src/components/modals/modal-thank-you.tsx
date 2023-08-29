import React from 'react';
import { Grid, GridProps, Typography, Button } from '@mui/material';
import { thankYouModalStyles, typographyStyles, yourWelcomeButtonStyles } from './modal-styles';
import { IModal } from './IModalTypes';

type TYModalProps = GridProps & IModal;

const ThankYouModal:React.FC<TYModalProps> = (props: TYModalProps) => {
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
                sx={thankYouModalStyles}
            >
                <Grid item>
                    <Typography sx={typographyStyles}>
                        Thank you for adding music to the global playlist 🥳🙈🤩
                        <br/>
                        So when are you gonna steal all the tracks? 😳🙊👀
                    </Typography>
                </Grid>
                <Button
                    onClick={props.exitFunction}
                    sx={yourWelcomeButtonStyles}
                >
                    Exit
                </Button>
            </Grid>
        </Grid>
    )
}

export default ThankYouModal;