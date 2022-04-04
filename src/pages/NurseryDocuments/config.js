import { object, string, array, number, boolean, mixed } from "yup";
import React from "react";

const apiPedigreeEndpoint = '/api/requests/NurseryPedigreeRequest';
const apiLitterEndpoint = '/api/requests/NurseryLitterRequest';
const apiPedigreeDoctypeEndpoint = '/api/requests/NurseryPedigreeRequest/additional_document_types';
const apiLitterDoctypeEndpoint = '/api/requests/NurseryLitterRequest/additional_document_types';
const apiBreedsEndpoint = '/api/dog/Breed';
const apiSexTypesEndpoint = '/api/dog/Breed/sex_types';
const apiPedigreePrivacyEndpoint = '/api/requests/NurseryPedigreeRequest/personal_data_document';
const apiLitterPrivacyEndpoint = '/api/requests/NurseryLitterRequest/personal_data_document';
const apiLitterDogStatusEndpoint = '/api/requests/NurseryLitterRequest/litter_dog_status';
const apiVerkEndpoint = '/api/requests/NurseryPedigreeRequest/request_extract_from_verk_document';
const apiStatusesEndpoint = '/api/requests/CommonRequest/status';
const apiPedigreeStatusesEndpoint = '/api/requests/NurseryPedigreeRequest/statuses';
const apiCitiesEndpoint = '/api/City';
const apiNurseryPedigreeDocumentEndpoint = '/api/requests/pedigree_request/NurseryPedigreeDocument';
const apiNurseryLitterDocumentEndpoint = '/api/requests/litter_request/NurseryLitterDocument';
const apiLitterEmptyDocument = '/api/requests/NurseryLitterRequest/litter_empty_document';
const apiPedigreeEverk = '/api/requests/NurseryPedigreeRequest/everk_dog_info';
const apiLitterEverk = '/api/requests/NurseryLitterRequest/everk_breeder_info';
const apiStampCodesEndpoint = '/api/nurseries/NurseryStampCode/nursery';
const apiNurseryDeclarantsEndpoint = '/api/nurseries/NurseryDeclarant/nursery_declarants';
const apiGetRkfDocuments = '/api/requests/get_rkf_document/getrkfdocumentrequestdocument';

const reqText = 'Обязательное поле';
const reqEmail = 'Необходимо ввести email';
const reqCheckbox = (x, v = true, o = null) => mixed().when(x, {
    is: v,
    then: o || mixed().required(reqText),
    otherwise: mixed()
})
const numbersOnly = () => string().matches(/^\d+$/, { message: 'Можно использовать только цифры' })
const reqIfCash = o => reqCheckbox('cash_payment', false, o)
const idNumber = (name, o = null) => mixed().when(name, {
    is: id => id === Number(id),
    then: o || mixed(),
    otherwise: (o || mixed()).required(reqText)
})
const lat = () => string().matches(/^[^а-я]+$/i, { message: 'Поле заполняется латиницей' })
const latOptional = () => string().matches(/^[^а-я]+$/i, { message: 'Поле заполняется латиницей', excludeEmptyString: true })
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
    stamp_code_name: string().required(reqText).matches(/^[A-Z]{3}$/, { message: 'Введите 3 латинские буквы' }),
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
    comment: string(),
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
    express: boolean(),
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
            is: v => !["2", "4"].includes(String(v)),
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
    decision_breeding_commission_document: file(),
    receipt_payment_fee_violated_breeding_document: file(),
    comment: string(),
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
        dog_name_lat: latOptional(),
        dog_color: string().required(reqText),
        dog_sex_type_id: number().required(reqText).typeError(reqText),
        stamp_number: numbersOnly().required(reqText),
        chip_number: string(),
        litter_dog_status_id: number().required(reqText).typeError(reqText),
        status_comment: string().when('litter_dog_status_id', {
            is: v => !["2", "4"].includes(String(v)),
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

const pedigreeValidationSchema = object().shape({ ...commonValidationSchema, declarants: pedigreeDeclarantsValidationSchema });
const pedigreeUpdateSchema = object().shape({ ...commonUpdateSchema, declarants: pedigreeDeclarantsUpdateSchema });

const litterValidationSchema = object().shape({ ...commonValidationSchema, declarants: litterDeclarantsValidationSchema });
const litterUpdateSchema = object().shape({ ...commonUpdateSchema, declarants: litterDeclarantsUpdateSchema });

const emptyNurseryPedigreeDeclarant = {
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

const emptyNurseryLitterDeclarant = {
    express: false,
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
    emptyNurseryPedigreeDeclarant,
    emptyNurseryLitterDeclarant,
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
    apiNurseryPedigreeDocumentEndpoint,
    apiNurseryLitterDocumentEndpoint,
    apiLitterEmptyDocument,
    apiPedigreeEverk,
    apiLitterEverk,
    apiPedigreeStatusesEndpoint,
    apiStampCodesEndpoint,
    apiNurseryDeclarantsEndpoint,
    apiGetRkfDocuments,
};

export const kennelNav = alias => [
    {
        id: 1,
        exact: true,
        title: 'Оформление документов',
        to: `/kennel/${alias}/documents`,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1738_1456)">
                <path d="M2 17.1167V5.15358C2 4.11512 2.84462 3.27051 3.88308 3.27051H13.4508C14.4892 3.27051 15.3338 4.11512 15.3338 5.15358V17.1167C15.3338 18.1551 14.4892 18.9997 13.4508 18.9997H3.88308C2.84462 18.9997 2 18.1551 2 17.1167ZM3.88308 4.65512C3.60615 4.65512 3.38462 4.87666 3.38462 5.15358V17.1167C3.38462 17.3936 3.60615 17.6151 3.88308 17.6151H13.4508C13.7277 17.6151 13.9492 17.3936 13.9492 17.1167V5.15358C13.9492 4.87666 13.7277 4.65512 13.4508 4.65512H3.88308Z" fill="#8F989D"/>
                <path d="M15.763 1H6.19526C5.14296 1 4.29834 1.84462 4.29834 2.88308V3.68615C4.29834 4.07385 4.60296 4.37846 4.99065 4.37846C5.37834 4.37846 5.68296 4.07385 5.68296 3.68615V2.88308C5.68296 2.60615 5.91834 2.38462 6.19526 2.38462H15.763C16.0399 2.38462 16.2614 2.60615 16.2614 2.88308V14.8462C16.2614 15.1231 16.0399 15.3446 15.763 15.3446H15.0983C14.7106 15.3446 14.406 15.6492 14.406 16.0369C14.406 16.4246 14.7106 16.7292 15.0983 16.7292H15.763C16.8014 16.7292 17.646 15.8846 17.646 14.8462V2.88308C17.646 1.84462 16.8014 1 15.763 1Z" fill="#8F989D"/>
                <path d="M5.25383 7.38266H12.0108C12.3984 7.38266 12.7031 7.07805 12.7031 6.69035C12.7031 6.30266 12.3984 5.99805 12.0108 5.99805H5.25383C4.86614 5.99805 4.56152 6.30266 4.56152 6.69035C4.56152 7.07805 4.86614 7.38266 5.25383 7.38266Z" fill="#8F989D"/>
                <path d="M5.25383 10.1385H12.0108C12.3984 10.1385 12.7031 9.83391 12.7031 9.44621C12.7031 9.05852 12.3846 8.75391 12.0108 8.75391H5.25383C4.86614 8.75391 4.56152 9.05852 4.56152 9.44621C4.56152 9.83391 4.86614 10.1385 5.25383 10.1385Z" fill="#8F989D"/>
                <path d="M5.25383 12.8797H12.0108C12.3984 12.8797 12.7031 12.5751 12.7031 12.1874C12.7031 11.7997 12.3984 11.4951 12.0108 11.4951H5.25383C4.86614 11.4951 4.56152 11.7997 4.56152 12.1874C4.56152 12.5751 4.86614 12.8797 5.25383 12.8797Z" fill="#8F989D"/>
            </g>
            <defs>
                <clipPath id="clip0_1738_1456">
                    <rect width="15.6462" height="18" fill="white" transform="translate(2 1)"/>
                </clipPath>
            </defs>
        </svg>
    },
    {
        id: 2,
        exact: true,
        title: 'Организационная информация',
        to: `/kennel/${alias}/documents/responsible`,
        icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 20.9001C5.54598 20.9001 1.09998 16.4541 1.09998 11.0001C1.09998 5.5461 5.54598 1.1001 11 1.1001C16.454 1.1001 20.9 5.5461 20.9 11.0001C20.9 16.4541 16.454 20.9001 11 20.9001ZM11 2.9001C6.53598 2.9001 2.89998 6.5361 2.89998 11.0001C2.89998 15.4641 6.53598 19.1001 11 19.1001C15.464 19.1001 19.1 15.4641 19.1 11.0001C19.1 6.5361 15.464 2.9001 11 2.9001Z" fill="#8F989D"/>
            <path d="M11.0001 7.16572C11.4972 7.16572 11.9001 6.76278 11.9001 6.26572C11.9001 5.76867 11.4972 5.36572 11.0001 5.36572C10.503 5.36572 10.1001 5.76867 10.1001 6.26572C10.1001 6.76278 10.503 7.16572 11.0001 7.16572Z" fill="#8F989D"/>
            <path d="M11.0001 17.5516C10.4961 17.5516 10.1001 17.1376 10.1001 16.6516V9.28965C10.1001 8.78565 10.4961 8.38965 11.0001 8.38965C11.5041 8.38965 11.9001 8.80365 11.9001 9.28965V16.6336C11.9001 17.1376 11.5041 17.5516 11.0001 17.5516Z" fill="#8F989D"/>
        </svg>
    },
    {
        id: 3,
        exact: true,
        title: 'Поиск по базе РКФ',
        to: `/base-search?nurseryAlias=${alias}`,
        icon: <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="53.21" cy="74.3" r="5" />
            <circle cx="53.21" cy="110.04" r="5" />
            <circle cx="53.21" cy="145.78" r="5" />
            <path d="M125.78,163.06c-7.41.7-16,1.13-25.78,1.13-40.7,0-60.48-7.37-62-10.51V127.37A64.27,64.27,0,0,0,52.44,132c4.09.88,8.6,1.64,13.44,2.26a45.89,45.89,0,0,1-3.67-8.58c-15.41-2.43-23.3-6-24.26-7.9V91.48A64.84,64.84,0,0,0,52.44,96.1c3.05.66,6.34,1.25,9.81,1.77a45.78,45.78,0,0,1,3.16-7.61C47.88,87.84,39,84,38,81.88V55.58A64.32,64.32,0,0,0,52.44,60.2C65.19,63,82.08,64.5,100,64.5s34.81-1.53,47.56-4.3a64.32,64.32,0,0,0,14.49-4.62v26.3c-.77,1.55-6,4.12-15.88,6.33a45.67,45.67,0,0,1,3.55,7.4,60,60,0,0,0,12.33-4.13v26.3c-.62,1.25-4.15,3.18-10.74,5-.14.57-.27,1.15-.43,1.72l5.2,5.2a45.82,45.82,0,0,0,6-2.37v8.34l8,8V46.16c0-6.17-7.35-10.77-22.49-14-12.75-2.77-29.64-4.3-47.56-4.3s-34.81,1.53-47.56,4.3C37.3,35.39,30,40,30,46.16V153.84c0,6.17,7.35,10.77,22.49,14,12.75,2.77,29.64,4.3,47.56,4.3a274.43,274.43,0,0,0,33-1.89ZM100,35.81c40,0,59.78,7.11,62,10.35-2.18,3.23-22,10.34-62,10.34S40.22,49.39,38,46.16C40.22,42.92,60,35.81,100,35.81Z" />
            <path d="m169.16 154.13-27.48-27.48a38.25 38.25 0 1 0-20.5 20.5l27.48 27.48a14.5 14.5 0 0 0 20.5-20.5zm-84.16-20.87a30.29 30.29 0 1 1 42.84 0 30.33 30.33 0 0 1-42.84 0zm48.5 5.66a38.47 38.47 0 0 0 4.19-5l3.11 3.1-9.19 9.19-3.1-3.11a39.29 39.29 0 0 0 4.94-4.18zm30 30.08a6.52 6.52 0 0 1-9.18 0l-17.1-17.1 9.18-9.18 17.1 17.1a6.52 6.52 0 0 1 0 9.18z" />
        </svg>
    },
    {
        id: 4,
        exact: true,
        title: 'Реквизиты и размеры взносов',
        to: `/bank-details`,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1738_1374)">
                <path d="M16.9268 17.2265H3.07323C1.93364 17.2265 1 16.3066 1 15.167V4.07323C1 2.93364 1.93364 2 3.07323 2H16.9405C18.0801 2 19.0137 2.93364 19.0137 4.07323V15.167C19 16.3066 18.0801 17.2265 16.9268 17.2265ZM3.07323 3.373C2.68879 3.373 2.373 3.68879 2.373 4.07323V15.167C2.373 15.5515 2.68879 15.8673 3.07323 15.8673H16.9405C17.3249 15.8673 17.6407 15.5515 17.6407 15.167V4.07323C17.627 3.68879 17.3249 3.373 16.9268 3.373H3.07323Z" fill="#8F989D"/>
                <path d="M18.2861 6.79194H1.72776C1.34332 6.79194 1.04126 6.48988 1.04126 6.10544C1.04126 5.721 1.34332 5.41895 1.72776 5.41895H18.2861C18.6706 5.41895 18.9726 5.721 18.9726 6.10544C18.9726 6.48988 18.6568 6.79194 18.2861 6.79194Z" fill="#8F989D"/>
                <path d="M18.2861 10.1005H1.72776C1.34332 10.1005 1.04126 9.79848 1.04126 9.41404C1.04126 9.0296 1.34332 8.72754 1.72776 8.72754H18.2861C18.6706 8.72754 18.9726 9.0296 18.9726 9.41404C18.9726 9.79848 18.6568 10.1005 18.2861 10.1005Z" fill="#8F989D"/>
                <path d="M5.24266 13.5332H4.14426C3.75982 13.5332 3.45776 13.2311 3.45776 12.8467C3.45776 12.4622 3.75982 12.1602 4.14426 12.1602H5.24266C5.6271 12.1602 5.92916 12.4622 5.92916 12.8467C5.92916 13.2311 5.61337 13.5332 5.24266 13.5332Z" fill="#8F989D"/>
                <path d="M8.7849 13.5332H7.6865C7.30206 13.5332 7 13.2311 7 12.8467C7 12.4622 7.30206 12.1602 7.6865 12.1602H8.7849C9.16934 12.1602 9.4714 12.4622 9.4714 12.8467C9.4714 13.2311 9.15561 13.5332 8.7849 13.5332Z" fill="#8F989D"/>
                <path d="M12.3274 13.5332H11.229C10.8445 13.5332 10.5425 13.2311 10.5425 12.8467C10.5425 12.4622 10.8445 12.1602 11.229 12.1602H12.3274C12.7118 12.1602 13.0139 12.4622 13.0139 12.8467C13.0139 13.2311 12.6981 13.5332 12.3274 13.5332Z" fill="#8F989D"/>
                <path d="M15.8696 13.5332H14.7712C14.3868 13.5332 14.0847 13.2311 14.0847 12.8467C14.0847 12.4622 14.3868 12.1602 14.7712 12.1602H15.8696C16.2541 12.1602 16.5561 12.4622 16.5561 12.8467C16.5561 13.2311 16.2403 13.5332 15.8696 13.5332Z" fill="#8F989D"/>
            </g>
            <defs>
                <clipPath id="clip0_1738_1374">
                    <rect width="18" height="15.2265" fill="white" transform="translate(1 2)"/>
                </clipPath>
            </defs>
        </svg>
    },
    {
        id: 5,
        exact: true,
        title: 'Запись на очный прием',
        to: `/kennel/${alias}/documents/bookform`,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1738_1472)">
                <path d="M13.4508 16.7292H3.88308C2.84462 16.7292 2 15.8846 2 14.8462V2.88308C2 1.84462 2.84462 1 3.88308 1H11.1938L15.3338 5.14V14.8462C15.3477 15.8846 14.5031 16.7292 13.4508 16.7292ZM3.88308 2.38462C3.60615 2.38462 3.38462 2.60615 3.38462 2.88308V14.8462C3.38462 15.1231 3.60615 15.3446 3.88308 15.3446H13.4508C13.7277 15.3446 13.9492 15.1231 13.9492 14.8462V5.72154L10.6262 2.38462H3.88308Z" fill="#8F989D"/>
                <path d="M14.6554 6.12308H12.1077C11.0692 6.12308 10.2246 5.27846 10.2246 4.24V1.69231C10.2246 1.30462 10.5292 1 10.9169 1C11.3046 1 11.6092 1.30462 11.6092 1.69231V4.24C11.6092 4.51692 11.8308 4.73846 12.1077 4.73846H14.6415C15.0292 4.73846 15.3338 5.04308 15.3338 5.43077C15.3338 5.81846 15.0292 6.12308 14.6554 6.12308Z" fill="#8F989D"/>
                <path d="M12.0108 14.0018H5.25383C4.86614 14.0018 4.56152 13.6972 4.56152 13.3095C4.56152 12.9218 4.86614 12.6172 5.25383 12.6172H12.0108C12.3984 12.6172 12.7031 12.9218 12.7031 13.3095C12.7031 13.6972 12.3846 14.0018 12.0108 14.0018Z" fill="#8F989D"/>
                <path d="M12.0108 11.2459H5.25383C4.86614 11.2459 4.56152 10.9413 4.56152 10.5536C4.56152 10.1659 4.86614 9.86133 5.25383 9.86133H12.0108C12.3984 9.86133 12.7031 10.1659 12.7031 10.5536C12.7031 10.9413 12.3846 11.2459 12.0108 11.2459Z" fill="#8F989D"/>
                <path d="M12.0108 8.50473H5.25383C4.86614 8.50473 4.56152 8.20012 4.56152 7.81242C4.56152 7.42473 4.86614 7.12012 5.25383 7.12012H12.0108C12.3984 7.12012 12.7031 7.42473 12.7031 7.81242C12.7031 8.20012 12.3846 8.50473 12.0108 8.50473Z" fill="#8F989D"/>
                <path d="M15.763 18.9997H6.19533C5.15687 18.9997 4.31226 18.1551 4.31226 17.1167V16.3136C4.31226 15.9259 4.61687 15.6213 5.00456 15.6213C5.39226 15.6213 5.69687 15.9259 5.69687 16.3136V17.1167C5.69687 17.3936 5.91841 17.6151 6.19533 17.6151H15.763C16.0399 17.6151 16.2615 17.3936 16.2615 17.1167V5.15358C16.2615 4.87666 16.0399 4.65512 15.763 4.65512H13.243C12.8553 4.65512 12.5507 4.35051 12.5507 3.96282C12.5507 3.57512 12.8553 3.27051 13.243 3.27051H15.763C16.8015 3.27051 17.6461 4.11512 17.6461 5.15358V17.1167C17.6461 18.1551 16.8015 18.9997 15.763 18.9997Z" fill="#8F989D"/>
            </g>
            <defs>
                <clipPath id="clip0_1738_1472">
                    <rect width="15.6462" height="18" fill="white" transform="translate(2 1)"/>
                </clipPath>
            </defs>
        </svg>
    },
    {
        id: 6,
        exact: true,
        title: 'Оценка Федерации',
        to: `/kennel/${alias}/documents/review`,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.07646 19L4.08995 15.7616C2.33583 15.4513 1 13.913 1 12.0645V4.76462C1 2.68666 2.68666 1 4.76462 1H14.7766C16.8546 1 18.5412 2.68666 18.5412 4.76462V12.0645C18.5412 14.1424 16.8546 15.8291 14.7766 15.8291H9.93253L4.07646 19ZM4.76462 2.34933C3.42879 2.34933 2.34933 3.42879 2.34933 4.76462V12.0645C2.34933 13.4003 3.42879 14.4798 4.76462 14.4798H5.43928V16.7331L9.5952 14.4798H14.7766C16.1124 14.4798 17.1919 13.4003 17.1919 12.0645V4.76462C17.1919 3.42879 16.1124 2.34933 14.7766 2.34933H4.76462Z" fill="#8F989D"/>
            <path d="M7.22037 13.0498C7.05845 13.0498 6.89653 12.9958 6.7616 12.9013C6.51872 12.7259 6.39728 12.4156 6.45125 12.0917L6.86954 9.67646L5.11542 7.96281C4.88603 7.74692 4.80508 7.43658 4.89953 7.13972C4.99398 6.84287 5.25035 6.64047 5.57419 6.59999L7.98948 6.24917L9.06894 4.04977C9.36579 3.45607 10.2294 3.45607 10.5262 4.04977L11.6057 6.24917L14.021 6.59999C14.3448 6.64047 14.6012 6.85637 14.6956 7.13972C14.8036 7.42308 14.7226 7.74692 14.4797 7.97631L12.7256 9.68995L13.1439 12.0917C13.1979 12.4156 13.0899 12.7259 12.8336 12.9013C12.5907 13.0902 12.2668 13.1037 11.97 12.9418L9.81107 11.8084L7.63866 12.9418C7.50373 13.0228 7.36879 13.0498 7.22037 13.0498ZM9.79758 10.4186C9.97299 10.4186 10.1349 10.4591 10.2968 10.54L11.6192 11.2417L11.3628 9.75742C11.3088 9.42008 11.4303 9.06926 11.6731 8.82638L12.7526 7.77391L11.2683 7.55802C10.9175 7.50404 10.6207 7.28815 10.4722 6.97781L9.81107 5.62848L9.1499 6.97781C8.98798 7.28815 8.69113 7.51754 8.3538 7.55802L6.86954 7.77391L7.949 8.82638C8.20537 9.06926 8.31332 9.42008 8.25935 9.77091L8.00298 11.2552L9.32531 10.5535C9.46025 10.4591 9.63566 10.4186 9.79758 10.4186Z" fill="#8F989D"/>
        </svg>
    },
    {
        id: 7,
        exact: true,
        title: 'Страница питомника',
        to: `/kennel/${alias}`,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1736_1155)">
                <path d="M16.9231 18.6154H3.07692C1.92769 18.6154 1 17.6185 1 16.4V4.21538C1 2.99692 1.92769 2 3.07692 2H16.9231C18.0723 2 19 2.99692 19 4.21538V16.4C19 17.6185 18.0723 18.6154 16.9231 18.6154ZM3.07692 3.38462C2.68923 3.38462 2.38462 3.75846 2.38462 4.21538V16.4C2.38462 16.8569 2.68923 17.2308 3.07692 17.2308H16.9231C17.3108 17.2308 17.6154 16.8569 17.6154 16.4V4.21538C17.6154 3.75846 17.3108 3.38462 16.9231 3.38462H3.07692Z" fill="#8F989D"/>
                <path d="M18.3077 8.17563H1.69231C1.30462 8.17563 1 7.87102 1 7.48332C1 7.09563 1.30462 6.79102 1.69231 6.79102H18.3077C18.6954 6.79102 19 7.09563 19 7.48332C19 7.87102 18.6954 8.17563 18.3077 8.17563Z" fill="#8F989D"/>
                <path d="M15.4691 11.1112H4.33684C3.94915 11.1112 3.64453 10.8066 3.64453 10.4189C3.64453 10.0312 3.94915 9.72656 4.33684 9.72656H15.4691C15.8568 9.72656 16.1615 10.0312 16.1615 10.4189C16.1615 10.8066 15.8568 11.1112 15.4691 11.1112Z" fill="#8F989D"/>
                <path d="M15.4691 14.0877H4.33684C3.94915 14.0877 3.64453 13.7831 3.64453 13.3954C3.64453 13.0077 3.94915 12.7031 4.33684 12.7031H15.4691C15.8568 12.7031 16.1615 13.0077 16.1615 13.3954C16.1615 13.7831 15.8568 14.0877 15.4691 14.0877Z" fill="#8F989D"/>
                <path d="M15.843 5.794C16.2942 5.794 16.66 5.42825 16.66 4.97708C16.66 4.52591 16.2942 4.16016 15.843 4.16016C15.3919 4.16016 15.0261 4.52591 15.0261 4.97708C15.0261 5.42825 15.3919 5.794 15.843 5.794Z" fill="#8F989D"/>
                <path d="M13.3924 5.794C13.8435 5.794 14.2093 5.42825 14.2093 4.97708C14.2093 4.52591 13.8435 4.16016 13.3924 4.16016C12.9412 4.16016 12.5754 4.52591 12.5754 4.97708C12.5754 5.42825 12.9412 5.794 13.3924 5.794Z" fill="#8F989D"/>
                <path d="M10.9417 5.794C11.3929 5.794 11.7586 5.42825 11.7586 4.97708C11.7586 4.52591 11.3929 4.16016 10.9417 4.16016C10.4905 4.16016 10.1248 4.52591 10.1248 4.97708C10.1248 5.42825 10.4905 5.794 10.9417 5.794Z" fill="#8F989D"/>
            </g>
            <defs>
                <clipPath id="clip0_1736_1155">
                    <rect width="18" height="16.6154" fill="white" transform="translate(1 2)"/>
                </clipPath>
            </defs>
        </svg>
    }
];