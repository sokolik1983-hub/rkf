import { object, string, array, number, boolean } from "yup";

const apiPedigreeEndpoint = '/api/requests/PedigreeRequest';
const apiLitterEndpoint = '/api/requests/LitterRequest';
const apiPedigreeDoctypeEndpoint = '/api/requests/PedigreeRequest/additional_document_types';
const apiLitterDoctypeEndpoint = '/api/requests/LitterRequest/additional_document_types';
const apiBreedsEndpoint = '/api/dog/Breed';
const apiSexTypesEndpoint = '/api/dog/Breed/sex_types';
const apiPedigreePrivacyEndpoint = '/api/requests/PedigreeRequest/personal_data_document';
const apiLitterPrivacyEndpoint = '/api/requests/LitterRequest/personal_data_document';
const apiLitterDogStatusEndpoint = '/api/requests/LitterRequest/litter_dog_status';
const apiVerkEndpoint = '/api/requests/PedigreeRequest/request_extract_from_verk_document';
const apiStatusesEndpoint = '/api/requests/CommonRequest/status';
const apiCitiesEndpoint = '/api/City';
const apiPedigreeDocumentEndpoint = '/api/requests/PedigreeRequest/document';
const apiLitterDocumentEndpoint = '/api/requests/LitterRequest/document';
const apiLitterEmptyDocument = '/api/requests/LitterRequest/litter_empty_document';


const reqText = 'Обязательное поле';
const reqEmail = 'Необходимо ввести email';
const reqIfCash = () => string().when('cash_payment', {
    is: true,
    then: string(),
    otherwise: string().required(reqText)
})

const pedigreeDeclarantsValidationSchema = array().of(object().shape({
    express: boolean().required(reqText),
    owner_first_name: string().required(reqText),
    owner_last_name: string().required(reqText),
    owner_second_name: string(),
    owner_address: string().required(reqText),
    owner_address_lat: string().required(reqText),
    owner_first_name_lat: string().required(reqText),
    owner_last_name_lat: string().required(reqText),

    breed_id: number().required(reqText).typeError(reqText),
    dog_name: string().required(reqText),
    dog_name_lat: string().required(reqText),
    dog_birth_date: string().required(reqText),
    dog_sex_type: number().required(reqText).typeError(reqText),
    stamp_number: string().required(reqText),
    color: string().required(reqText),

    father_name: string().required(reqText),
    father_pedigree_number: string().required(reqText),
    mother_name: string().required(reqText),
    mother_pedigree_number: string().required(reqText),

    breeder_first_name: string().required(reqText),
    breeder_last_name: string().required(reqText),
    breeder_second_name: string(),
    breeder_address: string().required(reqText),

    email: string().required(reqText).email(reqEmail),
    was_reviewed: boolean().required(reqText),
    litter_or_request_number: string(),
    biometric_card_document: string().required(reqText),
    personal_data_document: string().required(reqText),
    request_extract_from_verk_document: string().required(reqText),
    chip_number: string(),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: number().required(reqText).typeError(reqText),
        document: string().required(reqText)
    }))
})).min(1, 'Заполните хотя бы одну заявку');

const pedigreeDeclarantsUpdateSchema = array().of(object().shape({
    id: number(),
    declarant_uid: string(),
    biometric_card_document: string(),
    personal_data_document: string(),
    request_extract_from_verk_document: string(),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: number(),
        document: string()
    }))
}));

const litterDeclarantsValidationSchema = array().of(object().shape({
    first_name: string().required(reqText),
    last_name: string().required(reqText),
    second_name: string(),
    email: string().required(reqText),
    address: string().required(reqText),
    first_name_lat: string().required(reqText),
    last_name_lat: string().required(reqText),
    address_lat: string().required(reqText),
    breed_id: number().required(reqText).typeError(reqText),
    stamp_number: string().required(reqText),
    father_dog_name: string().required(reqText),
    father_pedigree_number: string().required(reqText),
    mother_dog_name: string().required(reqText),
    mother_pedigree_number: string().required(reqText),
    date_of_birth_litter: string().required(reqText),
    nursery_name: string(),
    instructor_nursery_owner_first_name: string(),
    instructor_nursery_owner_last_name: string(),
    instructor_nursery_owner_second_name: string(),
    hallmark_first_name: string().required(reqText),
    hallmark_last_name: string().required(reqText),
    hallmark_second_name: string(),

    application_document: string().required(reqText),
    litter_diagnostic: string().required(reqText),
    dog_mating_act: string().required(reqText),
    parent_certificate_1: string().required(reqText),
    parent_certificate_2: string().required(reqText),
    personal_data_document: string().required(reqText),
    litters: array().of(object().shape({
        dog_name: string().required(reqText),
        dog_name_lat: string().required(reqText),
        dog_color: string().required(reqText),
        dog_sex_type_id: number().required(reqText).typeError(reqText),
        stamp_number: string().required(reqText),
        chip_number: string(),
        litter_dog_status_id: string().required(reqText),
        status_comment: string().when('litter_dog_status_id', {
            is: v => ![2,4].includes(v),
            then: string(),
            otherwise: string().required(reqText)
        })
    })),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: number().required(reqText).typeError(reqText),
        document: string().required(reqText)
    }))
})).min(1, 'Заполните хотя бы одну заявку');

const litterDeclarantsUpdateSchema = array().of(object().shape({
    id: number(),
    declarant_uid: string(),
    application_document: string(),
    litter_diagnostic: string(),
    dog_mating_act: string(),
    parent_certificate_1: string(),
    parent_certificate_2: string(),
    personal_data_document: string(),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: number(),
        document: string()
    })),
    litters: array().of(object().shape({
        id: number(),
        dog_name: string().required(reqText),
        dog_name_lat: string().required(reqText),
        dog_color: string().required(reqText),
        dog_sex_type_id: number().required(reqText).typeError(reqText),
        stamp_number: string().required(reqText),
        chip_number: string(),
        litter_dog_status_id: number().required(reqText).typeError(reqText),
        status_comment: string().when('litter_dog_status_id', {
            is: v => ![2,4].includes(v),
            then: string(),
            otherwise: string().required(reqText)
        })
    }))
}));

const commonValidationSchema = {
    federation_id: number().required(reqText).typeError(reqText),
    last_name: string().required(reqText),
    first_name: string().required(reqText),
    second_name: string(),
    phone: string().required(reqText),
    index: string().required(reqText),
    city_id: number().required(reqText).typeError(reqText),
    street: string().required(reqText),
    house: string().required(reqText),
    building: string(),
    flat: string(),
    email: string().required(reqText).email(reqEmail),
    
    cash_payment: boolean().required(reqText),
    payment_document: reqIfCash(),
    payment_date: reqIfCash(),
    payment_number: reqIfCash(),
    payment_name: reqIfCash(),
    inn: string()
};

const commonUpdateSchema = {
    id: number(),
    cash_payment: boolean(),
    payment_document: string(),
    payment_date: string(),
    payment_number: string(),
    payment_name: string(),
    inn: string()
};

const pedigreeValidationSchema = object().shape({...commonValidationSchema, declarants: pedigreeDeclarantsValidationSchema});
const pedigreeUpdateSchema = object().shape({...commonUpdateSchema, declarants: pedigreeDeclarantsUpdateSchema});

const litterValidationSchema = object().shape({...commonValidationSchema, declarants: litterDeclarantsValidationSchema});
const litterUpdateSchema = object().shape({...commonUpdateSchema, declarants: litterDeclarantsUpdateSchema});

const emptyPedigreeDeclarant = {
    express: false,
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
    color: '',

    father_name: '',
    father_pedigree_number: '',
    mother_name: '',
    mother_pedigree_number: '',

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

const emptyLitterDeclarant = {
    first_name: '',
    last_name: '',
    second_name: '',
    email: '',
    address: '',
    first_name_lat: '',
    last_name_lat: '',
    address_lat: '',
    breed_id: '',
    stamp_number: '',
    father_dog_name: '',
    father_pedigree_number: '',
    mother_dog_name: '',
    mother_pedigree_number: '',
    date_of_birth_litter: '',
    nursery_name: '',
    instructor_nursery_owner_first_name: '',
    instructor_nursery_owner_last_name: '',
    instructor_nursery_owner_second_name: '',
    hallmark_first_name: '',
    hallmark_last_name: '',
    hallmark_second_name: '',
    application_document: '',
    litter_diagnostic: '',
    dog_mating_act: '',
    parent_certificate_1: '',
    parent_certificate_2: '',
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

export {
    emptyPedigreeDeclarant,
    emptyLitterDeclarant,
    pedigreeValidationSchema,
    litterValidationSchema,
    pedigreeUpdateSchema,
    litterUpdateSchema,
    apiPedigreeEndpoint,
    apiLitterEndpoint,
    apiPedigreeDoctypeEndpoint,
    apiLitterDoctypeEndpoint,
    apiBreedsEndpoint,
    apiSexTypesEndpoint,
    apiPedigreePrivacyEndpoint,
    apiLitterPrivacyEndpoint,
    apiVerkEndpoint,
    apiStatusesEndpoint,
    apiCitiesEndpoint,
    apiLitterDogStatusEndpoint,
    apiPedigreeDocumentEndpoint,
    apiLitterDocumentEndpoint,
    apiLitterEmptyDocument
};
