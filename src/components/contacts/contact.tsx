import {ContactType} from "./types";
import {Button, Divider, IconButton, Typography} from "@mui/material";
import React, {useEffect} from "react";
import ContactForm from "./form";
import {css} from "@emotion/react";
import {Delete, Edit} from "@mui/icons-material";
import axios from "axios";
import {token} from "../../constants";

interface ContactProps {
  contact: ContactType;
  deleteContact: any;

  updateContact(contact: ContactType): void;
}

const Contact: React.FC<ContactProps> = ({contact, deleteContact, updateContact}) => {
  const [edit, setEdit] = React.useState(true)
  const [editContact, setEditContact] = React.useState<ContactType>(contact);
  useEffect(() => {
    setEdit(false)
    setEditContact(contact)
  }, [contact])

  const submitEdit = async () => {
    const response = await axios.put(`https://gorest.co.in/public/v1/users/${contact.id}`, {
      name: editContact.name,
      email: editContact.email,
      status: editContact.status,
      gender: editContact.gender
    }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      updateContact(editContact)
      setEdit(false)
    }

  }
  const deleteC = async () => {
    const response = await axios.delete(`https://gorest.co.in/public/v1/users/${contact.id}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    if (response.status === 204) {
      deleteContact()
    }

  }
  const classes = {
    header: css`display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 500px`,

    email: css`display: flex;
      flex-direction: column;
      margin-bottom: 16px`,

    optionsDiv: css`display: flex;
      justify-content: space-between`,

    gender: css`display: flex;
      flex-direction: column;
      margin-bottom: 16px;`,

    status: css`display: flex;
      flex-direction: column;
      margin-bottom: 16px;
      align-items: end;`
  }
  return <div css={css`margin-top: 12px`}>
    <div css={classes.header}>
      <Typography variant={"h5"}>{contact.name}</Typography>
      <div>
        {!edit && <IconButton onClick={() => setEdit(true)}><Edit/></IconButton>}
        <IconButton onClick={deleteC}><Delete/></IconButton>
      </div>
    </div>
    <Divider/>
    {edit ? <React.Fragment>
      <ContactForm contact={editContact} setContact={setEditContact}/>
      <div css={classes.header}>
        <Button onClick={() => setEdit(false)}>Cancelar</Button>
        <Button onClick={submitEdit}>Enviar</Button>
      </div>
    </React.Fragment> : <React.Fragment>
      <div css={classes.email}>
        <Typography>{contact.email}</Typography>
        <Typography variant={"subtitle2"}> Email</Typography>
      </div>
      <div css={classes.optionsDiv}>
        <div css={classes.gender}>
          <Typography>{contact.gender}</Typography>
          <Typography variant={"subtitle2"}> Gênero</Typography>
        </div>
        <div css={classes.status}>
          <Typography>{contact.status}</Typography>
          <Typography variant={"subtitle2"}>Status</Typography>
        </div>
      </div>
    </React.Fragment>}

  </div>

}

export default Contact