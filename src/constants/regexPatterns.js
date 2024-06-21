export const ID_REGEX = /^\b[12]\d{9}\b/;
export const LAST_N_REGEX = /^\p{L}{3,}$/u;
export const FIRST_N_REGEX = /^[\p{L} ,.'-]{3,}$/u;
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const PASS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const PHONE_REGEX =
  /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
