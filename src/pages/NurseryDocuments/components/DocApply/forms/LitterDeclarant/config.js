import {number, boolean, string, object, mixed, array} from "yup";
import {reqText, reqEmail, numbersOnly, lat, reqCheckbox} from "../../config.js";
import { endpointGetFederations } from "pages/Clubs/config";

const apiDoctypeEndpoint = '/api/requests/NurseryLitterRequest/additional_document_types';
const apiBreedsEndpoint = '/api/dog/Breed';
const apiSexTypesEndpoint = '/api/dog/Breed/sex_types';
const apiLitterStatusesEndpoint = '/api/requests/CommonRequest/status';
const apiLitterDogStatusEndpoint = '/api/requests/NurseryLitterRequest/litter_dog_status';
const apiStampCodesEndpoint = '/api/nurseries/NurseryStampCode/nursery';
const apiNurseryDeclarantsEndpoint = '/api/nurseries/NurseryDeclarant/nursery_declarants';


const validationSchema = {
    litter_header_declarant_request_id: number(),
    id: number(),
    first_name: string().required(reqText),
    last_name: string().required(reqText),
    second_name: string(),
    email: lat().required(reqText).email(reqEmail),
    address: string().required(reqText),
    first_name_lat: lat().required(reqText),
    last_name_lat: lat().required(reqText),
    address_lat: lat().required(reqText),
    breed_id: number().required(reqText).typeError(reqText),
    stamp_code_id: number().required(reqText).typeError(reqText),
    
    father_name: string().required(reqText),
    father_foreign: boolean().required(reqText),
    father_pedigree_number: string().required(reqText),
    father_pedigree_document_id: reqCheckbox('father_foreign', true, number().required(reqText)),
    mother_name: string().required(reqText),
    mother_foreign: boolean().required(reqText),
    mother_pedigree_number: string().required(reqText),

    date_of_birth_litter: string().required(reqText),
    nursery_name: string(),
    prefix: boolean().required(reqText),
    suffix: boolean().required(reqText),
    instructor_nursery_owner_first_name: string(),
    instructor_nursery_owner_last_name: string(),
    instructor_nursery_owner_second_name: string(),
    hallmark_first_name: string().required(reqText),
    hallmark_last_name: string().required(reqText),
    hallmark_second_name: string(),

    litter_diagnostic_id: number().required(reqText),
    dog_mating_act_id: number().required(reqText),
    application_document_id: number().required(reqText),
    personal_data_document_id: number().required(reqText),
    litters: array().of(object().shape({
        id: number(),
        dog_name: string().required(reqText),
        dog_name_lat: lat(),
        dog_color: string().required(reqText),
        dog_sex_type_id: number().required(reqText).typeError(reqText),
        stamp_number: numbersOnly().required(reqText),
        chip_number: string(),
        litter_dog_status_id: string().required(reqText),
        status_comment: string().when('litter_dog_status_id', {
            is: v => !["2","4"].includes(String(v)),
            then: string(),
            otherwise: string().required(reqText)
        })
    })),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: number().required(reqText).typeError(reqText),
        document_id: number().required(reqText)
    }))

}

const updateSchema = {
    id: number(),
    declarant_uid: string(),
    litter_diagnostic_id: number(),
    dog_mating_act_id: number(),
    personal_data_document_id: number(),
    father_pedigree_document_id: mixed(),
    application_document_id: mixed(),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: mixed().when('document', {
            is: '',
            then: mixed(),
            otherwise: number().required(reqText).typeError(reqText)
        }),
        document: number()
    })),
    litters: array().of(object().shape({
        id: number(),
        dog_name: string().required(reqText),
        dog_name_lat: lat(),
        dog_color: string().required(reqText),
        dog_sex_type_id: number().required(reqText).typeError(reqText),
        stamp_number: numbersOnly().required(reqText),
        chip_number: string(),
        litter_dog_status_id: number().required(reqText).typeError(reqText),
        status_comment: string().when('litter_dog_status_id', {
            is: v => !["2","4"].includes(String(v)),
            then: string(),
            otherwise: string().required(reqText)
        })
    }))

}


const emptyNurseryLitterDeclarant = {
    first_name: '',
    last_name: '',
    second_name: '',
    email: '',
    address: '',
    first_name_lat: '',
    last_name_lat: '',
    address_lat: '',
    breed_id: '',
    stamp_code_id: '',
    
    father_name: '',
    father_foreign: false,
    father_pedigree_number: '',
    mother_name: '',
    mother_foreign: false,
    mother_pedigree_number: '',

    date_of_birth_litter: '',
    nursery_name: '',
    prefix: false,
    suffix: false,
    instructor_nursery_owner_first_name: '',
    instructor_nursery_owner_last_name: '',
    instructor_nursery_owner_second_name: '',
    hallmark_first_name: '',
    hallmark_last_name: '',
    hallmark_second_name: '',
    litter_diagnostic: '',
    dog_mating_act: '',
    personal_data_document: '',
    litters: [{
        dog_name: '',
        dog_name_lat: '',
        dog_color: '',
        dog_sex_type_id: '',
        stamp_number: '',
        chip_number: '',
        litter_dog_status_id: '',
        status_comment: ''
    }],
    documents: []
};

const config = {
    validationSchema, updateSchema,
    onSuccess: {
        save: (values, setRedirect, alias, id) => values && values.id && setRedirect(`/kennel/${alias}/documents/litter/${id}/declarant/form`),
        next: (values, setRedirect, alias, id) => values && values.id && setRedirect(`/kennel/${alias}/documents/litter/${id}/table/form`)
    },
    options: {
        federations: {
            url: endpointGetFederations,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name}))
        },
        declarants: {
            url: apiNurseryDeclarantsEndpoint,
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default))
        },
        doctypes: {
            url: apiDoctypeEndpoint,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name_rus})),
        },
        breeds: {
            url: apiBreedsEndpoint,
            mapping: data => data.filter(f => typeof f.id === 'number' && f.id !== 1).map(m => ({value: m.id, label:m.name})),
        },
        sexTypes: {
            url: apiSexTypesEndpoint,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})),
        },
        statuses: {
            url: apiLitterStatusesEndpoint,
            mapping: data => data.sort((a,b) => a.id - b.id),
        },
        stampCodes: {
            url: nurseryId => apiStampCodesEndpoint + '?id=' + nurseryId,
            mapping: data => data.sort((a,b) => Number(b.is_default) - Number(a.is_default)).map(m => ({value: m.stamp_code_id, label:m.stamp_code}))
        },
        litterStatuses: {
            url: apiLitterDogStatusEndpoint,
            mapping: data => data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name}))
        }
    },
    hooks: {
        values: values => ({...values.declarant, litter_header_declarant_request_id: values.id, litter_request_id: values.litter_request_id, declarant_uid: values.declarant_uid, documents: values.documents, litters: values.litters})
    },
    url: '/api/requests/litter_request/NurseryLitterDeclarantRequest',
    get: '/api/requests/litter_request/NurseryLitterDeclarantRequest/declarant',
    initialValues: emptyNurseryLitterDeclarant
}

export default config; 
