import {object, string} from "yup";


export const federationForm = {
    method: 'POST',
    action: '/api/Registration/nursery/search',
    withLoading: true,
    initialValues: {
        federation_id: '',
        folder_number: ''
    },
    fields: {
        federation_id: {
            name: 'federation_id',
            label: 'Федерация',
            placeholder: 'Федерация',
            fieldType: 'reactSelect',
            type: 'select'
        },
        folder_number: {
            name: 'folder_number',
            label: 'Номер папки',
            placeholder: 'Номер папки'
        }
    },
    validationSchema: object().shape({
        federation_id: string().required('Укажите федерацию'),
        folder_number: string().required('Укажите номер папки')
    })
};

export const nurseryForm = {
    method: 'POST',
    action: '/api/Registration/nursery/send_activation_code',
    withLoading: true,
    fields: {
        city_id: {
            name: 'city_id',
            label: 'Город',
            placeholder: 'Выберите город',
            fieldType: 'reactSelectAsync',
            type: 'select',
            optionsEndpoint: '/api/city'
        },
        owner_last_name: {
            name: 'owner_last_name',
            label: 'Фамилия владельца',
            placeholder: 'Фамилия владельца'
        },
        owner_first_name: {
            name: 'owner_first_name',
            label: 'Имя владельца',
            placeholder: 'Имя владельца'
        },
        owner_second_name: {
            name: 'owner_second_name',
            label: 'Отчество владельца',
            placeholder: 'Отчество владельца'
        },
        mail: {
            name: 'mail',
            type: 'email',
            label: 'Код активации будет отправлен на почту:',
            placeholder: 'Введите Ваш E-mail'
        }
    },
    validationSchema: object().shape({
        city_id: string().required('Укажите город'),
        owner_last_name: string().required('Укажите Фамилию'),
        owner_first_name: string().required('Укажите Имя'),
        mail: string().email('Неверный формат E-mail').required('Укажите E-mail')
    })
};

export const createForm = {
    method: 'POST',
    action: '/api/Registration/nursery/send_activation_code',
    withLoading: true,
    fields: {
        federation_id: {
            name: 'federation_id',
            label: 'Федерация',
            placeholder: 'Федерация',
            fieldType: 'reactSelect',
            type: 'select'
        },
        folder_number: {
            name: 'folder_number',
            label: 'Номер папки',
            placeholder: 'Номер папки'
        },
        stamp_code: {
            name: 'stamp_code',
            label: 'Код клейма',
            placeholder: 'Код клейма',
            maxLength: 3
        },
        city_id: {
            name: 'city_id',
            label: 'Город',
            placeholder: 'Выберите город',
            fieldType: 'reactSelectAsync',
            type: 'select',
            optionsEndpoint: '/api/city'
        },
        name: {
            name: 'name',
            label: 'Название питомника',
            placeholder: 'Название питомника'
        },
        owner_last_name: {
            name: 'owner_last_name',
            label: 'Фамилия владельца',
            placeholder: 'Фамилия владельца'
        },
        owner_first_name: {
            name: 'owner_first_name',
            label: 'Имя владельца',
            placeholder: 'Имя владельца'
        },
        owner_second_name: {
            name: 'owner_second_name',
            label: 'Отчество владельца',
            placeholder: 'Отчество владельца'
        },
        mail: {
            name: 'mail',
            type: 'email',
            label: 'Код активации будет отправлен на почту:',
            placeholder: 'Введите Ваш E-mail'
        }
    },
    validationSchema: object().shape({
        federation_id: string().required('Укажите федерацию'),
        folder_number: string().required('Укажите номер папки'),
        stamp_code: string().required('Укажите код клейма').matches(/^[A-Z]{3}$/, {message:'Введите 3 заглавные латинские буквы'}),
        city_id: string().required('Укажите город'),
        name: string().required('Укажите Название'),
        owner_last_name: string().required('Укажите Фамилию'),
        owner_first_name: string().required('Укажите Имя'),
        mail: string().email('Неверный формат E-mail').required('Укажите E-mail')
    })
};

export const codeForm = {
    method: 'POST',
    withLoading: true,
    initialValues: {
        activation_code: ''
    },
    fields: {
        activation_code: {
            name: 'activation_code',
            type: 'text',
            placeholder: 'Введите код'
        }
    },
    validationSchema: object().shape({
        activation_code: string().required('Введите код')
    })
};