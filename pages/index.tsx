import type {NextPage} from 'next'
import Head from 'next/head'
import Index from "../src/components/contacts";
import {css} from "@emotion/react";
import {useTheme} from "@mui/material";
import MainLayout from "../src/components/mainLayout";
import {checkIfAuthenticated} from "../src/helpers";
import { useAuthContext } from '../src/providers/authContext';

export const getServerSideProps = checkIfAuthenticated;

const Home: NextPage = () => {
  const theme = useTheme();
  const userAuth = useAuthContext();

  return (
    <div css={css`margin-top: ${theme.mixins.toolbar.minHeight}px`}>
      <Head>
        <title>Contatos</title>
        <meta name="description" content="Lista de contatos para processo seletivo da CargOn"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

        <MainLayout>
          <Index/>
        </MainLayout>
    </div>
  )
}

export default Home
