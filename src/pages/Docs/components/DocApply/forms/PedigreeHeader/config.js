import { number, string } from "yup";
import { reqText } from "../../config.js";


const endpointGetFederations = '/api/clubs/Federation';
const apiPedigreeEndpoint = '/api/requests/pedigree_request/PedigreeRequestHeader';
const apiClubDeclarantsEndpoint = '/api/clubs/Declarant/club_declarants';

const validationSchema = {
    id: number(),
    status_id: number(),
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
        save: (values, setRedirect, alias) => values && values.id && setRedirect(`/${alias}/documents/pedigree/${values.id}/header/form`),
        next: (values, setRedirect, alias) => values && values.id && setRedirect(`/${alias}/documents/pedigree/${values.id}/table/form`)
    },
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        },
        declarants: {
            url: apiClubDeclarantsEndpoint,
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default))
        }
    },
    url: apiPedigreeEndpoint,
    get: '/api/requests/PedigreeRequest',
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
