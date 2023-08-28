import theme from "../theme/theme";

export const searchButtonStyles = {
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

export const searchTextFieldStyles = {
    width: '200px',
    "& .MuiOutlinedInput-root.Mui-focused": {
        "& > fieldset": {
          borderColor: theme.palette.secondary.main,
        }
    },
}