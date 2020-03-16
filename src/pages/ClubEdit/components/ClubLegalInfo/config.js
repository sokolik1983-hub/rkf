import { object, /*string, date*/ } from "yup";

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
        owner_position: {
            name: 'owner_position',
            label: 'Должность руководителя'
        },
        owner_name: {
            name: 'owner_name',
            label: 'Руководитель',
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
        // registration_number: {
        //     name: 'registration_number',
        //     label: 'Регистрационный номер',
        // },
        registration_date: {
            name: 'registration_date',
            label: 'Дата регистрации',
            fieldType: 'reactDayPicker'
        },
        is_public: {
            name: 'is_public',
            label: 'is_public клуба',
        },
    },
    validationSchema: object().shape({
        // name: string()
        //     .required('Поле не может быть пустым')
        //     .nullable(),
        // owner_position: string()
        //     .required('Поле не может быть пустым')
        //     .nullable(),
        // owner_name: string()
        //     .required('Поле не может быть пустым')
        //     .nullable(),
        // registration_date: date()
        //     .required('Необходимо указать дату'),
        // address: string()
        //     .nullable()
        //     .required('Поле не может быть пустым'),
        // inn: string()
        //     .nullable()
        //     .required('Поле не может быть пустым')
        //     .min(10, 'коротко'),
        // kpp: string()
        //     .nullable()
        //     .required('Поле не может быть пустым')
        //     .min(9, 'коротко'),
        // ogrn: string()
        //     .nullable(),
        //     // .required('Поле не может быть пустым'),
        // okpo: string()
        //     .nullable()
        //     .required('Поле не может быть пустым')
        // registration_number: string()
        //     .required('Поле не может быть пустым')
        //     .min(15, 'коротко'),
    })
};