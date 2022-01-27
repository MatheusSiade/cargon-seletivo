import type {NextPage} from 'next'
import Head from 'next/head'
import {css} from "@emotion/react";
import {useTheme} from "@mui/material";
import MainLayout from "../src/components/mainLayout";
import Login from "../src/components/login";
import {checkIfNotAuthenticated} from "../src/helpers";

export const getServerSideProps = checkIfNotAuthenticated;

const LoginPage: NextPage = () => {
  const theme = useTheme();
  return (
    <div css={css`margin-top: ${theme.mixins.toolbar.minHeight}px`}>
      <Head>
        <title>Contatos</title>
        <meta name="description" content="Lista de contatos para processo seletivo da CargOn"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <MainLayout>
        <Login/>
      </MainLayout>
    </div>
  )
}

export default LoginPage
