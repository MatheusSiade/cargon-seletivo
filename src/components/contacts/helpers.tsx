import {ContactErrorsType, ContactType} from "./types";

export const init_Contact: ContactType = {
  name: "",
  email: "",
  gender: "male",
  status: "inactive",
}
export const init_ContactErrors: ContactErrorsType = {
  name: "",
  email: ""
}
export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}