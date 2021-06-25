import { object, string, array, number, boolean, mixed } from "yup";
import React from "react";

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

export const clubNav = alias => {
    const isFederation = alias === 'rkf' || alias === 'rfss' || alias === 'rfls' || alias === 'rfos' || alias === 'oankoo' || alias === 'rkf-online';


    return [
        {
            id: 1,
            exact: true,
            title: 'Оформление документов',
            to: `/${alias}/documents`,
            icon: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="m24.7 10.9v7.2h50.3v64.1h7.2v-71.3h-57.5z" />
                <path d="M17.8,89.1h52.7V22.7H17.8V89.1z M29.2,36.4H59V41H29.2V36.4z M29.2,47.9H59v4.6H29.2V47.9z M29.2,59.3H59v4.6H29.2V59.3z M29.2,70.8H59v4.6H29.2V70.8z" />
            </svg>
        },
        {
            id: 2,
            exact: true,
            title: 'Организационная информация',
            to: `/${alias}/documents/responsible`,
            icon: <svg viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg">
                <path d="m255 0c-140.25 0-255 114.75-255 255s114.75 255 255 255 255-114.75 255-255-114.75-255-255-255zm25.5 382.5h-51v-153h51v153zm0-204h-51v-51h51v51z" />
            </svg>
        },
        {
            id: 3,
            exact: true,
            title: 'Клейма',
            to: `/${alias}/documents/stamps`,
            icon: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="8.11" y="16.76" width="10.25" height="66.49" />
                <rect x="38.61" y="16.76" width="13.59" height="66.49" />
                <rect x="78.3" y="16.76" width="13.59" height="66.49" />
                <rect x="22.84" y="16.76" width="5.14" height="66.49" />
                <rect x="65.03" y="16.76" width="5.14" height="66.49" />
            </svg>
        },
        {
            id: 4,
            exact: true,
            title: 'Проведение выставок',
            to: `/${alias}/documents/exhibitions`,
            icon: <svg viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6443 15.7118L12.6695 14.0479L14.5196 13.4174L14.7245 11.4744L16.1164 10.1042L15.4543 8.26456L16.1164 6.42552L14.7245 5.0553L14.5196 3.11176L12.6695 2.48124L11.6449 0.817348L9.70601 1.05146L8.05847 0L6.41093 1.05146L4.47206 0.817348L3.44687 2.48124L1.59675 3.11176L1.39183 5.0553L0 6.42494L0.662052 8.26456L0 10.1036L1.39183 11.4738L1.59675 13.4168L3.44687 14.0479L4.47206 15.7112L6.41093 15.4771L8.05847 16.528L9.70543 15.4771L11.6443 15.7118ZM2.39133 8.26456C2.39133 5.13937 4.93386 2.59742 8.05847 2.59742C11.1831 2.59742 13.7256 5.13995 13.7256 8.26456C13.7256 11.3892 11.1831 13.9317 8.05847 13.9317C4.93386 13.9317 2.39133 11.3892 2.39133 8.26456Z" />
                <path d="M8.05853 3.91162C5.65845 3.91162 3.70557 5.8645 3.70557 8.26459C3.70557 10.6647 5.65845 12.617 8.05853 12.617C10.4586 12.617 12.4115 10.6641 12.4115 8.26459C12.4115 5.8645 10.4586 3.91162 8.05853 3.91162Z" />
                <path d="M6.10082 16.8393L3.79414 17.1178L2.57512 15.1398L2.16061 14.9985L1.11499 18.1652L4.33184 17.9883L6.84869 19.9995L7.58956 17.7892L6.10082 16.8393Z" />
                <path d="M13.541 15.1397L12.322 17.1177L10.0154 16.8392L8.52661 17.7891L9.26748 20L11.7843 17.9888L15.0018 18.1657L13.9556 14.999L13.541 15.1397Z" />
            </svg>
        },
        // {
        //     id: 5,
        //     exact: true,
        //     title: 'Отчеты',
        //     to: `/`,
        //     disabled: true,
        //     icon: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        //         <polygon points="60.41 8.36 60.41 29.18 81.23 29.18" />
        //         <path d="m55.21 34.38v-26.02h-36.45v83.29h62.48v-57.27h-26.03zm-15.62 46.85h-10.41v-15.61h10.41v15.61zm15.62 0h-10.42v-26.02h10.41v26.02zm15.61 0h-10.41v-36.44h10.41v36.44z" />
        //     </svg>
        // },
        {
            id: 6,
            exact: true,
            title: 'Поиск по базе РКФ',
            to: `/base-search?clubAlias=${alias}`,
            icon: <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="53.21" cy="74.3" r="5" />
                <circle cx="53.21" cy="110.04" r="5" />
                <circle cx="53.21" cy="145.78" r="5" />
                <path d="M125.78,163.06c-7.41.7-16,1.13-25.78,1.13-40.7,0-60.48-7.37-62-10.51V127.37A64.27,64.27,0,0,0,52.44,132c4.09.88,8.6,1.64,13.44,2.26a45.89,45.89,0,0,1-3.67-8.58c-15.41-2.43-23.3-6-24.26-7.9V91.48A64.84,64.84,0,0,0,52.44,96.1c3.05.66,6.34,1.25,9.81,1.77a45.78,45.78,0,0,1,3.16-7.61C47.88,87.84,39,84,38,81.88V55.58A64.32,64.32,0,0,0,52.44,60.2C65.19,63,82.08,64.5,100,64.5s34.81-1.53,47.56-4.3a64.32,64.32,0,0,0,14.49-4.62v26.3c-.77,1.55-6,4.12-15.88,6.33a45.67,45.67,0,0,1,3.55,7.4,60,60,0,0,0,12.33-4.13v26.3c-.62,1.25-4.15,3.18-10.74,5-.14.57-.27,1.15-.43,1.72l5.2,5.2a45.82,45.82,0,0,0,6-2.37v8.34l8,8V46.16c0-6.17-7.35-10.77-22.49-14-12.75-2.77-29.64-4.3-47.56-4.3s-34.81,1.53-47.56,4.3C37.3,35.39,30,40,30,46.16V153.84c0,6.17,7.35,10.77,22.49,14,12.75,2.77,29.64,4.3,47.56,4.3a274.43,274.43,0,0,0,33-1.89ZM100,35.81c40,0,59.78,7.11,62,10.35-2.18,3.23-22,10.34-62,10.34S40.22,49.39,38,46.16C40.22,42.92,60,35.81,100,35.81Z" />
                <path d="m169.16 154.13-27.48-27.48a38.25 38.25 0 1 0-20.5 20.5l27.48 27.48a14.5 14.5 0 0 0 20.5-20.5zm-84.16-20.87a30.29 30.29 0 1 1 42.84 0 30.33 30.33 0 0 1-42.84 0zm48.5 5.66a38.47 38.47 0 0 0 4.19-5l3.11 3.1-9.19 9.19-3.1-3.11a39.29 39.29 0 0 0 4.94-4.18zm30 30.08a6.52 6.52 0 0 1-9.18 0l-17.1-17.1 9.18-9.18 17.1 17.1a6.52 6.52 0 0 1 0 9.18z" />
            </svg>
        },
        {
            id: 7,
            exact: true,
            title: 'Реквизиты и размеры взносов',
            to: `/bank-details`,
            disabled: isFederation,
            icon: <svg viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H18V12H0V0ZM9 3C9.79565 3 10.5587 3.31607 11.1213 3.87868C11.6839 4.44129 12 5.20435 12 6C12 6.79565 11.6839 7.55871 11.1213 8.12132C10.5587 8.68393 9.79565 9 9 9C8.20435 9 7.44129 8.68393 6.87868 8.12132C6.31607 7.55871 6 6.79565 6 6C6 5.20435 6.31607 4.44129 6.87868 3.87868C7.44129 3.31607 8.20435 3 9 3ZM4 2C4 2.53043 3.78929 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4V8C2.53043 8 3.03914 8.21071 3.41421 8.58579C3.78929 8.96086 4 9.46957 4 10H14C14 9.46957 14.2107 8.96086 14.5858 8.58579C14.9609 8.21071 15.4696 8 16 8V4C15.4696 4 14.9609 3.78929 14.5858 3.41421C14.2107 3.03914 14 2.53043 14 2H4Z" />
            </svg>
        },
        {
            id: 8,
            exact: true,
            title: 'Запись на очный прием',
            to: `/${alias}/documents/bookform`,
            icon: <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M116.59.1,53.05,63.63h63.54Z" />
                <path d="M383.84,0H146.59V93.64H53V436.8H383.84V0ZM322.06,289.84H114.74v-30H322.06Zm0-63.74H114.74v-30H322.06Zm0-63.73H114.74v-30H322.06Z" />
                <path d="M413.84,75.2V466.8H128.16V512H459V75.2Z" />
            </svg>

        },
        {
            id: 9,
            exact: true,
            title: 'Оценка Федерации',
            to: `/${alias}/documents/review`,
            icon: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="m37.97 36.86c-2.01-2.01-4.74-3.15-7.58-3.14-5.92 0-10.73 4.8-10.73 10.72s4.8 10.73 10.72 10.73 10.73-4.8 10.73-10.72c0-2.85-1.13-5.57-3.14-7.59z" />
                <path d="m30.96 58.67h-1.14c-12.03 0.03-21.77 9.77-21.8 21.8v1.54c0 0.85 0.69 1.53 1.53 1.53h41.68c0.85 0 1.53-0.69 1.53-1.53v-1.54c-0.04-12.02-9.77-21.76-21.8-21.8z" />
                <path d="m84.71 21.65c-4.96-3.47-10.89-5.29-16.95-5.2-6.06-0.1-11.99 1.72-16.95 5.2-4.5 3.31-7.28 7.92-7.28 13.06 0.01 2.32 0.58 4.61 1.66 6.66 0.97 1.83 2.24 3.48 3.77 4.87l-3.85 7.99c-0.37 0.76-0.05 1.67 0.7 2.03 0.47 0.23 1.03 0.2 1.48-0.08l8.84-5.46c1.68 0.69 3.42 1.21 5.2 1.58 2.11 0.43 4.26 0.65 6.41 0.65 6.06 0.1 11.99-1.72 16.95-5.2 4.5-3.31 7.28-7.92 7.28-13.06s-2.77-9.72-7.26-13.04zm-5.47 10.6v0.01c-0.06 0.27-0.19 0.51-0.38 0.71l-3.93 4.5 0.52 6.04c0.07 0.84-0.55 1.58-1.39 1.66-0.29 0.03-0.59-0.03-0.85-0.17l-5.46-2.3-5.58 2.37c-0.77 0.33-1.67-0.02-2-0.8-0.1-0.23-0.14-0.49-0.12-0.74l0.52-6.04-3.97-4.6c-0.55-0.64-0.48-1.61 0.17-2.16 0.19-0.16 0.41-0.27 0.64-0.33l5.9-1.37 3.12-5.15c0.43-0.73 1.37-0.96 2.1-0.53 0.22 0.13 0.4 0.31 0.53 0.53l3.11 5.17 5.9 1.37c0.83 0.19 1.35 1 1.17 1.83z" />
            </svg>
        },
        {
            id: 10,
            exact: true,
            title: `Страница ${isFederation ? `федерации` : `клуба`}`,
            to: `/${alias}`,
            icon: <svg viewBox="0 0 512 412" xmlns="http://www.w3.org/2000/svg">
                <path transform="translate(0 -50)" d="M497,50H15A15,15,0,0,0,0,65v45H512V65A15,15,0,0,0,497,50Z" />
                <path transform="translate(0 -50)" d="m0 140v307a15 15 0 0 0 15 15h482a15 15 0 0 0 15-15v-307zm116 58.5a20 20 0 1 1-20 20 20 20 0 0 1 20-20zm-20 90h160a15 15 0 0 1 0 30h-160a15 15 0 0 1 0-30zm320 115h-320a15 15 0 0 1 0-30h320a15 15 0 0 1 0 30zm-110-100a20 20 0 1 1 20 20 20 20 0 0 1-20-20zm70 0a20 20 0 1 1 20 20 20 20 0 0 1-20-20zm40-70h-230a15 15 0 0 1 0-30h230a15 15 0 0 1 0 30z" />
            </svg>
        }
    ]
};