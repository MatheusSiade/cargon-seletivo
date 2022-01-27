import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {createTheme, ThemeProvider} from "@mui/material";
import TopAppBar from "../src/components/appbar";
import {AuthProvider} from "../src/providers/authContext";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1b4d75',
      dark: '#0f2b42',
      light: '#2d7fc2',
    },

    divider: '#2d7fc2',
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#2d7fc2',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f2b42',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 12,
        },
      },
    },
  },
});

function MyApp({Component, pageProps}: AppProps) {
  return <ThemeProvider theme={theme}>
    <AuthProvider>
      <TopAppBar/>
      <Component {...pageProps}/>
    </AuthProvider>
  </ThemeProvider>
}

export default MyApp
