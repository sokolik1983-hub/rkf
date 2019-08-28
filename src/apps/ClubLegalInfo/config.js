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
            label: 'Юридический адрес',
        },
        inn: {
            name: 'inn',
            label: 'ИНН',
        },
        kpp: {
            name: 'kpp',
            label: 'КПП',
        },
        ogrn: {
            name: 'ogrn',
            label: 'ОГРН',
        },
        okpo: {
            name: 'okpo',
            label: 'ОКПО',
        },
        registration_number: {
            name: 'registration_number',
            label: 'Регистрационный номер',
        },
        registration_date: {
            name: 'registration_date',
            label: 'Дата регистрации',
            type: 'date',
        },
        is_public: {
            name: 'is_public',
            label: 'is_public клуба',
        },
    },
    validationSchema: object().shape({
        //
        name: string()
            .required('Поле не может быть пустым')
            .nullable(),
        owner_name: string()
            .required('Поле не может быть пустым')
            .nullable(),
        address: string()
            .nullable()
            .required('Поле не может быть пустым')
            .min(20, 'коротко от 20'),
        inn: string()
            .nullable()
            .required('Поле не может быть пустым')
            .min(10, 'коротко'),
        kpp: string()
            .nullable()
            .required('Поле не может быть пустым')
            .min(9, 'коротко'),
        ogrn: string()
            .nullable()
            .required('Поле не может быть пустым')
            .min(13, 'коротко'),
        okpo: string()
            .nullable()
            .required('Поле не может быть пустым')
            .min(8, 'коротко'),
        registration_number: string()
            .required('Поле не может быть пустым')
            .min(15, 'коротко'),
    })
};