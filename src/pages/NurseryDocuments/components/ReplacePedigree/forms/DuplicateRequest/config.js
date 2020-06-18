import {number,string,boolean} from "yup";
import {reqText, numbersOnly} from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";

const validationSchema = {
    id: number(),
    federation_id: number().required(reqText).typeError(reqText),
    declarant_id: number().required(reqText).typeError(reqText),
    express: boolean().required(reqText),
    personal_data_document_id: number().required(reqText).typeError(reqText),
    duplicate_application_id: number().required(reqText).typeError(reqText),
    payment_document_id: number().required(reqText).typeError(reqText),
    payment_date: string().required(reqText),
    payment_number: string().required(reqText),
    payment_name: string().required(reqText),
    inn: string(),
    comment: string()
};

const updateSchema = validationSchema;

const config = {
    validationSchema, updateSchema,
    onSuccess: {
        next: (values, setRedirect, alias) => {window.alert('Заявка отправлена на рассмотрение');setRedirect(`/${alias}/documents/`);}
    },
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        },
        declarants: {
            url: '/api/nurseries/nurserydeclarant/nursery_declarants',
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default))
        }
    },
    url: '/api/requests/replace_pedigree_request/nurseryreplacepedigreeduplicaterequest',
    get: '/api/requests/replace_pedigree_request/nurseryreplacepedigreeduplicaterequest',
    initialValues: {
        federation_id: '',
        declarant_id: '',
        express: false,
        personal_data_document_id: '',
        duplicate_application_id: '',
        payment_document_id: '',
        payment_date: '',
        payment_number: '',
        payment_name: '',
        inn: '',
        comment: ''
    }
}

export default config; 
