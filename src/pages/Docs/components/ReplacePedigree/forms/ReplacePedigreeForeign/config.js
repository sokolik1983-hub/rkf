import { number } from "yup";
import { reqText } from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";
import Common from "../../commonFields.js";

const validationSchema = {
    id: number(),
    federation_id: number().required(reqText).typeError(reqText),
    declarant_id: number().required(reqText).typeError(reqText),
    personal_data_document_id: number().required(reqText).typeError(reqText),
    copy_foreign_pedigree_document_id: number().required(reqText).typeError(reqText),
    application_verk_statement_document_id: number().required(reqText).typeError(reqText),
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
    url: '/api/requests/replace_pedigree_request/replacepedigreeforeignrequest',
    get: '/api/requests/replace_pedigree_request/replacepedigreeforeignrequest',
    initialValues: {
        federation_id: '',
        declarant_id: '',
        personal_data_document_id: '',
        copy_foreign_pedigree_document_id: '',
        application_verk_statement_document_id: '',
        ...Common.initial,
    }
}

export default config; 
