import { object, string } from "yup";

export const defaultReduxKey = 'exhibition_prices';


export const listPricesByExhibitionIdUrl = '/api/exhibitions/Price/byexhibition/';

export const exhibitionPricesForm = {
    fields: {
        sum: {
            name: 'sum',
            type: 'number',
            placeholder: 'Цена',
        },
        description: {
            name: 'description',
            placeholder: 'Описание',
        },
        discont: {
            name: 'discont',
            type: 'number',
            placeholder: 'Скидка',
        },
    },
    validationSchema: object().shape({
        sum: string()
            .required('Укажите цену'),
        discont: string()
            .test('', 'Укажите скидку менее 100%',
                value => value === undefined || (value && value < 100)
            ),
    })
};