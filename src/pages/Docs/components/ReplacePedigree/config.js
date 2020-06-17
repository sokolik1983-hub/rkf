import { object, string, array, number, boolean, mixed } from "yup";

const reqText = 'Обязательное поле';
const reqEmail = 'Необходимо ввести email';
const reqCheckbox = (x, v = true, o = null) => mixed().when(x, {
    is: v,
    then: o || mixed().required(reqText),
    otherwise: mixed()
})
const numbersOnly = () => string().matches(/^\d+$/, {message:'Можно использовать только цифры'})
const reqIfCash = o => reqCheckbox('cash_payment', false, o)
const idNumber = (name, o = null) => mixed().when(name,{
        is: id => id === Number(id),
        then: o || mixed(),
        otherwise: (o || mixed()).required(reqText)
    })
const lat = () => string().matches(/^[^а-я]+$/i, {message:'Поле заполняется латиницей'})

export {
    reqText,
    numbersOnly,
    reqIfCash, idNumber, lat, reqCheckbox, reqEmail
};
