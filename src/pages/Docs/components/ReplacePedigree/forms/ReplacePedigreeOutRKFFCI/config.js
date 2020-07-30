import {number,string,boolean} from "yup";
import {reqText, numbersOnly} from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";
import Common from "../../commonFields.js";

const validationSchema = {
    id: number(),
    federation_id: number().required(reqText).typeError(reqText),
    declarant_id: number().required(reqText).typeError(reqText),
    personal_data_document_id: number().required(reqText).typeError(reqText),
    copy_pedigree_document_id: number().required(reqText).typeError(reqText),
    truncated_pedigree_application_document_id: number().required(reqText).typeError(reqText),
    ...Common.validation,
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
            url: '/api/clubs/Declarant/club_declarants',
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default))
        },
        ...Common.options
    },
    url: '/api/requests/replace_pedigree_request/replacepedigreeoutrkffcirequest',
    get: '/api/requests/replace_pedigree_request/replacepedigreeoutrkffcirequest',
    initialValues: {
        federation_id: '',
        declarant_id: '',
        express: false,
        personal_data_document_id: '',
        copy_pedigree_document_id: '',
        truncated_pedigree_application_document_id: '',
        ...Common.initial,
    }
}

export default config; 
