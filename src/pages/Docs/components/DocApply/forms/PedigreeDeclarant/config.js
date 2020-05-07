import {number, boolean, string, object, mixed, array} from "yup";
import {reqText, reqEmail, numbersOnly, idNumber, lat, reqCheckbox, file} from "../../config.js";
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
    pedigree_header_declarant_request_id: number(),
    id: number(),
    express: boolean().required(reqText),
    one_generation: boolean(),
    two_generation: boolean(),
    owner_first_name: string().required(reqText),
    owner_last_name: string().required(reqText),
    owner_second_name: string(),
    owner_address: string().required(reqText),
    owner_address_lat: lat().required(reqText),
    owner_first_name_lat: lat().required(reqText),
    owner_last_name_lat: lat().required(reqText),

    breed_id: number().required(reqText).typeError(reqText),
    dog_name: string().required(reqText),
    dog_name_lat: lat().required(reqText),
    dog_birth_date: string().required(reqText),
    dog_sex_type: number().required(reqText).typeError(reqText),
    stamp_number: numbersOnly().required(reqText),
    stamp_code_name: string().required(reqText).matches(/^[A-Z]{3}$/, {message:'Введите 3 латинские буквы'}),
    color: string().required(reqText),

    father_name: string().required(reqText),
    father_foreign: boolean().required(reqText),
    father_pedigree_document_id: reqCheckbox('father_foreign', true, number().required(reqText)),
    father_pedigree_number: string().required(reqText),
    mother_name: string().required(reqText),
    mother_foreign: boolean().required(reqText),
    mother_pedigree_document_id: reqCheckbox('mother_foreign', true, number().required(reqText)),
    mother_pedigree_number: string().required(reqText),

    breeder_first_name: string().required(reqText),
    breeder_last_name: string().required(reqText),
    breeder_second_name: string(),
    breeder_address: string().required(reqText),

    email: lat().required(reqText).email(reqEmail),
    was_reviewed: boolean().required(reqText),
    litter_or_request_number: string(),
    biometric_card_document_id: number().required(reqText),
    personal_data_document_id: number().required(reqText),
    chip_number: string(),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: number().required(reqText).typeError(reqText),
        document_id: number().required(reqText)
    }))
}

const updateSchema = {
    id: number(),
    declarant_uid: string(),
    biometric_card_document_id: number(),
    personal_data_document_id: number(),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: mixed().when('document', {
            is: '',
            then: mixed(),
            otherwise: number().required(reqText).typeError(reqText)
        }),
        document_id: number().required(reqText)
    }))
}


const emptyPedigreeDeclarant = {
    express: false,
    one_generation: false,
    two_generation: true,
    owner_first_name: '',
    owner_last_name: '',
    owner_second_name: '',
    owner_address: '',
    owner_address_lat: '',
    owner_first_name_lat: '',
    owner_last_name_lat: '',

    breed_id: '',
    dog_name: '',
    dog_name_lat: '',
    dog_birth_date: '',
    dog_sex_type: '',
    stamp_number: '',
    stamp_code_name: '',
    color: '',

    father_name: '',
    father_foreign: false,
    father_pedigree_number: '',
    father_pedigree_document: '',
    mother_name: '',
    mother_foreign: false,
    mother_pedigree_number: '',
    mother_pedigree_document: '',

    breeder_first_name: '',
    breeder_last_name: '',
    breeder_second_name: '',
    breeder_address: '',

    email: '',
    was_reviewed: false,
    litter_or_request_number: '',
    biometric_card_document: '',
    personal_data_document: '',
    request_extract_from_verk_document: '',
    chip_number: '',
    documents: []
};
const config = {
    validationSchema, updateSchema,
    onSuccess: {
        save: (values, setRedirect, clubAlias) => values && values.id && setRedirect(`/${clubAlias}/documents/pedigree/${values.id}/table/form`)
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
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name_rus})),
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
        },
        stampCodes: {
            url: clubId => apiStampCodesEndpoint + '?id=' + clubId,
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default)).map(m => ({value: m.stamp_code_id, label:m.stamp_code}))
        }
    },
    hooks: {
        values: values => ({...values.declarant, pedigree_header_declarant_request_id: values.id, pedigree_request_id: values.pedigree_request_id, declarant_uid: values.declarant_uid, documents: values.documents})
    },
    url: '/api/requests/pedigree_request/PedigreeDeclarantRequest',
    get: '/api/requests/pedigree_request/PedigreeDeclarantRequest/declarant',
    initialValues: emptyPedigreeDeclarant
}

export default config; 
