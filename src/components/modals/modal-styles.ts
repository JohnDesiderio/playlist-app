import theme from "../theme/theme";

export const gridModalStyles = {
    width: '80vw',
    height: '80vh',
    backgroundColor: theme.palette.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8vh',
    borderRadius: '16px',
}

export const typographyStyles = {
    fontSize: 'clamp(1rem, 5vw, 1rem)',
    margin: '5vw',
}

export const exitButtonStyles = {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.main,
    width: '90px',
    height: '60px',
    margin: '1vw',
}