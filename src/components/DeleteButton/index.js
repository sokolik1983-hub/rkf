import React, { useState } from 'react';
import classnames from 'classnames';
import Button from 'components/Button';
import { useConfirmDialog } from 'shared/hooks';
import axios from 'axios';
import { getHeaders } from 'utils/request';
import './styles.scss';

export default function DeleteButton({
    actionUrl,
    params,
    onDeleteSuccess,
    successMessage,
    style,
    children,
    windowed,
    confirmMessage,
    className
}) {
    const { confirm, onCancel } = useConfirmDialog();
    const [state, setState] = useState({ loading: false });

    const onDelete = async () => {
        setState({ ...state, loading: true });
        try {
            await axios.delete(actionUrl, {
                data: params,
                headers: getHeaders()
            });
            onDeleteSuccess();
        } catch (e) {
            console.log('Ошибка запроса на удаление: ', e);
        }

        setState({ ...state, loading: false });
    };

    const onConfirmDelete = () => {
        onDelete();
    };

    return confirm ? (
        windowed ? (
            <div className="DeleteButton__confirmDialogWrapper">
                <div className="DeleteButton__confirmDialog">
                    {confirmMessage ? (
                        <div className="DeleteButton__confirmMessage">
                            {confirmMessage}
                        </div>
                    ) : null}
                    <div className="DeleteButton__confirmDialogControls">
                        <Button
                            className="DeleteButton__confirmBtn"
                            style={style}
                            disabled={state.loading}
                            onClick={onConfirmDelete}
                        >
                            Подвердить
                        </Button>
                        <Button
                            className="DeleteButton__cancelBtn"
                            disabled={state.loading}
                            onClick={onCancel}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>
        ) : (
                <React.Fragment>
                    <Button
                        style={style}
                        disabled={state.loading}
                        onClick={onConfirmDelete}
                    >
                        Подвердить
                </Button>
                    <Button disabled={state.loading} onClick={onCancel}>
                        Отмена
                </Button>
                </React.Fragment>
            )
    ) : (
            <Button
                className={classnames('DeleteButton', { [className]: className })}
                disabled={state.loading}
                onClick={() => window.confirm('Вы уверены?') ? onConfirmDelete() : onCancel()}
            >
                {children}
            </Button>
        );
}
