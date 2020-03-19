import { object, string } from 'yup';

export const defaultReduxKey = 'club_contacts';
export const ENDPOINT_URL = '/api/clubs/Contact';

export const getlistUrl = '/api/clubs/Contact/list/';

export const CONTACT_TYPES = {
    phone: {
        type: 'phone',
        label: 'Телефон',
        value: '1',
        storeListIds: 'contactsPhoneIds',
        validationSchema: object().shape({
            description: string().required('Укажите описание контакта'),
            value: string().matches(/[+][7]{1}[(]\d{3}[)]\d{3}[-]\d{2}[-]\d{2}/, 'Некорректный формат номера').required('Поле не может быть пустым')
        })
    },
    email: {
        type: 'email',
        label: 'E-mail',
        value: '2',
        storeListIds: 'contactsEmailIds',
        validationSchema: object().shape({
            description: string().required('Укажите описание контакта'),
            value: string().email('Неверный формат E-mail').required('Поле не может быть пустым')
        })
    }
};
export const clubClubContactsConfig = {
    action: ENDPOINT_URL,
    fields: {
        value: {
            name: 'value'
        },
        description: {
            name: 'description',
            label: 'Описание'
        },
        contact_type_id: {
            name: 'contact_type_id',
            label: 'Тип контакта',
            fieldType: 'reactSelect',
            options: [
                { label: 'Телефон', value: 1 },
                { label: 'Email', value: 2 }
            ]
        }
    },
    formInitials: { value: '', description: '', contact_type_id: '' }
};
