import theme from "../../theme/theme"

export const cardResultsGridStyles = {
    width: '64px',
    height: '64px',
    ':hover': {
        cursor: 'pointer',
    }
}

export const paperStyles = {
    marginTop: '5px',
    width: '300px',
}

export const clickedPaperStyles = {
    marginTop: '5px',
    width: '300px',
    backgroundColor: '#d1d1d1'
}

export const redirectUrlBox = {
    paddingLeft: '2px',
    ':hover': {
        cursor: 'pointer',
    }
}

export const typographyStyles = {
    marginTop: '18px',
    width: '190px',
    fontSize: '14px',
}

export const parentResultsGridStyles = {
    width: '320px',
    height: '53vh',
    marginTop: '5px',
    overflowY: 'scroll',
}

export const headerStyling = {
    fontSize: 'clamp(1rem, 10vw, 2rem)',
    color: theme.palette.secondary.dark,
}

export const buttonStyles = {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.main,
    width: '90px',
    height: '60px',
    marginTop: '2vh',
    '&.Mui-disabled': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.light,
    }
}