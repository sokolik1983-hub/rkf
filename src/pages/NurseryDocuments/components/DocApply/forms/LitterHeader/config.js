import {number,string} from "yup";
import {reqText,numbersOnly} from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";

const apiLitterEndpoint = '/api/litter/pedigree_request/NurseryLitterRequestHeader';
const apiNurseryDeclarantsEndpoint = '/api/nurseries/NurseryDeclarant/nursery_declarants';

const validationSchema = {
    id: number(),
    federation_id: number().required(reqText).typeError(reqText),
    declarant_id: number().required(reqText).typeError(reqText),
    folder_number: string().required(reqText)
};

const updateSchema = {
    id: number(),
};

const config = {
    validationSchema, updateSchema,
    onSuccess: {
        save: (values, setRedirect, alias) => values && values.id && setRedirect(`/kennel/${alias}/documents/litter/${values.id}/header/form`),
        next: (values, setRedirect, alias) => values && values.id && setRedirect(`/kennel/${alias}/documents/litter/${values.id}/table/form`)
    },
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        },
        declarants: {
            url: apiNurseryDeclarantsEndpoint,
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default))
        }
    },
    url: apiLitterEndpoint,
    get: '/api/requests/NurseryLitterRequest',
    initialValues: {
        federation_id: '',
        declarant_id: 0,
        folder_number: '',
        phone: '',
        email: '',
        address: '',
        subscriber_mail: ''
    }
}

export default config; 
