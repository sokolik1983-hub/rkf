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
const apiClubApplicationFormEndpoint = '/api/requests/get_rkf_document/getrkfdocumentrequestdocument';

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
    apiClubDeclarantsEndpoint,
    apiClubApplicationFormEndpoint,
};

export const clubNav = alias => {
    const isFederation = alias === 'rkf' || alias === 'rfss' || alias === 'rfls' || alias === 'rfos' || alias === 'oankoo' || alias === 'rkf-online';


    return [
        {
            id: 1,
            exact: true,
            title: 'Оформление документов',
            to: `/${alias}/documents`,
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
            to: `/${alias}/documents/responsible`,
            icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 20.9001C5.54598 20.9001 1.09998 16.4541 1.09998 11.0001C1.09998 5.5461 5.54598 1.1001 11 1.1001C16.454 1.1001 20.9 5.5461 20.9 11.0001C20.9 16.4541 16.454 20.9001 11 20.9001ZM11 2.9001C6.53598 2.9001 2.89998 6.5361 2.89998 11.0001C2.89998 15.4641 6.53598 19.1001 11 19.1001C15.464 19.1001 19.1 15.4641 19.1 11.0001C19.1 6.5361 15.464 2.9001 11 2.9001Z" fill="#8F989D"/>
                <path d="M11.0001 7.16572C11.4972 7.16572 11.9001 6.76278 11.9001 6.26572C11.9001 5.76867 11.4972 5.36572 11.0001 5.36572C10.503 5.36572 10.1001 5.76867 10.1001 6.26572C10.1001 6.76278 10.503 7.16572 11.0001 7.16572Z" fill="#8F989D"/>
                <path d="M11.0001 17.5516C10.4961 17.5516 10.1001 17.1376 10.1001 16.6516V9.28965C10.1001 8.78565 10.4961 8.38965 11.0001 8.38965C11.5041 8.38965 11.9001 8.80365 11.9001 9.28965V16.6336C11.9001 17.1376 11.5041 17.5516 11.0001 17.5516Z" fill="#8F989D"/>
            </svg>
        },
        {
            id: 3,
            exact: true,
            title: 'Клейма',
            to: `/${alias}/documents/stamps`,
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.73149 16.1668C2.32186 16.1668 2 15.845 2 15.4353V3.73149C2 3.32186 2.32186 3 2.73149 3C3.14112 3 3.46298 3.32186 3.46298 3.73149V15.4353C3.46298 15.845 3.14112 16.1668 2.73149 16.1668Z" fill="#8F989D"/>
                <path d="M12.7823 16.1668C12.3726 16.1668 12.0508 15.845 12.0508 15.4353V3.73149C12.0508 3.32186 12.3873 3 12.7823 3C13.1773 3 13.5138 3.32186 13.5138 3.73149V15.4353C13.5138 15.845 13.1919 16.1668 12.7823 16.1668Z" fill="#8F989D"/>
                <path d="M15.5323 16.1668C15.1226 16.1668 14.8008 15.845 14.8008 15.4353V3.73149C14.8008 3.32186 15.1226 3 15.5323 3C15.9419 3 16.2638 3.32186 16.2638 3.73149V15.4353C16.2638 15.845 15.9273 16.1668 15.5323 16.1668Z" fill="#8F989D"/>
                <path d="M6.3892 16.1668C5.9942 16.1668 5.65771 15.845 5.65771 15.4353V3.73149C5.65771 3.32186 5.9942 3 6.3892 3C6.79884 3 7.12069 3.32186 7.12069 3.73149V15.4353C7.12069 15.845 6.79884 16.1668 6.3892 16.1668Z" fill="#8F989D"/>
                <path d="M9.12456 16.1668C8.71492 16.1668 8.39307 15.845 8.39307 15.4353V3.73149C8.39307 3.32186 8.72955 3 9.12456 3C9.53419 3 9.85605 3.32186 9.85605 3.73149V15.4353C9.85605 15.845 9.53419 16.1668 9.12456 16.1668Z" fill="#8F989D"/>
                <path d="M18.2686 16.1668C17.859 16.1668 17.5371 15.845 17.5371 15.4353V3.73149C17.5371 3.32186 17.859 3 18.2686 3C18.6782 3 19.0001 3.32186 19.0001 3.73149V15.4353C19.0001 15.845 18.6636 16.1668 18.2686 16.1668Z" fill="#8F989D"/>
            </svg>
        },
        {
            id: 4,
            exact: true,
            title: 'Проведение выставок',
            to: `/${alias}/documents/exhibitions`,
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0074 13.9357C7.83677 13.9357 6.07959 12.1638 6.07959 10.0079C6.07959 7.85202 7.85153 6.08008 10.0074 6.08008C12.1633 6.08008 13.9352 7.85202 13.9352 10.0079C13.9352 12.1638 12.178 13.9357 10.0074 13.9357ZM10.0074 7.5567C8.64891 7.5567 7.55621 8.66416 7.55621 10.0079C7.55621 11.3516 8.64891 12.4591 10.0074 12.4591C11.3659 12.4591 12.4586 11.3664 12.4586 10.0079C12.4586 8.6494 11.3659 7.5567 10.0074 7.5567Z" fill="#8F989D"/>
                <path d="M10.0074 19.0148C9.22477 19.0148 8.81132 18.2617 8.45693 17.612C8.36834 17.4495 8.22067 17.1838 8.11731 17.0509C7.95488 17.1247 7.68909 17.2871 7.51189 17.3905C6.87695 17.7744 6.16817 18.2026 5.50369 17.8187C4.82445 17.4348 4.85398 16.5931 4.86874 15.84C4.86874 15.6481 4.88351 15.338 4.85398 15.1608C4.67678 15.1313 4.38146 15.146 4.17473 15.146C3.43642 15.1608 2.59475 15.1903 2.19606 14.5111C1.82691 13.8466 2.25513 13.1378 2.63905 12.5029C2.74241 12.3257 2.90484 12.0599 2.97867 11.8975C2.83101 11.7941 2.57998 11.6464 2.41756 11.5578C1.75308 11.2034 1 10.79 1 10.0074C1 9.22477 1.75308 8.81132 2.40279 8.45693C2.56522 8.36834 2.83101 8.22067 2.9639 8.11731C2.90484 7.95488 2.74241 7.68909 2.63905 7.51189C2.25513 6.87695 1.82691 6.16817 2.21083 5.50369C2.59475 4.82445 3.43642 4.85398 4.1895 4.86874C4.38146 4.86874 4.69155 4.88351 4.86874 4.85398C4.88351 4.67678 4.88351 4.36669 4.88351 4.17473C4.86875 3.43642 4.83921 2.59475 5.51846 2.19606C6.16817 1.82691 6.87695 2.25513 7.51189 2.63905C7.68909 2.74241 7.95488 2.90484 8.11731 2.97867C8.22067 2.83101 8.36834 2.57998 8.45693 2.41756C8.81132 1.75308 9.22477 1 10.0074 1C10.79 1 11.2034 1.75308 11.5578 2.40279C11.6464 2.56522 11.7941 2.83101 11.8975 2.9639C12.0747 2.90484 12.3257 2.74241 12.5029 2.63905C13.1378 2.25513 13.8466 1.82691 14.5111 2.21083C15.1903 2.59475 15.1608 3.43642 15.146 4.1895C15.146 4.38146 15.1313 4.69155 15.1608 4.86874C15.338 4.88351 15.6481 4.88351 15.84 4.88351C16.5783 4.86875 17.42 4.83921 17.8039 5.51846C18.1879 6.18294 17.7596 6.90648 17.3757 7.52666C17.2724 7.70386 17.1099 7.96965 17.0361 8.13208C17.1838 8.23544 17.4348 8.3831 17.5972 8.4717C18.2617 8.82609 19 9.23954 19 10.0222C19 10.8048 18.2469 11.2182 17.5972 11.5726C17.4348 11.6612 17.169 11.8089 17.0361 11.9122C17.1099 12.0747 17.2724 12.3404 17.3757 12.5176C17.7596 13.1526 18.1879 13.8614 17.8039 14.5258C17.42 15.2051 16.5636 15.1756 15.8253 15.1608C15.6333 15.1608 15.3232 15.146 15.146 15.1756C15.1313 15.3527 15.1313 15.6628 15.1313 15.8548C15.146 16.5931 15.1756 17.4348 14.4963 17.8335C13.8318 18.2174 13.1083 17.7892 12.4881 17.4053C12.3109 17.3019 12.0451 17.1395 11.8827 17.0656C11.7793 17.2133 11.6317 17.4643 11.5431 17.6267C11.2034 18.2617 10.79 19.0148 10.0074 19.0148ZM8.20591 15.5299C8.30927 15.5299 8.41263 15.5447 8.516 15.5742C9.10665 15.7367 9.4315 16.3273 9.74159 16.9032C9.81542 17.0361 9.90402 17.2133 10.0074 17.361C10.096 17.2133 10.1993 17.0361 10.2732 16.9032C10.5833 16.3273 10.9081 15.7367 11.4988 15.5742C12.1042 15.4118 12.6948 15.7662 13.2707 16.1206C13.3888 16.1944 13.5365 16.283 13.6694 16.3568C13.6694 16.1944 13.6694 16.0172 13.6694 15.8696C13.6546 15.2051 13.6399 14.5258 14.0829 14.0829C14.5258 13.6399 15.2051 13.6546 15.8696 13.6694C16.0025 13.6694 16.1944 13.6694 16.3568 13.6694C16.283 13.5365 16.1944 13.3741 16.1206 13.2559C15.7662 12.6948 15.4118 12.1042 15.5742 11.4988C15.7367 10.9081 16.3273 10.5833 16.9032 10.2732C17.0361 10.1993 17.2133 10.1107 17.361 10.0074C17.2133 9.91879 17.0361 9.81542 16.9032 9.74159C16.3273 9.4315 15.7367 9.10665 15.5742 8.516C15.4118 7.91058 15.7662 7.31993 16.1206 6.74405C16.1944 6.62592 16.283 6.47826 16.3568 6.34537C16.1944 6.34537 16.0172 6.34537 15.8696 6.34537C15.2051 6.36013 14.5258 6.3749 14.0829 5.93191C13.6399 5.48893 13.6546 4.80968 13.6694 4.1452C13.6694 4.01231 13.6842 3.82034 13.6694 3.65792C13.5365 3.73175 13.3741 3.82034 13.2707 3.89418C12.6948 4.24856 12.1042 4.60295 11.4988 4.44053C10.9081 4.2781 10.5833 3.68745 10.2732 3.11157C10.1993 2.97867 10.096 2.80148 10.0074 2.65381C9.91879 2.80148 9.81542 2.97867 9.74159 3.11157C9.4315 3.68745 9.10665 4.2781 8.516 4.44053C7.91058 4.60295 7.31993 4.24856 6.74405 3.89418C6.62592 3.83511 6.47826 3.73175 6.34537 3.65792C6.34537 3.82034 6.34537 3.99754 6.34537 4.1452C6.36013 4.80968 6.3749 5.50369 5.93191 5.93191C5.48893 6.3749 4.79491 6.36013 4.1452 6.34537C4.01231 6.34537 3.82034 6.34537 3.65792 6.34537C3.73175 6.47826 3.82034 6.64069 3.89418 6.74405C4.24856 7.31993 4.60295 7.91058 4.44053 8.516C4.2781 9.10665 3.68745 9.4315 3.11157 9.74159C2.97867 9.81542 2.80148 9.91879 2.65381 10.0074C2.80148 10.096 2.97867 10.1993 3.11157 10.2732C3.68745 10.5833 4.2781 10.9081 4.44053 11.4988C4.60295 12.1042 4.24856 12.6948 3.89418 13.2707C3.83511 13.3888 3.73175 13.5365 3.65792 13.6694C3.82034 13.6694 4.01231 13.6694 4.1452 13.6694C4.80968 13.6546 5.48893 13.6399 5.93191 14.0829C6.3749 14.5258 6.36013 15.2051 6.34537 15.8696C6.34537 16.0025 6.3306 16.1944 6.34537 16.3568C6.47826 16.283 6.64069 16.1944 6.74405 16.1206C7.21657 15.8253 7.70386 15.5299 8.20591 15.5299ZM17.5824 10.1846H17.5972H17.5824Z" fill="#8F989D"/>
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
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0279 16.2199C7.60483 16.2199 5.63867 14.2537 5.63867 11.8306C5.63867 9.40756 7.60483 7.44141 10.0279 7.44141C12.451 7.44141 14.4171 9.42141 14.4171 11.8306C14.4171 14.2399 12.451 16.2199 10.0279 16.2199ZM10.0279 8.82602C8.36636 8.82602 7.02329 10.1691 7.02329 11.8306C7.02329 13.4922 8.36636 14.8353 10.0279 14.8353C11.6894 14.8353 13.0325 13.4922 13.0325 11.8306C13.0325 10.1691 11.6894 8.82602 10.0279 8.82602Z" fill="#8F989D"/>
                <path d="M15.6217 18.1167C15.4417 18.1167 15.2617 18.0475 15.137 17.909L12.2155 15.0013C11.9386 14.7244 11.9386 14.2952 12.2155 14.0182C12.4924 13.7413 12.9217 13.7413 13.1986 14.0182L16.1201 16.9398C16.397 17.2167 16.397 17.6459 16.1201 17.9229C15.9817 18.0475 15.8017 18.1167 15.6217 18.1167Z" fill="#8F989D"/>
                <path d="M10 6.36154C7.3 6.36154 1 6.15385 1 4.18769C1 2.20769 7.3 2 10 2C12.7 2 19 2.20769 19 4.18769C19 6.15385 12.7 6.36154 10 6.36154ZM2.74462 4.18769C3.71385 4.54769 6.15077 4.99077 10 4.99077C13.8492 4.99077 16.3 4.54769 17.2554 4.18769C16.3 3.82769 13.8492 3.38462 10 3.38462C6.15077 3.38462 3.7 3.82769 2.74462 4.18769Z" fill="#8F989D"/>
                <path d="M15.8155 9.97501C15.4832 9.97501 15.1924 9.73962 15.137 9.40732C15.0678 9.03347 15.317 8.67347 15.7047 8.60424C17.0478 8.36886 17.5186 8.11962 17.6432 8.03655C17.7262 7.74578 17.9893 7.53809 18.3078 7.53809C18.6955 7.53809 19.0001 7.8427 19.0001 8.23039C19.0001 9.07501 18.0862 9.60116 15.9401 9.97501C15.8986 9.97501 15.857 9.97501 15.8155 9.97501Z" fill="#8F989D"/>
                <path d="M4.18462 9.97501C4.14308 9.97501 4.10154 9.97501 4.06 9.96116C1.91385 9.58732 1 9.07501 1 8.23039C1 7.8427 1.30462 7.53809 1.69231 7.53809C2.01077 7.53809 2.27385 7.74578 2.35692 8.03655C2.49538 8.11962 2.95231 8.36886 4.29538 8.60424C4.66923 8.67347 4.91846 9.03347 4.86308 9.40732C4.80769 9.73962 4.51692 9.97501 4.18462 9.97501Z" fill="#8F989D"/>
                <path d="M15.9815 13.9903C15.6492 13.9903 15.3584 13.7549 15.3031 13.4226C15.2338 13.0487 15.4831 12.6887 15.8569 12.6195C17.0754 12.398 17.5184 12.1626 17.6431 12.0795C17.7261 11.7887 17.9892 11.5811 18.3077 11.5811C18.6954 11.5811 19 11.8857 19 12.2734C19 13.1041 18.1415 13.6164 16.1061 13.9903C16.0646 13.9903 16.0231 13.9903 15.9815 13.9903Z" fill="#8F989D"/>
                <path d="M4.18462 14.0182C4.14308 14.0182 4.10154 14.0182 4.06 14.0043C1.91385 13.6305 1 13.1043 1 12.2597C1 11.872 1.30462 11.5674 1.69231 11.5674C2.01077 11.5674 2.27385 11.7751 2.35692 12.0658C2.49538 12.1489 2.95231 12.3982 4.29538 12.6335C4.68308 12.7166 4.93231 13.0766 4.86308 13.4505C4.80769 13.7828 4.51692 14.0182 4.18462 14.0182Z" fill="#8F989D"/>
                <path d="M10 18.4905C7.3 18.4905 1 18.2828 1 16.3028V4.18742C1 3.79973 1.30462 3.49512 1.69231 3.49512C2.08 3.49512 2.38462 3.79973 2.38462 4.18742V16.1505C2.93846 16.5105 5.51385 17.1197 10 17.1197C10.9831 17.1197 11.9523 17.092 12.88 17.0228C13.2538 17.009 13.5862 17.2859 13.6138 17.6736C13.6415 18.0613 13.3508 18.3797 12.9631 18.4074C12.0215 18.4628 11.0108 18.4905 10 18.4905Z" fill="#8F989D"/>
                <path d="M17.7262 17.549C17.4631 17.549 17.2139 17.3967 17.0892 17.1474C16.9369 16.8013 17.0892 16.3859 17.4354 16.2336C17.5185 16.192 17.5739 16.1643 17.6154 16.1367V4.18742C17.6154 3.79973 17.92 3.49512 18.3077 3.49512C18.6954 3.49512 19 3.79973 19 4.18742V16.3167C19 16.8013 18.6677 17.2028 18.0031 17.4936C17.9062 17.5351 17.8092 17.549 17.7262 17.549Z" fill="#8F989D"/>
            </svg>
        },
        {
            id: 7,
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
            id: 8,
            exact: true,
            title: 'Запись на очный прием',
            to: `/${alias}/documents/bookform`,
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
            id: 9,
            exact: true,
            title: 'Оценка Федерации',
            to: `/${alias}/documents/review`,
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.07646 19L4.08995 15.7616C2.33583 15.4513 1 13.913 1 12.0645V4.76462C1 2.68666 2.68666 1 4.76462 1H14.7766C16.8546 1 18.5412 2.68666 18.5412 4.76462V12.0645C18.5412 14.1424 16.8546 15.8291 14.7766 15.8291H9.93253L4.07646 19ZM4.76462 2.34933C3.42879 2.34933 2.34933 3.42879 2.34933 4.76462V12.0645C2.34933 13.4003 3.42879 14.4798 4.76462 14.4798H5.43928V16.7331L9.5952 14.4798H14.7766C16.1124 14.4798 17.1919 13.4003 17.1919 12.0645V4.76462C17.1919 3.42879 16.1124 2.34933 14.7766 2.34933H4.76462Z" fill="#8F989D"/>
                <path d="M7.22037 13.0498C7.05845 13.0498 6.89653 12.9958 6.7616 12.9013C6.51872 12.7259 6.39728 12.4156 6.45125 12.0917L6.86954 9.67646L5.11542 7.96281C4.88603 7.74692 4.80508 7.43658 4.89953 7.13972C4.99398 6.84287 5.25035 6.64047 5.57419 6.59999L7.98948 6.24917L9.06894 4.04977C9.36579 3.45607 10.2294 3.45607 10.5262 4.04977L11.6057 6.24917L14.021 6.59999C14.3448 6.64047 14.6012 6.85637 14.6956 7.13972C14.8036 7.42308 14.7226 7.74692 14.4797 7.97631L12.7256 9.68995L13.1439 12.0917C13.1979 12.4156 13.0899 12.7259 12.8336 12.9013C12.5907 13.0902 12.2668 13.1037 11.97 12.9418L9.81107 11.8084L7.63866 12.9418C7.50373 13.0228 7.36879 13.0498 7.22037 13.0498ZM9.79758 10.4186C9.97299 10.4186 10.1349 10.4591 10.2968 10.54L11.6192 11.2417L11.3628 9.75742C11.3088 9.42008 11.4303 9.06926 11.6731 8.82638L12.7526 7.77391L11.2683 7.55802C10.9175 7.50404 10.6207 7.28815 10.4722 6.97781L9.81107 5.62848L9.1499 6.97781C8.98798 7.28815 8.69113 7.51754 8.3538 7.55802L6.86954 7.77391L7.949 8.82638C8.20537 9.06926 8.31332 9.42008 8.25935 9.77091L8.00298 11.2552L9.32531 10.5535C9.46025 10.4591 9.63566 10.4186 9.79758 10.4186Z" fill="#8F989D"/>
            </svg>
        },
        {
            id: 10,
            exact: true,
            title: `Страница ${isFederation ? `федерации` : `клуба`}`,
            to: `${!isFederation ? '/club' : ''}/${alias}`,
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
    ]
};