import {object, string} from "yup";

export const defaultReduxKey = 'club_social';
export const endpointUrl = '/api/clubs/SocialNetwork';

export const getlistUrl = '/api/clubs/SocialNetwork/list/';


export const clubClubSocialConfig = {
    formAction: endpointUrl,
    fields: {
        site: {
            name: 'site',
            label: 'Ссылка'

        },
        description: {
            name: 'description',
            label: 'Название',
        },
        // social_network_type_id: {
        //     name: 'social_network_type_id',
        //     label: 'social_network_type_id',
        // },
    },
    validationSchema: object().shape({
        site: string()
            .required('Поле не может быть пустым'),
        description: string()
            .required('Поле не может быть пустым'),
    })
};