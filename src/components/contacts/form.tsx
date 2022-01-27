import React from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import {ContactType, genderType, statusType} from "./types";
import {css} from "@emotion/react";

interface ContactFormProps {
  contact: ContactType;
  setContact: React.Dispatch<React.SetStateAction<ContactType>>
}

const ContactForm: React.FC<ContactFormProps> = ({contact, setContact}) => {

  const setFieldsAndErrors = (key: string, value: string) => {
    setContact({
      ...contact,
      [key]: value
    })
  }

  return <div css={css`padding-top: 8px`}>

    <TextField id="name" label="Nome" variant="outlined" value={contact.name}
               onChange={(e) => setFieldsAndErrors("name", e.target.value)} fullWidth/>
    <TextField id="email" label="Email" variant="outlined" value={contact.email}
               onChange={(e) => setFieldsAndErrors("email", e.target.value)}fullWidth/>
    <div css={css`display: flex`}>
      <FormControl css={css`flex-grow: 1`}>
        <FormLabel id="gender">Gênero</FormLabel>
        <RadioGroup
          aria-labelledby="gender"
          defaultValue="male"
          name="Gênero"
          value={contact.gender}
          onChange={(e) => setContact({...contact, gender: e.target.value as genderType})}
        >
          <FormControlLabel value="male" control={<Radio/>} label="Masculino"/>
          <FormControlLabel value="female" control={<Radio/>} label="Feminino"/>
        </RadioGroup>
      </FormControl>
      <FormControl css={css`flex-grow: 1`}>
        <FormLabel id="status">Status</FormLabel>

        <RadioGroup
          aria-labelledby="status"
          defaultValue="active"
          name="Status"
          value={contact.status}
          onChange={(e) => setContact({...contact, status: e.target.value as statusType})}
        >
          <FormControlLabel value="inactive" control={<Radio/>} label="Inativo"/>
          <FormControlLabel value="active" control={<Radio/>} label="Ativo"/>
        </RadioGroup>
      </FormControl>
    </div>
  </div>
}
export default ContactForm