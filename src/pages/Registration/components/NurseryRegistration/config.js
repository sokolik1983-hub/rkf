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
    action: '/api/Registration/nursery/activate',
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
        owner_name: {
            name: 'owner_name',
            label: 'ФИО владельца',
            placeholder: 'ФИО владельца'
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
        owner_name: string().required('Укажите ФИО'),
        mail: string().email('Неверный формат E-mail').required('Укажите E-mail')
    })
};