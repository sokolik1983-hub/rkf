import { object, string } from "yup";

export const endpointAlbum = '/api/photogallery/albums';

export const addAlbumForm = {
    action: endpointAlbum,
    method: 'POST',
    withLoading: true,
    fields: {
        name: {
            name: 'name',
            label: 'Название альбома',
            placeholder: 'Введите название'
        },
        description: {
            name: 'description',
            label: 'Описание альбома',
            placeholder: 'Введите описание'
        },
        // cover: {
        //     name: 'cover',
        //     label: 'Обложка альбома',
        //     placeholder: 'Выберите обложку',
        //     fieldType: 'file'
        // }
    },
    initialValues: {
        name: '',
        description: '',
        // cover: ''
    },
    validationSchema: object().shape({
        name: string()
            .required('Введите название')
    })
};

export const editAlbumForm = {
    action: endpointAlbum,
    method: 'PUT',
    withLoading: true,
    fields: {
        id: {
            name: 'id'
        },
        name: {
            name: 'name',
            label: 'Название',
            placeholder: 'Введите название'
        },
        description: {
            name: 'description',
            label: 'Описание',
            placeholder: 'Введите описание'
        },
        // cover: {
        //     name: 'cover',
        //     label: 'Обложка альбома',
        //     placeholder: 'Выберите обложку',
        //     fieldType: 'file'
        // }
    },
    initialValues: {
        id: '',
        name: '',
        description: '',
        //cover: ''
    },
    validationSchema: object().shape({
        name: string()
            .required('Введите название')
    })
};