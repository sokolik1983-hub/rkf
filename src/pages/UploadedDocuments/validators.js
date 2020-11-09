const categoryNameRegex = new RegExp(/^[^\s]+(\s[^\s]+)*$/);
const requiredMessage = 'Обязательное поле';

export const categoryNameValidator = (value, maxLength) => value ? value.length > maxLength
    ? `Макс. кол-во символов: ${maxLength}`
    : categoryNameRegex.test(value) ? "" : "Некорректное название" : requiredMessage;
