import {object, string} from "yup";

export const defaultReduxKey = 'legal_info';
export const endpointUrl = '/api/club/Legal';


export const clubLegalInfoFormConfig = {
    formAction: endpointUrl,
    fields: {
        clubLegalInfo_id: {
            name: 'clubLegalInfo_id'

        },
        name: {
            name: 'name',
            label: 'name клуба',
        },
        owner_name: {
            name: 'owner_name',
            label: 'owner_name клуба',
        },
        address: {
            name: 'address',
            label: 'Адрес клуба',
        },
        inn: {
            name: 'inn',
            label: 'inn клуба',
        },
        kpp: {
            name: 'kpp',
            label: 'kpp клуба',
        },
        ogrn: {
            name: 'ogrn',
            label: 'ogrn клуба',
        },
        okpo: {
            name: 'okpo',
            label: 'okpo клуба',
        },
        registration_number: {
            name: 'registration_number',
            label: 'registration_number клуба',
        },
        registration_date: {
            name: 'registration_date',
            label: 'registration_date клуба',
        },
        is_public: {
            name: 'is_public',
            label: 'is_public клуба',
        },
    },
    validationSchema: object().shape({
        //
    })
};