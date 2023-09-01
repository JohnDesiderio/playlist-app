import theme from "../theme/theme";

export const parentResultsGridStyles = {
    width: '300px',
    height: '40vh',
    marginTop: '2vh',
    overflowY: 'scroll',
}

export const cardResultsGridStyles = {
    width: '64px',
    height: '64px',
    ':hover': {
        cursor: 'pointer',
    }
}

export const sendResultsStyles = {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.main,
    width: '90px',
    height: '60px',
    margin: '1vw',
    '&.Mui-disabled': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.light,
    }
}

export const paperStyles = {
    marginTop: '5px',
    width: '300px',

}

export const clickedPaperStyles = {
    marginTop: '5px',
    width: '300px',
    backgroundColor: '#d1d1d1',

}

export const typographyStyles = {
    width: '190px',
    fontSize: '14px'
}

export const checkboxBoxStyles = {
    width: '30px',
    paddingTop: '10px',
}

export const checkboxStyles = {
    '&.Mui-checked': {
        color: theme.palette.secondary.dark,
    }
}

export const redirectUrlBox = {
    paddingLeft: '2px',
    ':hover': {
        cursor: 'pointer',
    }
}