import {object, string, ref, number} from "yup";

const emptyFieldMsg = 'Поле не может быть пустым';

export const config = {
    method: 'POST',
    action: '/api/registration/owner/create_and_confirm',
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
        city_id: number().required('Укажите город'),
        mail: string().email('Некорректный e-mail').required(emptyFieldMsg),
        password: string()
            .required(emptyFieldMsg)
            .min(6, 'Пароль должен состоять минимум из 6 символов')
            .matches(/^(?=.*[A-ZА-ЯЁ])(?=.*[0-9])[\w\S].{5,}/g, 'Пароль должен иметь не менее 1 заглавной буквы и не менее 1 цифры'),
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
        placeholder: 'Введите E-mail'
    }
    // {
    //     name: 'password',
    //     type: 'password',
    //     label: 'Пароль',
    //     placeholder: 'Введите пароль'
    // },
    // {
    //     name: 'passwordConfirm',
    //     type: 'password',
    //     label: 'Подтверждение пароля',
    //     placeholder: 'Введите подтверждение пароля'
    // }
];