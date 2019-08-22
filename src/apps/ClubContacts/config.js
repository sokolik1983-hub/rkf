import {object, string} from "yup";

export const defaultReduxKey = 'club_contacts';
export const endpointUrl = '/api/clubs/Contact';

export const getlistUrl = '/api/clubs/Contact/list/';


export const clubClubContactsConfig = {
    formAction: endpointUrl,
    method: "PUT",
    fields: {
        value: {
            name: 'value',
            label: 'Значние'

        },
        description: {
            name: 'description',
            label: 'Описание контакта',
        },
        contact_type_id: {
            name: 'contact_type_id',
            label: 'Тип контакта',
            fieldType: 'reactSelect',
            options: [
                {label: 'Телефон', value: 1},
                {label: 'Email', value: 2}
            ]
        },
    },
    validationSchema: object().shape({
        //
    })
};