import React, {useState} from 'react'
import Button from 'components/Button'
import {useConfirmDialog} from 'shared/hooks'
import axios from 'axios'
import {getHeaders} from "../../utils/request";

export default function DeleteButton(props) {
    const {actionUrl, params, onDeleteSuccess, style, children} = props;
    const {confirm, onConfirm, onCancel} = useConfirmDialog();
    const [state, setState] = useState({loading: false});

    const onDelete = async () => {
        setState({...state, loading: true});

        const response = await axios.delete(actionUrl, {data: params, headers:getHeaders()});

        console.log(response);

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