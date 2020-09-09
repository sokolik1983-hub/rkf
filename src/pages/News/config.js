import { object, string, number, boolean } from "yup";

export const endpointGetNews = '/api/Article'; //GET
export const endpointEditNewsText = '/api/Article'; //PUT
export const endpointAddNewsPicture = '/api/Article/image'; //POST
export const endpointDeleteNewsPicture = '/api/Article/image/'; // /id DELETE
export const apiBreedsEndpoint = '/api/dog/Breed'; // GET Breeds

export const formConfig = {
    action: endpointEditNewsText,
    method: 'PUT',
    fields: {
        is_advert: {
            name: 'is_advert',
            label: 'Объявление',
            fieldType: 'customCheckbox'
        },
        advert_breed_id: {
            name: 'advert_breed_id',
            fieldType: 'reactSelect',
            label: 'Порода',
            placeholder: "Выберите породу"
        },
        advert_cost: {
            name: 'advert_cost',
            label: 'Стоимость',
            placeholder: "Укажите стоимость"
        },
        advert_number_of_puppies: {
            name: 'advert_number_of_puppies',
            label: 'Кол-во щенков',
            placeholder: "Укажите кол-во щенков"
        },
        content: {
            name: 'content',
            fieldType: 'textarea',
            placeholder: 'Напишите что-нибудь...',
        },
        file: {
            name: 'file',
            fieldType: 'image',
            type: 'file',
            placeholder: 'Загрузить фото...',
        },
        advert_type_id: {
            name: 'advert_type_id',
            label: 'Категория объявления'
        }
    },
    validationSchema: object().shape({
        content: string().required('Поле не может быть пустым'),
        is_advert: boolean(),
        advert_breed_id: number()
            .when(['is_advert'], {
                is: true,
                then: number().required('Поле не может быть пустым'),
                otherwise: number().notRequired(),
            }),
        advert_number_of_puppies: number()
            .when(['is_advert'], {
                is: true,
                then: number().min(1, 'Значение не может быть меньше 1')
                    .max(99, 'Значение не может быть больше 99')
                    .required('Поле не может быть пустым')
                    .typeError('Введите число'),
                otherwise: number().notRequired(),
            }),
        advert_type_id: number()
            .when(['is_advert'], {
                is: true,
                then: number().nullable().required('Выберите категорию'),
                otherwise: number().notRequired(),
            }),

    })
};

export const defaultValues = {
    is_advert: false,
    advert_breed_id: '',
    advert_cost: '',
    advert_number_of_puppies: '',
    advert_type_id: '',
    content: '',
    file: '',
};