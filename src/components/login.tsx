import React from "react";
import {Divider, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import ButtonWithLoading from "./buttonWithLoading";
import {css} from "@emotion/react";
import {useRouter} from "next/router";
import {auth} from "../providers/firebase-client";
import {signInWithEmailAndPassword} from 'firebase/auth';

const Login: React.FC = () => {
  interface userType {
    email: string;
    password: string
  }

  interface userErrorsType {
    email: string;
    password: string
  }

  const init_userType = {
    email: "",
    password: ""
  }

  const [userForm, setUserForm] = React.useState<userType>(init_userType)
  const [errors, setErrors] = React.useState<userErrorsType>(init_userType)
  const [passwordVisibility, setPasswordVisibility] = React.useState(false)
  const [loadingButton, setLoadingButton] = React.useState(false)
  const router = useRouter();

  const setFieldsAndErrors = (key: string, value: string) => {
    setUserForm({
      ...userForm,
      [key]: value
    })
    setErrors(init_userType)
  }
  const classes = {

    button: css`
      margin: 0 auto;
      display: flex;
    `,
  };

  const handleLogin = async () => {
    //Faz o login no firebase auth e redireciona para a página principal. Em caso de falha no login indica que email e senha podem estar errados
    if (!userForm.email || !userForm.password) setErrors({
      email: "Verifique seu email",
      password: "Verifique sua senha"
    });
    else {
      try {
        setLoadingButton(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userForm.email,
          userForm.password,
        );
        let redirectToUrl = '/';
        await router.push(redirectToUrl);
      } catch (e: any) {
        setLoadingButton(false);
        setErrors({
          email: "Verifique seu email",
          password: "Verifique sua senha"
        })
      }
    }
  };
  return <div css={css`display: flex;
    justify-content: center;
    align-items: center;
    height: 100%`}>
    <div css={css`max-width: 400px;`}>
      <Typography css={css`margin-bottom: 8px`} variant={"h4"} align={"center"}>Bem-vindo</Typography>
      <Divider css={css`margin-bottom: 8px`}/>
      <Typography css={css`margin-bottom: 64px`} align={"center"} >Para começar digite um usuário e uma senha</Typography>

      <TextField
        fullWidth
        required
        error={errors.email !== "" && !userForm.email}
        label={'E-mail'}
        value={userForm.email}
        helperText={errors.email}

        onChange={e => setFieldsAndErrors("email", e.target.value)}
        onKeyUp={event => {
          event.key === 'Enter' && handleLogin();
        }}
      />
      <TextField
        fullWidth
        required
        error={errors.password !== "" && !!userForm.password}
        type={passwordVisibility ? 'text' : 'password'}
        helperText={errors.password}
        label={'Senha'}
        value={userForm.password}
        onChange={e => setFieldsAndErrors("password", e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setPasswordVisibility(!passwordVisibility)}
                size="large"
              >
                {!passwordVisibility ? <VisibilityOff/> : <Visibility/>}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyUp={event => {
          event.key === 'Enter' && handleLogin();
        }}
      />
      <ButtonWithLoading
        loading={loadingButton}
        outerCss={classes.button}
        onClick={handleLogin}
      >
        Entrar
      </ButtonWithLoading>
    </div>
  </div>
}
export default Login;