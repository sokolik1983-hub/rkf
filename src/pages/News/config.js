export const endpointGetNews = '/api/Article'; //GET
export const endpointEditNews = '/api/article/update'; //PUT
export const endpointAddNewsPicture = '/api/Article/image'; //POST
export const endpointDeleteNewsPicture = '/api/Article/image/'; // /id DELETE
export const apiBreedsEndpoint = '/api/dog/Breed'; // GET Breeds
export const apiSexEndpoint = '/api/dog/Breed/sex_types'; // GET Sex
export const apiCityEndpoint = '/api/city/0'; // GET Cities

export const formConfig = {
    action: endpointEditNews,
    method: 'PUT',
    format: "multipart/form-data",
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
            placeholder: "Выберите породу",
        },
        dog_city: {
            name: 'dog_city',
            label: 'Место потери',
            placeholder: 'Город',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: false,
            closeMenuOnSelect: true,
            optionsEndpoint: '/api/city/0',
        },
        dog_sex_type_id: {
            name: 'dog_sex_type_id',
            fieldType: 'reactSelect',
        },
        advert_cost: {
            name: 'advert_cost',
            label: 'Стоимость',
            placeholder: "Укажите стоимость"
        },
        dog_color: {
            name: 'dog_color',
            label: 'Окрас',
            placeholder: "Окрас"
        },
        dog_name: {
            name: 'dog_name',
            label: 'Кличка',
            placeholder: "Кличка"
        },
        dog_age: {
            name: 'dog_age',
            label: 'Возраст',
            placeholder: "Возраст"
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
        video_link: {
            name: 'video_link'
        },
        advert_type_id: {
            name: 'advert_type_id',
            label: 'Категория объявления'
        }
    },
};
export const formConfigSecondCat = {
    action: endpointEditNews,
    method: 'PUT',
    format: "multipart/form-data",
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
            placeholder: "Выберите породу",
        },
        dog_city: {
            name: 'dog_city',
            placeholder: 'Город',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: false,
            closeMenuOnSelect: true,
            optionsEndpoint: '/api/city/0',
        },
        dog_sex_type_id: {
            name: 'dog_sex_type_id',
            fieldType: 'reactSelect',
        },
        dog_color: {
            name: 'dog_color',
            label: 'Окрас',
            placeholder: "Окрас"
        },
        dog_name: {
            name: 'dog_name',
            label: 'Кличка',
            placeholder: "Кличка"
        },
        dog_age: {
            name: 'dog_age',
            label: 'Возраст',
            placeholder: "Возраст"
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
        video_link: {
            name: 'video_link'
        },
        advert_type_id: {
            name: 'advert_type_id',
            label: 'Категория объявления'
        }
    }
};

export const defaultValues = {
    is_advert: false,
    advert_breed_id: '',
    advert_cost: '',
    advert_number_of_puppies: '',
    advert_type_id: '',
    content: '',
    file: '',
    dog_color: '',
    dog_age: '',
    dog_city: ''
};