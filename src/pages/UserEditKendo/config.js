export const sections = {
    general: {
        name: 'Основная информация',
        id: 0,
        url: '/api/owners/owner/owner_edit_general_information',
        icon: 'k-i-information'
    },
    contacts: {
        name: 'Контакты',
        id: 1,
        url: '/api/owners/owner/owner_edit_contact_information',
        icon: 'k-i-track-changes'
    },
    about: {
        name: 'О себе',
        id: 2,
        url: '/api/owners/owner/owner_edit_about_information',
        icon: 'k-i-user'
    },
    security: {
        name: 'Безопасность',
        id: 3,
        //url: '/api/owners/owner/owner_edit_safety_information',
        icon: 'k-i-lock'
    },
    delete: {
        name: 'Удаление страницы',
        id: 4,
        icon: 'k-i-trash'
    }
};

export const defaultValues = {
    about: {
        web_site: '',
        description: '',
        social_networks: [{
            id: null,
            site: '',
            description: '',
            social_network_type_id: 1
        }]
    },
    general: {
        first_name: '',
        last_name: '',
        second_name: '',
        birth_date: '',
        sex_type_id: '',
        sex_type_name: '',
        birth_date_visibility_status_id: '',
        birth_date_visibility_status_name: ''
    },
    contacts: {
        address_visibility_status_id: 1,
        address_visibility_status_name: '',
        address: {
            postcode: '',
            city_id: '',
            street_type_id: '',
            street_name: '',
            house_type_id: '',
            house_name: '',
            flat_type_id: '',
            flat_name: null,
        },
        phones: [{
            id: null,
            value: '',
            is_main: true,
            description: '',
            contact_type_id: 1
        }],
        mails: [{
            id: null,
            value: '',
            is_main: true,
            description: '',
            contact_type_id: 0
        }]
    },
    security: {
        alias: '',
        login: ''
    }
};