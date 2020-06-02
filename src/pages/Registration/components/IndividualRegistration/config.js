import { object, string, ref } from 'yup';

const emptyFieldMsg = 'Поле не может быть пустым';

const config = {
    method: 'POST',
    action: '/',
    withLoading: true,
    initialValues: {
        email: '',
        surname: '',
        name: '',
        patronymic: '',
        password: '',
        passwordConfirm: ''
    },
    transformValues: values => {
        const filtered = { ...values };
        delete filtered.passwordConfirm;
        return filtered;
    },
    validationSchema: object().shape({
        email: string()
            .email('Некорректный e-mail')
            .required(emptyFieldMsg),
        surname: string()
            .required(emptyFieldMsg),
        name: string()
            .required(emptyFieldMsg),
        patronymic: string()
            .required(emptyFieldMsg),
        password: string()
            .required(emptyFieldMsg),
        passwordConfirm: string()
            .required(emptyFieldMsg)
            .oneOf([ref('password'), null], 'Пароль не совпадает')
    })
};

export const fields = [
    {
        name: 'email',
        type: 'email',
        label: 'E-mail',
        placeholder: 'Введите e-mail'
    },
    {
        name: 'surname',
        type: 'text',
        label: 'Фамилия',
        placeholder: 'Введите фамилию'
    },
    {
        name: 'name',
        type: 'text',
        label: 'Имя',
        placeholder: 'Введите имя'
    },
    {
        name: 'patronymic',
        type: 'text',
        label: 'Отчество',
        placeholder: 'Введите отчество'
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

export default config;