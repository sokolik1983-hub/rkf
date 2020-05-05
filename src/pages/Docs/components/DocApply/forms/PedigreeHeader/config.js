import {number} from "yup";
import {reqText} from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";

const apiPedigreeEndpoint = '/api/requests/PedigreeRequest';
const apiLitterEndpoint = '/api/requests/LitterRequest';
const apiStatusesEndpoint = '/api/requests/CommonRequest/status';
const apiPedigreeStatusesEndpoint = '/api/requests/PedigreeRequest/statuses';
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
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        },
        declarants: {
            url: apiClubDeclarantsEndpoint,
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default))
        }
    }
}

export default config; 
