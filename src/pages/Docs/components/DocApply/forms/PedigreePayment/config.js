import {number, boolean} from "yup";
import {reqText, numbersOnly, reqIfCash, idNumber, file} from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";

const apiPedigreeEndpoint = '/api/requests/pedigree_request/PedigreeRequestHeader/payment';
const apiStatusesEndpoint = '/api/requests/CommonRequest/status';
const apiPedigreeStatusesEndpoint = '/api/requests/PedigreeRequest/statuses';
const apiClubDeclarantsEndpoint = '/api/clubs/Declarant/club_declarants';

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
        send: (values, setRedirect, clubAlias) => values && values.id && setRedirect(`/${clubAlias}/documents`)
    },
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        }
    },
    url: apiPedigreeEndpoint,
    get: '/api/requests/PedigreeRequest',
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
