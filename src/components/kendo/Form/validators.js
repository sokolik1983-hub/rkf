const phoneMask = '+7(___)___-__-__';
const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex = new RegExp(/[+][7]{1}[(]\d{3}[)]\d{3}[-]\d{2}[-]\d{2}/);
const numbersOnlyRegex = new RegExp(/^\d+$/);
const aliasRegex = new RegExp(/^\w+$/);
const passwordRegexp = new RegExp(/^(?=.*[A-ZА-ЯЁ])(?=.*[0-9])[\w\S].{6,}/);
const urlRegexp = new RegExp(/^((http|https):\/\/?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/);
const nameRegexp = new RegExp(/^[A-Za-zа-яА-ЯёЁ]+((-[A-Za-zа-яА-ЯёЁ]+)|( [A-Za-zа-яА-ЯёЁ]+))*$/);
const trimRegexp = new RegExp(/^\s+|\s{2,}|\s+?$/);
const requiredMessage = 'Обязательное поле';
const requiredTrimMessage = 'Не должно начинаться и/или заканчиваться пробелом. В середине не должно быть 2 и более пробелов подряд';
const noUnderscore = value => value.replaceAll('_', '');



export const requiredValidator = value => value ? "" : requiredMessage;

export const requiredWithTrimValidator = value => !value ?
    requiredMessage :
    trimRegexp.test(value) ?
        requiredTrimMessage : "";

export const urlValidator = (value) => !value ? "" : urlRegexp.test(value) ? "" : "Введите ссылку в формате: http://example.com";

export const numbersOnlyValidator = (value) => !value ? "" : numbersOnlyRegex.test(value) ? "" : "Только цифры";

export const emailRequiredValidator = value => !value ?
    requiredMessage :
    emailRegex.test(value) ? "" : "Введите E-mail в формате: example@email.com";

export const emailValidator = (value, maxLength) => value ? emailRegex.test(value) && value.length < maxLength ? "" : "Введите E-mail в формате: example@email.com" : "";

export const postcodeValidator = (value) => !noUnderscore(value)
    ? ""
    : (noUnderscore(value).length < 6 || noUnderscore(value).length > 7)
        ? "Кол-во цифр: 6-7"
        : "";

export const phoneRequiredValidator = (value) => !value ? requiredMessage : phoneRegex.test(value) ? "" : "Формат: +7(999)999-99-99";

export const phoneValidator = (value) => value && value !== phoneMask ? phoneRegex.test(value) ? "" : "Формат: +7(999)999-99-99" : "";

export const aliasValidator = (value, maxLength) => !value ?
    requiredMessage :
    aliasRegex.test(value) && value.length < maxLength ? "" : "Допускаются цифры, латинские буквы и нижнее подчеркивание. Не более 40 символов";

export const codeValidator = value => !value ?
    requiredMessage :
    value.length !== 5 ? "Неверный код" :
        numbersOnlyRegex.test(value) ? "" : "Неверный код";

export const passwordValidator = (value, maxLength) => !value ?
    requiredMessage :
    passwordRegexp.test(value) && value.length < maxLength ? "" : "Пароль должен содержать от 6 до 20 символов, не менее 1 заглавной буквы и не менее 1 цифры";

export const lengthValidator = (value, maxLength) => value && value.length > maxLength ?
    `Макс. кол-во символов: ${maxLength}` : '';

export const nameValidator = (value, maxLength) => !value ? "" : value.length > maxLength
    ? `Макс. кол-во символов: ${maxLength}`
    : nameRegexp.test(value) ? "" : "Допускается ввод только буквенных символов";

export const nameRequiredValidator = (value, maxLength) => !value ?
    requiredMessage :
    value.length > maxLength
        ? `Макс. кол-во символов: ${maxLength}`
        : nameRegexp.test(value)
            ? ""
            : "Допускается ввод только буквенных символов";

export const dateRequiredValidator = value => !value ?
    requiredMessage :
    +value > +new Date() ? "Некорректная дата" : ""