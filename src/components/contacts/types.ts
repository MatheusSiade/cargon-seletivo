export type genderType = "male" | "female";
export type statusType = "active" | "inactive";

export interface ContactType {
  name: string;
  email: string;
  gender: genderType;
  status: statusType;
  id?: number;
}