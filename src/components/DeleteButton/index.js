import React, {useState} from 'react'
import Button from 'components/Button'
import {useConfirmDialog} from 'shared/hooks'
import axios from 'axios'
import {getHeaders} from "utils/request";

import {usePushMessage} from 'apps/Messages/hooks'

export default function DeleteButton({

                                         actionUrl,
                                         params,
                                         onDeleteSuccess,
                                         successMessage,

                                         style,
                                         children
                                     }) {
    const {confirm, onConfirm, onCancel} = useConfirmDialog();
    const [state, setState] = useState({loading: false});
    const {push} = usePushMessage();

    const onDelete = async () => {
        setState({...state, loading: true});
        try {
            await axios.delete(actionUrl, {data: params, headers: getHeaders()});
        } catch (e) {
            console.log('Ошибка запроса на удаление: ', e);
            push({
                text: 'Операция удаления не выполнена',
            })
        }

        if (successMessage) {
            console.log(successMessage);
            push({
                text: successMessage,
                timeOut: 3000
            })
        }

        setState({...state, loading: false});

        onDeleteSuccess();


    };

    const onConfirmDelete = () => {
        onDelete()
    };

    return confirm ?
        (
            <React.Fragment>
                <Button style={style} disabled={state.loading} onClick={onConfirmDelete}>Подвердить</Button>
                <Button disabled={state.loading} onClick={onCancel}>Отмена</Button>
            </React.Fragment>
        )
        :
        (
            <Button disabled={state.loading} onClick={onConfirm}>
                {children}
            </Button>
        )
}