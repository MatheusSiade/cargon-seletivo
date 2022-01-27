import {ContactErrorsType, ContactType} from "./types";
import {Button, Divider, IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import React, {useEffect} from "react";
import ContactForm from "./form";
import {css} from "@emotion/react";
import {ArrowBack, Delete, Edit} from "@mui/icons-material";
import axios from "axios";
import ButtonWithLoading from "../buttonWithLoading";
import {init_ContactErrors} from "./helpers";

interface ContactProps {
  contact: ContactType;
  deleteContact: any;

  updateContact(contact: ContactType | undefined): void;
}

const Contact: React.FC<ContactProps> = ({contact, deleteContact, updateContact}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down(700));

  const [edit, setEdit] = React.useState(true)
  const [editContact, setEditContact] = React.useState<ContactType>(contact);
  const [loading, setLoading] = React.useState(false);

  const [contactErrors, setContactErrors] = React.useState<ContactErrorsType>(init_ContactErrors);

  useEffect(() => {
    setEdit(false)
    setEditContact(contact)
  }, [contact])

  const submitEdit = async () => {
    setLoading(true)
    if (editContact.name.length > 0 && editContact.email.length > 0 && contactErrors.name === "" && contactErrors.email === "") {
      try {
        const response = await axios.put(`https://gorest.co.in/public/v1/users/${contact.id}`, {
          name: editContact.name,
          email: editContact.email,
          status: editContact.status,
          gender: editContact.gender
        }, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
          }
        });
        if (response.status === 200) {
          updateContact(editContact)
          setLoading(false);
          setEdit(false);
        }
      } catch (e) {
        alert("Houve um erro na requisição");
        setLoading(false);
        setEdit(false);
      }
    } else {
      setLoading(false)
      setContactErrors({
        ...contactErrors,
        name: editContact.name.length === 0 ? "Por favor preencha um nome" : contactErrors.name,
        email: editContact.email.length === 0 ? "Por favor preencha um email" : contactErrors.email
      })
    }
  }
  const deleteC = async () => {
    try {
      const response = await axios.delete(`https://gorest.co.in/public/v1/users/${contact.id}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
        }
      });
      if (response.status === 204) {
        deleteContact()
      }
    } catch (e) {
      alert("Ocorreu um erro na deleção, verifique se o item já não foi deletado.")
    }

  }
  const classes = {
    header: css`display: flex;
      justify-content: space-between;
      align-items: center;`,

    email: css`display: flex;
      flex-direction: column;
      margin-bottom: 16px`,

    optionsDiv: css`display: flex;
      flex-direction: ${smDown ? "column" : "row"};
      justify-content: space-between`,

    gender: css`display: flex;
      flex-direction: column;
      margin-bottom: 16px;`,

    status: css`display: flex;
      flex-direction: column;
      margin-bottom: 16px;
      align-items: ${smDown ? "start" : "end"};`,

    subtitle: css`text-transform: uppercase`
  }
  return <div css={css`margin-top: 12px;
    padding: ${smDown ? "0 32px" : "0 16px 0 0 "};
    width: ${smDown ? "100vw" : mdDown ? "400px" : "500px"};`}>
    <div css={classes.header}>
      {smDown && <IconButton onClick={() => updateContact(undefined)}><ArrowBack/></IconButton>}
      <Typography variant={"h5"}>{contact.name}</Typography>
      <div>
        {!edit && <IconButton onClick={() => setEdit(true)}><Edit/></IconButton>}
        <IconButton onClick={deleteC}><Delete/></IconButton>
      </div>
    </div>
    <Divider css={css`margin-bottom: 8px`}/>
    {edit ? <React.Fragment>
      <ContactForm contact={editContact} setContact={setEditContact} errors={contactErrors}
                   setErrors={setContactErrors}/>
      <div css={classes.header}>
        <Button onClick={() => setEdit(false)}>Cancelar</Button>
        <ButtonWithLoading loading={loading} onClick={submitEdit}>Enviar</ButtonWithLoading>
      </div>
    </React.Fragment> : <React.Fragment>
      <div css={classes.email}>
        <Typography>{contact.email}</Typography>
        <Typography variant={"subtitle2"} css={classes.subtitle}> Email</Typography>
      </div>
      <div css={classes.optionsDiv}>
        <div css={classes.gender}>
          <Typography>{contact.gender === "male" ? "Masculino" : "Feminino"}</Typography>
          <Typography variant={"subtitle2"} css={classes.subtitle}> Gênero</Typography>
        </div>
        <div css={classes.status}>
          <Typography>{contact.status === "active" ? "Ativo" : "Inativo"}</Typography>
          <Typography variant={"subtitle2"} css={classes.subtitle}>Status</Typography>
        </div>
      </div>
    </React.Fragment>}

  </div>

}

export default Contact