import {object, string, ref} from "yup";

const emptyFieldMsg = 'Поле не может быть пустым';

export const config = {
    method: 'POST',
    action: '/',
    withLoading: true,
    initialValues: {
        last_name: '',
        first_name: '',
        second_name: '',
        city_id: '',
        mail: '',
        password: '',
        passwordConfirm: ''
    },
    validationSchema: object().shape({
        last_name: string().required(emptyFieldMsg),
        first_name: string().required(emptyFieldMsg),
        city_id: string().required('Укажите город'),
        mail: string().email('Некорректный e-mail').required(emptyFieldMsg),
        password: string().required(emptyFieldMsg),
        passwordConfirm: string().required(emptyFieldMsg).oneOf([ref('password'), null], 'Пароль не совпадает')
    })
};

export const fields = [
    {
        name: 'last_name',
        type: 'text',
        label: 'Фамилия',
        placeholder: 'Введите фамилию'
    },
    {
        name: 'first_name',
        type: 'text',
        label: 'Имя',
        placeholder: 'Введите имя'
    },
    {
        name: 'second_name',
        type: 'text',
        label: 'Отчество',
        placeholder: 'Введите отчество'
    },
    {
        name: 'city_id',
        label: 'Город',
        placeholder: 'Выберите город',
        fieldType: 'reactSelectAsync',
        type: 'select',
        optionsEndpoint: '/api/city'
    },
    {
        name: 'mail',
        type: 'email',
        label: 'E-mail',
        placeholder: 'Введите e-mail'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль'
    },
    {
        name: 'passwordConfirm',
        type: 'password',
        label: 'Подтверждение пароля',
        placeholder: 'Введите подтверждение пароля'
    }
];