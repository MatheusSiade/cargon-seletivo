import React, {useEffect, useState} from "react";
import axios from "axios";
import {ContactType} from "./types";
import {
  CircularProgress,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography, useMediaQuery,
  useTheme
} from "@mui/material";
import {Add, Person} from "@mui/icons-material";
import {css} from "@emotion/react";
import Contact from "./contact";

import CreateContact from "./createContact";
import useInfiniteScroll from "react-infinite-scroll-hook";

const Index: React.FC = () => {
  /*Componente central para o funcionamento do aplicativo.
  * Faz a requisição dos contatos e os mostra. */
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [contacts, setContacts] = useState<ContactType[]>([])//Vetor usado para armazenar os contatos
  const [loading, setLoading] = useState(false) //Variável de controle de carregamento de dados
  const [hasNextPage, setHasNextPage] = useState(true); //Variável de controle de disponibilidade de dados a serem carregados
  const [currentPage, setCurrentPage] = useState(1); //Delimita a ultima página de usuários solicitada à api

  const [selectedContact, setSelectedContact] = useState<ContactType>() //O contato selecionado para ser mostrado no painel

  const [open, setOpen] = useState(false) // Controla o modal de criação de contatos

  const classes = { //Classes utilizadas para a estilização dos componentes
    mainDiv: css`display: flex;
      width: 100%;
      max-height: 100%;;
      justify-content: center;`,

    list: css`height: inherit;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }`,

    listDiv: css`height: 100%;
      padding-right: 8px `,

    helperText: css`display: flex;
      justify-content: center;
      align-items: center;
      height: inherit;
      width: 100%`,

    fab: css`position: fixed;
      bottom: 32px;
      right: ${smDown ? 32 : 56}px`,

    circularProgress: css`
      display: flex;
      margin: 16px auto;`,

    closeButtonDiv: css`height: 56px;
      display: flex;
      justify-content: flex-end`,
  }

  const getContacts = async () => {
    //Enquanto houverem páginas a serem carregadas solicita os contatos à API.
    if (hasNextPage) {
      setLoading(true)
      try {
        const response = await axios.get(`https://gorest.co.in/public/v1/users?page=${currentPage}`);
        if (response.status === 200) {
          setLoading(false)
          setHasNextPage(response.data.meta.pagination.pages > currentPage)
          setContacts([...contacts, ...response.data.data as ContactType[]])
          setCurrentPage(currentPage + 1)
        }
      } catch (e){
        alert("Falha ao carregar os dados")
        setLoading(false)
      }

    }


  }
  useEffect(() => { //No carregamento inicial da página faz a primeira requisição de dados
    getContacts()
  }, [])


  const addContact = (contact: ContactType) => { //Adiciona um novo contato ao vetor
    setContacts([contact, ...contacts]);
    setSelectedContact(contact)
  }

  const deleteContact = (id: number) => { //Deleta um contato do vetor pelo id e atualiza o estado
    const index = contacts.findIndex(contact => contact.id === id)
    if (contacts.length > index && index !== -1) {
      setContacts([...contacts.slice(0, index), ...contacts.slice(index + 1,)])
      setSelectedContact(undefined)
    }
  }

  const updateContact = (contact: ContactType | undefined) => { //Atualiza um dado do vetor. Caso seja chamada sem um contato remove o contato selecionado
    if (contact !== undefined) {
      const index = contacts.findIndex(c => c.id === contact.id)
      if (contacts.length > index && index !== -1) {
        setContacts([...contacts.slice(0, index), contact, ...contacts.slice(index + 1,)])
        setSelectedContact(contact)
      }
    } else setSelectedContact(undefined)
  }

  const [sentryRef] = useInfiniteScroll({ /*Hook de carregamento infinito.
  A sentry é usada para monitorar a proximidade do viewport ao fim da lista, possibilitando carregamento preemptivo*/
    loading,
    hasNextPage,
    onLoadMore: getContacts,
    rootMargin: '0px 0px 100px 0px',
  });

  return <div css={classes.mainDiv}>
    <div css={classes.list}>
      {!(smDown && selectedContact !== undefined) && <List css={classes.listDiv}>
        {contacts.map((contact) => {
          return <ListItem key={contact.id} selected={contact.id === selectedContact?.id} disablePadding>
            <ListItemButton onClick={() => setSelectedContact(contact)}>
              <ListItemIcon>
                <Person/>
              </ListItemIcon>
              <ListItemText primary={contact.name}/></ListItemButton>
          </ListItem>
        })}
        {(loading || hasNextPage) && (
          <ListItem ref={sentryRef}>
            <CircularProgress size={20} css={classes.circularProgress}/>
          </ListItem>
        )}
      </List>}</div>

    {selectedContact ? <div css={css`display: block`}>

      <Contact contact={selectedContact}
               updateContact={updateContact}
               deleteContact={() => selectedContact?.id ? deleteContact(selectedContact?.id) : null}/>
    </div> : !smDown && contacts.length!==0  && <div css={classes.helperText}>
        <Typography>Selecione um contato para ver mais detalhes</Typography>
    </div>}

    <CreateContact open={open} setOpen={setOpen} addContact={addContact}/>
    <Fab color="primary" css={classes.fab} onClick={() => setOpen(true)}>
      <Add/>
    </Fab>

  </div>
}
export default Index
