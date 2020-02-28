import {object, string} from "yup";
export const defaultReduxKey = 'club_bank';
export const endpointUrl = '/api/clubs/Bank';


export const clubBankInfoFormConfig = {
    action: endpointUrl,
    method: 'PUT',
    fields: {
        rs_number: {
            name: 'rs_number',
            label: 'Номер счёта',
        },
        bank_name: {
            name: 'bank_name',
            label: 'Название банка',
        },
    },
    validationSchema: object().shape({
        rs_number: string()
            .required('Поле не может быть пустым'),
        bank_name: string()
            .required('Поле не может быть пустым'),
    })
};