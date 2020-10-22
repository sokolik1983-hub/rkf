const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const numbersOnlyRegex = new RegExp(/^\d+$/);
const aliasRegex = new RegExp(/^\w+$/);
const requiredMessage = 'Обязательное поле';

export const requiredValidator = (value) => value ? "" : requiredMessage;
export const numbersOnlyValidator = (value) => !value ? "" : numbersOnlyRegex.test(value) ? "" : "Только цифры";
export const emailValidator = (value) => !value ? requiredMessage : (emailRegex.test(value) ? "" : "Неверный формат");
export const aliasValidator = value => !value ?
    requiredMessage :
    aliasRegex.test(value) ? "" : "Допускаются цифры, латинские буквы и нижнее подчеркивание";


export const nameValidator = (value) => !value ?
    "Full Name is required" :
    value.length < 7 ? "Full Name should be at least 7 characters long." : "";
export const userNameValidator = (value) => !value ?
    "User Name is required" :
    value.length < 5 ? "User name should be at least 3 characters long." : "";
export const phoneValidator = (value) => !value ?
    "Phone number is required." :
    phoneRegex.test(value) ? "" : "Not a valid phone number.";


export const passwordValidator = (value) => value && value.length > 8 ? '' : 'Password must be at least 8 symbols.';