import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {signOut} from "firebase/auth";
import {useRouter} from "next/router";
import {useAuthContext} from "../providers/authContext";
import {auth} from "../providers/firebase-client";

export default function TopAppBar() {
  const userAuth = useAuthContext();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await router.push('/login');
    } catch (e) {
      console.log("Logout falhou")
    }
  };
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="fixed">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Contatos
          </Typography>
          {userAuth?.isLoggedIn ? (
            <Button color="inherit" onClick={handleSignOut}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => router.push('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}