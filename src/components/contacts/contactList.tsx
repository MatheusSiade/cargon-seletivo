import React, {useEffect, useState} from "react";
import axios from "axios";
import {ContactType} from "./types";
import {
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material";
import {Add, Person} from "@mui/icons-material";
import {css} from "@emotion/react";
import Contact from "./contact";

import CreateContact from "./createContact";

const ContactList: React.FC = () => {
  const theme = useTheme();

  const [contacts, setContacts] = useState<ContactType[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<ContactType>()

  const classes = {
    mainDiv: css`display: flex;
      width: 100%;
      max-height: 100%;`,

    list: css`height: inherit;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }`,

    helperText: css`display: flex;
      justify-content: center;
      align-items: center;
      height: inherit;
      width: 100%`,
    fab: css`position: fixed;
      bottom: 32px;
      right: 56px`,
  }

  const getContacts = async () => {
    setLoading(true)
    const response = await axios.get("https://gorest.co.in/public/v1/users?page=1");
    console.log(response)
    if (response.status === 200) {
      setLoading(false)
      setContacts(response.data.data as ContactType[])
    }

  }
  useEffect(() => {
    getContacts()
  }, [])


  const addContact = (contact: ContactType) =>{
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

  const updateContact = (contact: ContactType) => {
    const index = contacts.findIndex(c => c.id === contact.id)
    if (contacts.length > index && index !== -1) {
      setContacts([...contacts.slice(0, index), contact, ...contacts.slice(index + 1,)])
      setSelectedContact(contact)
    }
  }

  return <div css={classes.mainDiv}>
    <div css={classes.list}>
      <List css={css`height: 100%; padding-right: 8px `}>
        {contacts.map((contact) => {
          return <ListItem key={contact.id} selected={contact.id === selectedContact?.id} disablePadding>
            <ListItemButton onClick={() => setSelectedContact(contact)}>
              <ListItemIcon>
                <Person/>
              </ListItemIcon>
              <ListItemText primary={contact.name}/></ListItemButton>
          </ListItem>
        })}
      </List></div>
    {selectedContact ? <Contact contact={selectedContact}
                                updateContact={updateContact}
                                deleteContact={() => selectedContact?.id ? deleteContact(selectedContact?.id) : null}/> :
      <div css={classes.helperText}>
        <Typography>Selecione um contato para ver mais detalhes</Typography>
      </div>}
    <CreateContact open={open} setOpen={setOpen} addContact={addContact}/>
    <Fab color="primary" css={classes.fab} onClick={() => setOpen(true)}>
      <Add/>
    </Fab>
  </div>
}
export default ContactList
