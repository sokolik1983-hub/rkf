import {number} from "yup";
import {reqText} from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";

const apiLitterEndpoint = '/api/litter/pedigree_request/LitterRequestHeader';
const apiClubDeclarantsEndpoint = '/api/clubs/Declarant/club_declarants';

const validationSchema = {
    id: number(),
    status_id: number(),
    federation_id: number().required(reqText).typeError(reqText),
    declarant_id: number().required(reqText).typeError(reqText),
};

const updateSchema = {
    id: number(),
};

const config = {
    validationSchema, updateSchema,
    onSuccess: {
        save: (values, setRedirect, clubAlias) => values && values.id && setRedirect(`/${clubAlias}/documents/litter/${values.id}/header/form`),
        next: (values, setRedirect, clubAlias) => values && values.id && setRedirect(`/${clubAlias}/documents/litter/${values.id}/table/form`)
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
    url: apiLitterEndpoint,
    get: '/api/requests/LitterRequest',
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
