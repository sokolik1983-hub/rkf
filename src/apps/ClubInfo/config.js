import {object, string} from "yup";

export const defaultReduxKey = 'club_info';
export const endpointUrl = '/api/club';

export const clubInfoFormConfig = {
    formAction: endpointUrl,
    fields: {
        club_id: {
            name: 'club_id'

        },
        name:{
            name: 'name',
            label: 'Название клуба',
        },
        address: {
            name: 'address',
            label: 'Адрес клуба',
        },
        site: {
            name: 'site',
            label: 'site клуба',
        },
        description: {
            name: 'description',
            label: 'Описание',
        },
        // federation: {
        //     name: 'federation',
        //     label: 'Федерация',
        //     type: 'select',
        //     placeholder: 'ОАНКОО',
        //     fieldType: 'reactSelectAsync',
        //     optionsEndpoint: '/api/club/federation/all'
        // },
        // status: {
        //     name: 'status',
        //     label: 'Статус',
        //     type: 'select',
        //     placeholder: 'Региональный',
        //     fieldType: 'reactSelectAsync',
        //     optionsEndpoint: '/api/club/status/all'
        // },
        // owner_name:{
        //     name: 'owner_name',
        //     label: 'Реководство',
        // },
        // company_dog_stamp:{
        //     name: 'company_dog_stamp',
        //     label: 'Клеймо клуба',
        // },
    },
    validationSchema: object().shape({
        //
    })
};