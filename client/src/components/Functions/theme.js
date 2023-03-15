
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@material-ui/core/styles';


const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: "#6d6d6c",//purple[500],#6d6d6c
        }
    },
    secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
    },
},
);

const themeDesign = createTheme(
    {
        overrides: {
            MuiButton: {
                root: {
                    backgroundColor: theme.palette.primary.main
                },
                label: {
                    color: theme.palette.primary.contrastText
                }
            }
        }
    },
    theme
);
// export default function Palette() {
//     return (
//         <ThemeProvider theme={theme}>
//             <Button>Primary</Button>
//             <Button color="secondary">Secondary</Button>
//         </ThemeProvider>
//     );
// }

export default themeDesign;