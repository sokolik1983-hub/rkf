export const newsArticleFormConfig = {
    action: '/api/Article/full',
    format: "multipart/form-data",
    fields: {
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
        advert_breed_id: {
            name: 'advert_breed_id',
            label: 'Порода',
            placeholder: 'Порода',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: false,
            closeMenuOnSelect: true,
            optionsEndpoint: '/api/dog/Breed'
        },
        advert_cost: {
            name: 'advert_cost',
            label: 'Стоимость (руб.)'
        },
        advert_number_of_puppies: {
            name: 'advert_number_of_puppies',
            label: 'Кол-во щенков',
            maxLength: 2
        },
        advert_type_id: {
            name: 'advert_type_id',
            label: 'Категория объявления'
        }
    }
};