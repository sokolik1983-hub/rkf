import { phoneMask } from './config';

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex = new RegExp(/[+][7]{1}[(]\d{3}[)]\d{3}[-]\d{2}[-]\d{2}/);
const numbersOnlyRegex = new RegExp(/^\d+$/);
const aliasRegex = new RegExp(/^\w+$/);
const passwordRegexp = new RegExp(/^(?=.*[A-ZА-ЯЁ])(?=.*[0-9])[\w\S].{6,}/);
const urlRegexp = new RegExp(/^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/);
const requiredMessage = 'Обязательное поле';
const noUnderscore = (value) => value.replaceAll('_', '');

export const requiredValidator = (value) => value ? "" : requiredMessage;
export const urlValidator = (value) => !value ? "" : urlRegexp.test(value) ? "" : "Введите корректную ссылку";
export const numbersOnlyValidator = (value) => !value ? "" : numbersOnlyRegex.test(value) ? "" : "Только цифры";
export const emailRequiredValidator = value => !value ?
    requiredMessage :
    emailRegex.test(value) ? "" : "Неверный формат E-mail";
export const emailValidator = value => value ? emailRegex.test(value) ? "" : "Неверный формат E-mail" : "";
export const postcodeValidator = (value) => !value
    ? ""
    : (noUnderscore(value).length < 6 || noUnderscore(value).length > 7)
        ? "Кол-во цифр: 6-7"
        : "";
export const phoneRequiredValidator = (value) => !value ? requiredMessage : phoneRegex.test(value) ? "" : "Формат: +7(999)999-99-99";
export const phoneValidator = (value) => value && value !== phoneMask ? phoneRegex.test(value) ? "" : "Формат: +7(999)999-99-99" : "";
export const aliasValidator = value => !value ?
    requiredMessage :
    aliasRegex.test(value) ? "" : "Допускаются цифры, латинские буквы и нижнее подчеркивание";
export const codeValidator = value => !value ?
    requiredMessage :
    value.length !== 5 ? "Неверный код" :
        numbersOnlyRegex.test(value) ? "" : "Неверный код";
export const passwordValidator = value => !value ?
    requiredMessage :
    passwordRegexp.test(value) ? "" : "Пароль должен содержать не менее 6 символов, не менее 1 заглавной буквы и не менее 1 цифры";
export const lengthRequiredValidator = (value, maxLength) => !value ?
    requiredMessage :
    value.length > maxLength ? `Макс. кол-во символов: ${maxLength}` : '';

export const lengthValidator = (value, maxLength) => value && value.length > maxLength ? 
`Макс. кол-во символов: ${maxLength}` : '';

export const nameValidator = (value) => !value ?
    "Full Name is required" :
    value.length < 7 ? "Full Name should be at least 7 characters long." : "";
export const userNameValidator = (value) => !value ?
    "User Name is required" :
    value.length < 5 ? "User name should be at least 3 characters long." : "";