import { object, string } from "yup";


export const options = {
    action: '/api/feedback/new',
    method: 'POST',
    fields:{
        types: {
            name: 'type_id',
            label: 'Тип заявки',
            placeholder: 'Выберите...',
            fieldType: 'reactSelect',
            type: 'select',
            className: 'select-type',
        },
        category: {
            name: 'category_id',
            label: 'Категория',
            placeholder: 'Выберите...',
            fieldType: 'reactSelect',
            type: 'select',
            className: 'select-category',
        },
        subCategory: {
            name: 'category_id',
            label: 'Подкатегория',
            placeholder: 'Выберите...',
            fieldType: 'reactSelect',
            type: 'select',
            className: 'select-subcategory',
        },
        feedbackText: {
            name: "comment",
            label: "Ваше сообщение",
            fieldType: 'textarea',
            rows: 5,
            maxLength: '1500',
            className: 'textarea'
        },
    },
    validationSchema: object().shape({
        type_id: string()
            .required('Выберите тип заявки'),
        category_id: string()
            .required('Выберите категорию'),
        comment: string()
            .required('Напишите заявку')
            .min(20, 'Заявка должна содержать не менее 20 символов')
            .max(1500, 'Заявка должна содержать не более 1500 символов'),
    })
}
