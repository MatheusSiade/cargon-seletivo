import type {NextPage} from 'next'
import Head from 'next/head'
import ContactList from "../src/components/contacts/contactList";
import {css} from "@emotion/react";
import {useTheme} from "@mui/material";

const Home: NextPage = () => {
  const theme = useTheme();
  return (
    <div css={css`margin-top: ${theme.mixins.toolbar.minHeight}px`}>
      <Head>
        <title>Contatos</title>
        <meta name="description" content="Lista de contatos para processo seletivo da CargOn"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <ContactList/>
      </main>
    </div>
  )
}

export default Home
