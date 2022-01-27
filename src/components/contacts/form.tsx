import React from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import {ContactErrorsType, ContactType, genderType, statusType} from "./types";
import {css} from "@emotion/react";
import {validateEmail} from "./helpers";

interface ContactFormProps {
  contact: ContactType;
  setContact: React.Dispatch<React.SetStateAction<ContactType>>;
  errors: ContactErrorsType;
  setErrors: React.Dispatch<React.SetStateAction<ContactErrorsType>>;

}

const ContactForm: React.FC<ContactFormProps> = ({contact, setContact, errors, setErrors}) => {

  const setFieldsAndErrors = (key: string, value: string) => {
    if (key === "email") {
      const valid = validateEmail(value);
      !valid ? setErrors({
        ...errors,
        [key]: "Digite um email válido"
      }): setErrors({
        ...errors,
        [key]: ""
      })
    }else if(key ==="name"){
      if(value.length === 0){
        setErrors({
          ...errors,
          [key]: "Digite um nome válido"
        })
      } else setErrors({
        ...errors,
        [key]: ""
      })
    }
    setContact({
      ...contact,
      [key]: value
    })

  }

  return <div css={css`padding-top: 8px`}>

    <TextField id="name" label="Nome" variant="outlined" value={contact.name} helperText={errors.name} error={errors.name!==""}
               onChange={(e) => setFieldsAndErrors("name", e.target.value)} fullWidth/>
    <TextField id="email" label="Email" variant="outlined" value={contact.email} helperText={errors.email} error={errors.email!==""}
               onChange={(e) => setFieldsAndErrors("email", e.target.value)} fullWidth/>
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