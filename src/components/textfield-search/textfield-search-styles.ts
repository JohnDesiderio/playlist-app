import theme from "../theme/theme";

export const searchButtonStyles = {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.main,
    width: '90px',
    height: '60px',
    margin: '1vw',
}

export const searchTextFieldStyles = {
    width: '200px',
    "& .MuiOutlinedInput-root.Mui-focused": {
        "& > fieldset": {
          borderColor: theme.palette.primary.dark,
        }
    },
}