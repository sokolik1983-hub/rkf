import { object, string, array, number, boolean, mixed } from "yup";

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
const apiPedigreeStatusesEndpoint = '/api/requests/PedigreeRequest/statuses';
const apiCitiesEndpoint = '/api/City';
const apiPedigreeDocumentEndpoint = '/api/requests/pedigree_request/PedigreeDocument';
const apiLitterDocumentEndpoint = '/api/requests/litter_request/LitterDocument';
const apiLitterEmptyDocument = '/api/requests/LitterRequest/litter_empty_document';
const apiPedigreeEverk = '/api/requests/PedigreeRequest/everk_dog_info';
const apiLitterEverk = '/api/requests/LitterRequest/everk_breeder_info';
const apiStampCodesEndpoint = '/api/clubs/ClubStampCode/club';
const apiClubDeclarantsEndpoint = '/api/clubs/Declarant/club_declarants';

const reqText = 'Обязательное поле';
const reqEmail = 'Необходимо ввести email';
const reqCheckbox = (x, v = true, o = null) => mixed().when(x, {
    is: v,
    then: o || mixed().required(reqText),
    otherwise: mixed()
})
const numbersOnly = () => string().matches(/^\d+$/, {message:'Можно использовать только цифры'})
const reqIfCash = o => reqCheckbox('cash_payment', false, o)
const idNumber = (name, o = null) => mixed().when(name,{
        is: id => id === Number(id),
        then: o || mixed(),
        otherwise: (o || mixed()).required(reqText)
    })
const lat = () => string().matches(/^[^а-я]+$/i, {message:'Поле заполняется латиницей'})
const file = () => string()/*() => mixed().test('is-accepted', 'Поддерживаются только форматы png, jpeg, jpg и pdf', 
        (async f => (f instanceof File) && [
            "image/png",
            "image/jpeg",
            "application/pdf"
        ].includes(await (fileType.fromBlob(f).then(x => x.mime).catch(e => e))) || !f)
    )
window.ft = fileType
*/
//console.log(file().validate(""))//console.log(file().validateSync("1234"))//, lat().validateSync("123"), idNumber("id", reqIfCash(file())).validateSync("123"))

const pedigreeDeclarantsValidationSchema = array().of(object().shape({
    id: number(),
    express: boolean().required(reqText),
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
    father_pedigree_document: reqCheckbox('father_foreign', true, idNumber('father_pedigree_document_id', file())),
    father_pedigree_number: string().required(reqText),
    mother_name: string().required(reqText),
    mother_foreign: boolean().required(reqText),
    mother_pedigree_document: reqCheckbox('mother_foreign', true, idNumber('mother_pedigree_document_id', file())),
    mother_pedigree_number: string().required(reqText),

    breeder_first_name: string().required(reqText),
    breeder_last_name: string().required(reqText),
    breeder_second_name: string(),
    breeder_address: string().required(reqText),

    email: lat().required(reqText).email(reqEmail),
    was_reviewed: boolean().required(reqText),
    litter_or_request_number: string(),
    biometric_card_document: idNumber('biometric_card_document_id', file()),
    personal_data_document: idNumber('personal_data_document_id', file()),
    //request_extract_from_verk_document: idNumber('request_extract_from_verk_document_id', file()),
    chip_number: string(),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: number().required(reqText).typeError(reqText),
        document: idNumber('id', file())
    }))
})).min(1, 'Заполните хотя бы одну заявку');

const pedigreeDeclarantsUpdateSchema = array().of(object().shape({
    id: number(),
    declarant_uid: string(),
    biometric_card_document: file(),
    personal_data_document: file(),
    //request_extract_from_verk_document: file(),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: mixed().when('document', {
            is: '',
            then: mixed(),
            otherwise: number().required(reqText).typeError(reqText)
        }),
        document: file()
    }))
}));

const litterDeclarantsValidationSchema = array().of(object().shape({
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
    instructor_nursery_owner_first_name: string(),
    instructor_nursery_owner_last_name: string(),
    instructor_nursery_owner_second_name: string(),
    hallmark_first_name: string().required(reqText),
    hallmark_last_name: string().required(reqText),
    hallmark_second_name: string(),

    application_document: idNumber('application_document_id', file()),
    litter_diagnostic: idNumber('litter_diagnostic_id', file()),
    dog_mating_act: idNumber('dog_mating_act_id', file()),
    parent_certificate_1: idNumber('parent_certificate_1_id', file()),
    parent_certificate_2: idNumber('parent_certificate_2_id', file()),
    personal_data_document: idNumber('personal_data_document_id', file()),
    litters: array().of(object().shape({
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
        document: idNumber('id', file())
    }))
})).min(1, 'Заполните хотя бы одну заявку');

const litterDeclarantsUpdateSchema = array().of(object().shape({
    id: number(),
    declarant_uid: string(),
    application_document: file(),
    litter_diagnostic: file(),
    dog_mating_act: file(),
    father_pedigree_document: file(),
    personal_data_document: file(),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: mixed().when('document', {
            is: '',
            then: mixed(),
            otherwise: number().required(reqText).typeError(reqText)
        }),
        document: file()
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
}));

const commonValidationSchema = {
    id: number(),
    status_id: number(),
    federation_id: number().required(reqText).typeError(reqText),
    declarant_id: number().required(reqText).typeError(reqText),
    /*
    last_name: string().required(reqText),
    first_name: string().required(reqText),
    second_name: string(),
    index: string().required(reqText),
    city_id: number().required(reqText).typeError(reqText),
    street: string().required(reqText),
    house: string().required(reqText),
    building: string(),
    flat: string(),
    phone: string().required(reqText),
    email: string().required(reqText).email(reqEmail),
    */

    cash_payment: boolean().required(reqText),
    payment_document: reqIfCash(idNumber('payment_document_id', file())),
    payment_date: reqIfCash(),
    payment_number: reqIfCash(),
    payment_name: reqIfCash(),
    inn: numbersOnly().length(10, 'Номер ИНН состоит из 10 цифр')
};

const commonUpdateSchema = {
    status_id: number(),
    id: number(),
    cash_payment: boolean(),
    payment_document: file(),
    payment_date: string(),
    payment_number: string(),
    payment_name: string(),
    inn: numbersOnly().length(10, 'Номер ИНН состоит из 10 цифр')
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
    //request_extract_from_verk_document: '',
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
    stamp_code_id: '',
    
    father_name: '',
    father_foreign: false,
    father_pedigree_number: '',
    mother_name: '',
    mother_foreign: false,
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
    apiLitterEmptyDocument,
    apiPedigreeEverk,
    apiLitterEverk,
    apiPedigreeStatusesEndpoint,
    apiStampCodesEndpoint,
    apiClubDeclarantsEndpoint
};

