import { object, string, number, mixed, boolean, date } from 'yup';
import { DEFAULT_PHONE_INPUT_PLACEHOLDER } from "../../appConfig";

const emptyFieldMsg = 'Поле не может быть пустым';


export const activationForm = {
    method: 'POST',
    action: '/api/requests/NurseryRegistrationRequest',
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
            type: 'text',
            placeholder: DEFAULT_PHONE_INPUT_PLACEHOLDER,
            maxLength: 16
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
            type: 'text'
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
        certificate_registration_nursery: {
            name: 'certificate_registration_nursery',
            label: 'Копия свидетельства о регистрации питомника (PDF, JPEG, JPG)',
            fieldType: 'fileDownloadable',
            accept: '.pdf, .jpg, .jpeg'
        },
        certificate_registration_in_rkf: {
            name: 'certificate_registration_in_rkf',
            label: 'Копия свидетельства о регистрации в Федерации (PDF, JPEG, JPG)',
            fieldType: 'fileDownloadable',
            accept: '.pdf, .jpg, .jpeg'
        },
        certificate_special_education: {
            name: 'certificate_special_education',
            label: 'Копия свидетельства о специальном образовании (PDF, JPEG, JPG)',
            fieldType: 'fileDownloadable',
            accept: '.pdf, .jpg, .jpeg'
        },
        certificate_specialist_rkf: {
            name: 'certificate_specialist_rkf',
            label: 'Копия свидетельства о присвоении звания специалиста РКФ (PDF, JPEG, JPG)',
            fieldType: 'fileDownloadable',
            accept: '.pdf, .jpg, .jpeg'
        },
        certificate_honorary_title: {
            name: 'certificate_honorary_title',
            label: 'Копия удостоверения или равного ему документа о присвоении почётного звания(знака) РФСС и/или РКФ (PDF, JPEG, JPG)',
            fieldType: 'fileDownloadable',
            accept: '.pdf, .jpg, .jpeg'
        }
    },
    validationSchema: object().shape({
        phone: string()
            .matches(/[+][7]{1}[(]\d{3}[)]\d{3}[-]\d{2}[-]\d{2}/, 'Формат номера: +7(999)999-99-99')
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
            .required(emptyFieldMsg),
        flat_name: number()
            .typeError('Введите число'),
        puppies_total_count: number()
            .typeError('Введите число'),
        registration_date: date().required(emptyFieldMsg),
        certificate_rkf_number: string().required(emptyFieldMsg),
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
        certificate_registration_nursery_id: number().nullable().default(null),
        certificate_registration_in_rkf_id: number().nullable().default(null),
        certificate_registration_nursery: mixed()
            .when(['certificate_registration_nursery_id'], {
                is: null,
                then: mixed().required(emptyFieldMsg),
                otherwise: mixed().notRequired(),
            }),
        certificate_registration_in_rkf: mixed()
            .when(['certificate_registration_in_rkf_id'], {
                is: null,
                then: mixed().required(emptyFieldMsg),
                otherwise: mixed().notRequired(),
            })
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
    certificate_registration_nursery: '',
    certificate_registration_in_rkf: '',
    certificate_special_education: '',
    certificate_specialist_rkf: '',
    certificate_honorary_title: '',
    certificate_registration_nursery_id: '',
    certificate_registration_in_rkf_id: '',
    certificate_special_education_id: '',
    certificate_specialist_rkf_id: '',
    certificate_honorary_title_id: ''
};

export const documentFields = [
    'certificate_registration_nursery',
    'certificate_registration_in_rkf',
    'certificate_special_education',
    'certificate_specialist_rkf',
    'certificate_honorary_title'
];