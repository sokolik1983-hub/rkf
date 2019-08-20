import {object, string} from "yup";

export const defaultReduxKey = 'legal_info';
export const endpointUrl = '/api/clubs/Legal';


export const clubLegalInfoFormConfig = {
    action: endpointUrl,
    method: 'PUT',
    fields: {
        name: {
            name: 'name',
            label: 'Наименование юр. лица',
        },
        owner_name: {
            name: 'owner_name',
            label: 'Имя владельца',
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
        name: string()
            .required('Поле не может быть пустым'),
        owner_name: string()
            .required('Поле не может быть пустым'),
        address: string()
            .required('Поле не может быть пустым')
            .min(35, 'коротко'),
        inn: string()
            .required('Поле не может быть пустым')
            .min(10, 'коротко'),
        kpp: string()
            .required('Поле не может быть пустым')
            .min(9, 'коротко'),
        ogrn: string()
            .required('Поле не может быть пустым')
            .min(13, 'коротко'),
        okpo: string()
            .required('Поле не может быть пустым')
            .min(8, 'коротко'),
        registration_number: string()
            .required('Поле не может быть пустым')
            .min(15, 'коротко'),
    })
};