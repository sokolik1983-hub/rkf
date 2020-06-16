import {number, boolean} from "yup";
import {reqText, numbersOnly, reqIfCash} from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";
import { Request } from "utils/request";

const apiLitterEndpoint = '/api/litter/pedigree_request/NurseryLitterRequestHeader/payment';

const validationSchema = {
    id: number(),
    cash_payment: boolean().required(reqText),
    payment_document_id: reqIfCash(number().required(reqText).typeError(reqText)),
    payment_date: reqIfCash(),
    payment_number: reqIfCash(),
    payment_name: reqIfCash(),
    inn: numbersOnly().length(10, 'Номер ИНН состоит из 10 цифр')
};

const updateSchema = {
    id: number(),
};

const config = {
    validationSchema, updateSchema,
    onSuccess: {
        next: (values, setRedirect, alias) => values && values.id && Request({
            url: '/api/requests/NurseryLitterRequest/new',
            method: "POST",
            data: {id:values.id}
        },
        _ => {window.alert("Заявка отправлена на рассмотрение");setRedirect(`/nursery/${alias}/documents`)},
        e => {window.alert(e && e.response && e.response.data && e.response.data.errors && e.response.data.errors.NurseryLitterRequest
            ? e.response.data.errors.NurseryLitterRequest
            : 'Отсутствует соединение с сервером');})
    },
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        }
    },
    url: apiLitterEndpoint,
    get: '/api/requests/NurseryLitterRequest',
    initialValues: {
        cash_payment: false,
        payment_document: '',
        payment_date: '',
        payment_number: '',
        payment_name: '',
        inn: ''
    }
}

export default config; 
