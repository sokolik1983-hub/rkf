import { object, string, array, number, boolean } from "yup";

const reqText = 'Обязательное поле';
const reqEmail = 'Необходимо ввести email';
const reqIfCash = () => string().when('cash_payment', {
    is: true,
    then: string(),
    otherwise: string().required(reqText)
})

const pedigreeDeclarantsValidationSchema = array().of(object().shape({
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

const litterDeclarantsValidationSchema = array();
const litterDeclarantsUpdateSchema = array();

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
    ogrn: string()
};

const commonUpdateSchema = {
    id: number(),
    cash_payment: boolean(),
    payment_document: string(),
    payment_date: string(),
    payment_number: string(),
    payment_name: string(),
    ogrn: string()
};

const pedigreeValidationSchema = object().shape({...commonValidationSchema, declarants: pedigreeDeclarantsValidationSchema});
const pedigreeUpdateSchema = object().shape({...commonUpdateSchema, declarants: pedigreeDeclarantsUpdateSchema});

const litterValidationSchema = object().shape({...commonValidationSchema, declarants: litterDeclarantsValidationSchema});
const litterUpdateSchema = object().shape({...commonUpdateSchema, declarants: litterDeclarantsUpdateSchema});

const emptyPedigreeDeclarant = {
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
    
};

export {
    emptyPedigreeDeclarant,
    emptyLitterDeclarant,
    pedigreeValidationSchema,
    litterValidationSchema,
    pedigreeUpdateSchema,
    litterUpdateSchema
};
