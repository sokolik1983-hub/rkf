import {number,string,boolean} from "yup";
import {reqText, numbersOnly} from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";
import Common from "../../commonFields.js";
import DogInfo from "../../dogInfo.js";

const validationSchema = {
    id: number(),
    federation_id: number().required(reqText).typeError(reqText),
    declarant_id: number().required(reqText).typeError(reqText),
    personal_data_document_id: number().required(reqText).typeError(reqText),
    copy_pedigree_document_id: number().required(reqText).typeError(reqText),
    ...Common.validation,
    ...DogInfo.validation
};

const updateSchema = validationSchema;

const config = {
    validationSchema, updateSchema,
    onSuccess: {
        next: (values, setRedirect, alias) => {window.alert('Заявка отправлена на рассмотрение');setRedirect(`/kennel/${alias}/documents/`);}
    },
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        },
        declarants: {
            url: '/api/nurseries/nurserydeclarant/nursery_declarants',
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default))
        },
        ...Common.options,
        ...DogInfo.options
    },
    url: '/api/requests/replace_pedigree_request/kennelreplacepedigreedeclaranterrorrequest',
    get: '/api/requests/replace_pedigree_request/kennelreplacepedigreedeclaranterrorrequest',
    initialValues: {
        federation_id: '',
        declarant_id: '',
        personal_data_document_id: '',
        copy_pedigree_document_id: '',
        ...Common.initial,
        ...DogInfo.initial
    }
}

export default config; 
