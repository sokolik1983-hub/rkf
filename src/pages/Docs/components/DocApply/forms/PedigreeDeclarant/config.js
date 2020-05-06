import {number} from "yup";
import {reqText, numbersOnly} from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";

const apiPedigreeEndpoint = '/api/requests/PedigreeRequest';
const apiLitterEndpoint = '/api/requests/LitterRequest';
const apiDoctypeEndpoint = '/api/requests/PedigreeRequest/additional_document_types';
const apiLitterDoctypeEndpoint = '/api/requests/LitterRequest/additional_document_types';
const apiBreedsEndpoint = '/api/dog/Breed';
const apiSexTypesEndpoint = '/api/dog/Breed/sex_types';
const apiPedigreePrivacyEndpoint = '/api/requests/PedigreeRequest/personal_data_document';
const apiLitterPrivacyEndpoint = '/api/requests/LitterRequest/personal_data_document';
const apiLitterDogStatusEndpoint = '/api/requests/LitterRequest/litter_dog_status';
const apiVerkEndpoint = '/api/requests/PedigreeRequest/request_extract_from_verk_document';
const apiStatusesEndpoint = '/api/requests/CommonRequest/status';
const apiPedigreeStatusesEndpoint = '/api/requests/PedigreeRequest/statuses';
const apiCitiesEndpoint = '/api/City';
const apiPedigreeDocumentEndpoint = '/api/requests/PedigreeRequest/document';
const apiLitterDocumentEndpoint = '/api/requests/LitterRequest/document';
const apiLitterEmptyDocument = '/api/requests/LitterRequest/litter_empty_document';
const apiPedigreeEverk = '/api/requests/PedigreeRequest/everk_dog_info';
const apiLitterEverk = '/api/requests/LitterRequest/everk_breeder_info';
const apiStampCodesEndpoint = '/api/clubs/ClubStampCode/club';
const apiClubDeclarantsEndpoint = '/api/clubs/Declarant/club_declarants';


const validationSchema = {
};

const updateSchema = {
};

const config = {
    validationSchema, updateSchema,
    onSuccess: {
        save: (values, setRedirect, clubAlias) => values && values.id && setRedirect(`/${clubAlias}/documents/pedigree/${values.id}/header/form`),
        next: (values, setRedirect, clubAlias) => values && values.id && setRedirect(`/${clubAlias}/documents/pedigree/${values.id}/table/form`)
    },
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        },
        declarants: {
            url: apiClubDeclarantsEndpoint,
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default))
        },
        doctypes: {
            url: apiDoctypeEndpoint,
            maping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name_rus})),
        },
        breeds: {
            url: apiBreedsEndpoint,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})),
        },
        sexTypes: {
            url: apiSexTypesEndpoint,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})),
        },
        statuses: {
            url: apiPedigreeStatusesEndpoint,
            mapping: data => data.sort((a,b) => a.id - b.id),
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
