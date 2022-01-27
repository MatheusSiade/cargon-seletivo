import {Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme} from "@mui/material";
import ContactForm from "./form";
import React, {useState} from "react";
import {ContactType} from "./types";
import {init_Contact} from "./helpers";
import axios from "axios";
import {token} from "../../constants";

interface CreateContactProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>

  addContact(contact: ContactType): void
}

const CreateContact: React.FC<CreateContactProps> = ({open, setOpen, addContact}) => {
  const theme = useTheme();
  const responsiveFullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [contactData, setContact] = useState<ContactType>(init_Contact);

  const clearForm = () => {
    setOpen(false)
    setContact(init_Contact)
  }
  const submitForm = async () => {
    const response = await axios.post(`https://gorest.co.in/public/v1/users/`, contactData, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      }
    });
    if (response.status === 201) {
      addContact(response.data.data as ContactType)
      setOpen(false)
      setContact(init_Contact)
    }
  }

  return <Dialog
    fullScreen={responsiveFullScreen}
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="create-contact"
  >
    <DialogTitle id="create-contact">
      {"Adicione um novo contato"}
    </DialogTitle>
    <DialogContent>
      <ContactForm contact={contactData} setContact={setContact}/>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={clearForm}>
        Cancelar
      </Button>
      <Button onClick={submitForm} autoFocus>
        Enviar
      </Button>
    </DialogActions>
  </Dialog>
}
export default CreateContact