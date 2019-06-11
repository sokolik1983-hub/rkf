import {object, string} from "yup";

export const defaultReduxKey = 'exhibition_prices'

export const exhibitionPricesForm = {
    fields: {
        sum: {
            name: 'sum',
            placeholder: 'Цена',
        },
        discont: {
            name: 'discont',
            placeholder: 'Скидка',
        },
    },
    validationSchema: object().shape({
        sum: string()
            .required('Укажите цену'),
        discont: string()
            .required('Укажите цену')
            .test('', 'Укажите скидку менее 100%',
                value => value && value < 100
            ),
    })
};