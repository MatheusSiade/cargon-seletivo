import {Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme} from "@mui/material";
import ContactForm from "./form";
import React, {useState} from "react";
import {ContactType} from "./types";
import {init_Contact} from "./helpers";

interface CreateContactProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateContact: React.FC<CreateContactProps> = ({open, setOpen}) => {
  const theme = useTheme();
  const responsiveFullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [contactData, setContact] = useState<ContactType>(init_Contact);

  const clearForm = () => {
    setOpen(false)
    setContact(init_Contact)
  }
  const submitForm = () => {
    console.log(contactData)
    setOpen(false)
    setContact(init_Contact)
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