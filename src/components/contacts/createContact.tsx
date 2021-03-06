import {Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme} from "@mui/material";
import ContactForm from "./form";
import React, {useState} from "react";
import {ContactErrorsType, ContactType} from "./types";
import {init_Contact, init_ContactErrors} from "./helpers";
import axios from "axios";
import ButtonWithLoading from "../buttonWithLoading";

interface CreateContactProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>

  addContact(contact: ContactType): void
}

const CreateContact: React.FC<CreateContactProps> = ({open, setOpen, addContact}) => {
  //Abre um modal com o formulário de criação de contato
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); //Determina se o viewport é menor que 600px (mobile)

  const [contactData, setContact] = useState<ContactType>(init_Contact); //Dados do contato a ser criado
  const [loading, setLoading] = useState(false) //Variável de controle do botão com indicador de espera
  const [contactErrors, setContactErrors] = React.useState<ContactErrorsType>(init_ContactErrors);//Indicador de erros no formulário

  const clearForm = () => {
    setOpen(false)
    setLoading(false)
    setContact(init_Contact)
  }

  const submitForm = async () => {/*Requisição de envio dos dados fornecidos. Caso os campos erro ou email
  estejam vazios determina mensagem de erro pra cada um deles.*/
    setLoading(true)
    if (contactData.name.length > 0 && contactData.email.length > 0 && contactErrors.name === "" && contactErrors.email === "") {
      try {
        const response = await axios.post(`https://gorest.co.in/public/v1/users/`, {
          name: contactData.name,
          email: contactData.email,
          status: contactData.status,
          gender: contactData.gender
        }, {
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
          setLoading(false)
        }
      } catch (e) {
        setContact(init_Contact)
        setLoading(false)
        alert("Ocorreu um erro na requisição.")
      }
    } else {
      setLoading(false)
      setContactErrors({
        ...contactErrors,
        name: contactData.name.length === 0 ? "Por favor preencha um nome" : contactErrors.name,
        email: contactData.email.length === 0 ? "Por favor preencha um email" : contactErrors.email
      })
    }
  }

  return <Dialog
    fullScreen={smDown}
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="create-contact"
  >
    <DialogTitle id="create-contact">
      {"Adicione um novo contato"}
    </DialogTitle>
    <DialogContent>
      <ContactForm contact={contactData} setContact={setContact} errors={contactErrors} setErrors={setContactErrors}/>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={clearForm}>
        Cancelar
      </Button>
      <ButtonWithLoading loading={loading} onClick={submitForm} autoFocus>
        Enviar
      </ButtonWithLoading>
    </DialogActions>
  </Dialog>
}
export default CreateContact