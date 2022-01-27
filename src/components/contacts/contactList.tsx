import React, {useEffect, useState} from "react";
import axios from "axios";
import {ContactType} from "./types";
import {
  CircularProgress,
  Fab, IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography, useMediaQuery,
  useTheme
} from "@mui/material";
import {Add, Close, Person} from "@mui/icons-material";
import {css} from "@emotion/react";
import Contact from "./contact";

import CreateContact from "./createContact";
import useInfiniteScroll from "react-infinite-scroll-hook";

const ContactList: React.FC = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [contacts, setContacts] = useState<ContactType[]>([])
  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<ContactType>()

  const classes = {
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
    if (hasNextPage) {
      setLoading(true)
      const response = await axios.get(`https://gorest.co.in/public/v1/users?page=${currentPage}`);
      console.log(response)
      if (response.status === 200) {
        setLoading(false)
        setHasNextPage(response.data.meta.pagination.pages > currentPage)
        setContacts([...contacts, ...response.data.data as ContactType[]])
        setCurrentPage(currentPage + 1)
      }
    }


  }
  useEffect(() => {
    getContacts()
  }, [])


  const addContact = (contact: ContactType) => {
    setContacts([contact, ...contacts]);
    setSelectedContact(contact)
  }

  const deleteContact = (id: number) => {
    const index = contacts.findIndex(contact => contact.id === id)
    if (contacts.length > index && index !== -1) {
      setContacts([...contacts.slice(0, index), ...contacts.slice(index + 1,)])
      setSelectedContact(undefined)
    }
  }

  const updateContact = (contact: ContactType | undefined) => {
    if (contact !== undefined) {
      const index = contacts.findIndex(c => c.id === contact.id)
      if (contacts.length > index && index !== -1) {
        setContacts([...contacts.slice(0, index), contact, ...contacts.slice(index + 1,)])
        setSelectedContact(contact)
      }
    } else setSelectedContact(undefined)
  }

  const [sentryRef] = useInfiniteScroll({
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
    </div> : !smDown && <div css={classes.helperText}>
        <Typography>Selecione um contato para ver mais detalhes</Typography>
    </div>}

    <CreateContact open={open} setOpen={setOpen} addContact={addContact}/>
    <Fab color="primary" css={classes.fab} onClick={() => setOpen(true)}>
      <Add/>
    </Fab>

  </div>
}
export default ContactList
