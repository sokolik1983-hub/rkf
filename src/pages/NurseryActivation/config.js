import {object, string, number, mixed, boolean, date} from 'yup';
import {DEFAULT_PHONE_INPUT_PLACEHOLDER, DEFAULT_PHONE_INPUT_MASK} from "../../appConfig";

const emptyFieldMsg = 'Поле не может быть пустым';


export const activationForm = {
    method: 'POST',
    action: '/api/requests/NurseryRegistrationRequest',
    format: "multipart/form-data",
    fields: {
        name: {
            name: "name",
            label: "Название питомника",
            disabled: true
        },
        owner_name: {
            name: "owner_name",
            label: "ФИО",
            disabled: true
        },
        postcode: {
            name: "postcode",
            label: "Индекс",
            placeholder: 'Введите индекс'
        },
        city: {
            name: "city",
            label: "Населенный пункт",
            fieldType: 'reactSelectAsync',
            type: 'select',
            optionsEndpoint: '/api/city',
            disabled: true
        },
        street_type_id: {
            name: "street_type_id",
            label: "Тип улицы",
            placeholder: 'Тип улицы',
            fieldType: 'reactSelect',
            type: 'select'
        },
        street_name: {
            name: "street_name",
            label: "Улица",
            placeholder: 'Введите название'
        },
        house_type_id: {
            name: "house_type_id",
            label: "Тип здания",
            placeholder: 'Тип здания',
            fieldType: 'reactSelect',
            type: 'select'
        },
        house_name: {
            name: "house_name",
            label: "Здание",
            placeholder: 'Введите номер'
        },
        flat_type_id: {
            name: "flat_type_id",
            label: "Тип помещения",
            placeholder: 'Тип помещения',
            fieldType: 'reactSelect',
            type: 'select'
        },
        flat_name: {
            name: "flat_name",
            label: "Помещение",
            placeholder: 'Введите номер'
        },
        mail: {
            name: "mail",
            label: "E-mail",
            disabled: true
        },
        stamp_code: {
            name: "stamp_code",
            label: "Код клейма",
            disabled: true
        },
        folder_number: {
            name: "folder_number",
            label: "Номер папки",
            disabled: true
        },
        owner_ranks: {
            name: "owner_ranks",
            label: "Какие звания Вам присвоены",
            placeholder: 'Введите звания'
        },
        dogs_ranks: {
            name: "dogs_ranks",
            label: "Какие звания имеют собаки с приставкой вашего питомника",
            placeholder: 'Введите звания'
        },
        breeds: {
            name: "breeds",
            label: "Породы",
            placeholder: 'Породы',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: '/api/dog/Breed'
        },
        puppies_total_count: {
            name: "puppies_total_count",
            label: "Получено щенков",
            placeholder: 'Введите число'
        },
        phone: {
            name: 'phone',
            label: 'Телефон',
            fieldType: 'masked',
            type: 'text',
            placeholder: DEFAULT_PHONE_INPUT_PLACEHOLDER,
            mask: DEFAULT_PHONE_INPUT_MASK
        },
        experience_dog_breeding: {
            name: "experience_dog_breeding",
            label: "Стаж пребывания в собаководстве",
            readOnly: true,
            required: false,
            placeholder: 'Укажите дату начала стажа',
            fieldType: "formikDatePicker"
        },
        suffix: {
            name: 'suffix',
            id: 'suffix',
            label: 'Суффикс',
            fieldType: "customCheckbox"
        },
        prefix: {
            name: 'prefix',
            id: 'prefix',
            label: 'Префикс',
            fieldType: "customCheckbox"
        },
        registration_date: {
            name: "registration_date",
            label: "Дата регистрации",
            readOnly: true,
            required: false,
            fieldType: "formikDatePicker"
        },
        certificate_rkf_number: {
            name: 'certificate_rkf_number',
            label: 'Свидетельство РКФ №',
            placeholder: 'Введите №',
            type: 'text',
            maxLength: 15
        },
        owner_specialist_rkf: {
            name: "owner_specialist_rkf",
            id: 'owner_specialist_rkf',
            label: "Специалист РКФ",
            fieldType: "customCheckbox"
        },
        owner_special_education: {
            name: "owner_special_education",
            label: "Специальное образование ",
            placeholder: "Введите название"
        },
        owner_speciality: {
            name: "owner_speciality",
            label: "Специальность",
            placeholder: "Введите название"
        },
        owner_date_speciality: {
            name: "owner_date_speciality",
            label: "Дата получения специальности",
            readOnly: true,
            required: false,
            fieldType: "formikDatePicker"
        },
        owner_place_speciality: {
            name: "owner_place_speciality",
            label: "Место получения специальности",
            placeholder: "Введите адрес"
        },
        certificate_registration_nursery_document: {
            name: 'certificate_registration_nursery_document',
            label: 'Копия свидетельства о регистрации питомника (PDF, JPEG, JPG, PNG)',
            fieldType: 'file',
            accept: '.pdf, .jpg, .jpeg, .png'
        },
        certificate_registration_in_rkf_document: {
            name: 'certificate_registration_in_rkf_document',
            label: 'Копия свидетельства о регистрации в Федерации (PDF, JPEG, JPG, PNG)',
            fieldType: 'file',
            accept: '.pdf, .jpg, .jpeg, .png'
        },
        certificate_special_education_document: {
            name: 'certificate_special_education_document',
            label: 'Копия свидетельства о специальном образовании (PDF, JPEG, JPG, PNG)',
            fieldType: 'file',
            accept: '.pdf, .jpg, .jpeg, .png'
        },
        certificate_specialist_rkf_document: {
            name: 'certificate_specialist_rkf_document',
            label: 'Копия свидетельства о присвоении звания специалиста РКФ (PDF, JPEG, JPG, PNG)',
            fieldType: 'file',
            accept: '.pdf, .jpg, .jpeg, .png'
        },
        certificate_honorary_title_document: {
            name: 'certificate_honorary_title_document',
            label: 'Копия удостоверения или равного ему документа о присвоении почётного звания(знака) РФСС и/или РКФ (PDF, JPEG, JPG, PNG)',
            fieldType: 'file',
            accept: '.pdf, .jpg, .jpeg, .png'
        }
    },
    validationSchema: object().shape({
        phone: string()
            .length(15, 'Номер телефона должен содержать 11 цифр')
            .required(emptyFieldMsg),
        postcode: string()
            .required(emptyFieldMsg),
        street_type_id: string()
            .required(emptyFieldMsg),
        street_name: string()
            .required(emptyFieldMsg),
        house_type_id: string()
            .required(emptyFieldMsg),
        house_name: string()
            .typeError('Введите число')
            .required(emptyFieldMsg),
        flat_name: number()
            .typeError('Введите число'),
        puppies_total_count: number()
            .typeError('Введите число'),
        registration_date: date().required(emptyFieldMsg),
        certificate_rkf_number: string().required(emptyFieldMsg).min(15, 'Введите минимум 15 цифр'),
        owner_specialist_rkf: boolean(),
        owner_special_education: string()
            .when(['owner_specialist_rkf'], {
                is: false,
                then: string().required(emptyFieldMsg),
                otherwise: string().notRequired(),
            }),
        owner_speciality: string()
            .when(['owner_specialist_rkf'], {
                is: false,
                then: string().required(emptyFieldMsg),
                otherwise: string().notRequired(),
            }),
        owner_date_speciality: date()
            .when(['owner_specialist_rkf'], {
                is: false,
                then: date().required(emptyFieldMsg),
                otherwise: date().notRequired(),
            }),
        owner_place_speciality: string()
            .when(['owner_specialist_rkf'], {
                is: false,
                then: string().required(emptyFieldMsg),
                otherwise: string().notRequired(),
            }),
        certificate_registration_nursery_document: mixed()
            .required(emptyFieldMsg),
        certificate_registration_in_rkf_document: mixed()
            .required(emptyFieldMsg),

    })
};

export const defaultValues = {
    name: '',
    suffix: false,
    prefix: false,
    owner_name: '',
    postcode: '',
    city: '',
    street_type_id: '',
    street_name: '',
    house_type_id: '',
    house_name: '',
    flat_type_id: '',
    flat_name: '',
    mail: '',
    stamp_code: '',
    folder_number: '',
    owner_ranks: '',
    dogs_ranks: '',
    breeds: [],
    puppies_total_count: '',
    phone: '',
    experience_dog_breeding: '',
    registration_date: '',
    certificate_rkf_number: '',
    owner_specialist_rkf: false,
    owner_special_education: '',
    owner_speciality: '',
    owner_date_speciality: '',
    owner_place_speciality: '',
    certificate_registration_nursery_document: '',
    certificate_registration_in_rkf_document: '',
    certificate_special_education_document: '',
    certificate_specialist_rkf_document: '',
    certificate_honorary_title_document: ''
};