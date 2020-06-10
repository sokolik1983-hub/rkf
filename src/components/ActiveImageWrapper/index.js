import React, { useEffect, useRef, useState } from 'react'
import { object, string, func } from 'prop-types'
import axios from "axios";
import { getHeaders } from "utils/request";
import { objectNotEmpty } from "utils/index";

import Button from 'components/Button'


function ActiveImageWrapper({
    requestUrl,
    requestParams,
    onSubmitSuccess,
    children,
    additionalParams,
    bindSubmitForm,
    club_id,
    backgroundImage,
    onChangeFunc
}) {

    const inputEl = useRef(null);
    const initialState = {
        loading: false,
        isEdit: false,
        imagePreview: null,
        inputValue: null,
    };

    const [state, setState] = useState(initialState);
    const btnStyle = {
        display: 'flex',
        padding: '6px 0',
        color: '#3366FF',
        flex: '1 0'
    };
    const delBtnStyle = {
        display: 'flex',
        fontSize: 'smaller',
        padding: '6px 0',
        color: 'red'
    };
    const onEdit = () => {
        setState({ ...state, isEdit: true });
        inputEl.current.click()
    };
    const onDelete = async () => {
        try {
            setState({ ...state, loading: true });
            await axios({
                url: `/api/HeaderPicture/${club_id}`,
                method: "DELETE",
                headers: getHeaders(true)
            });
            setState({
                ...state,
                inputValue: null,
                imagePreview: null
            });
            onSubmitSuccess({ image_link: null });
            setState({ ...state, loading: false });

        } catch (error) {
            alert('Произошла ошибка');
            console.log(error);
        }
    };

    const clear = () => {
        setState(initialState)
    };

    const onInputChange = e => {
        if (e.target.files) {
            const inputValue = e.target.files[0];
            setState({
                ...state,
                inputValue: inputValue,
                imagePreview: URL.createObjectURL(inputValue)
            })
            onChangeFunc && onChangeFunc(inputValue);
        }
    };

    const onSubmit = async () => {
        if (state.inputValue) {
            setState({ ...state, loading: true });
            const data = new FormData(requestParams);
            data.append('file', state.inputValue);
            if (objectNotEmpty(requestParams)) {
                Object.keys(requestParams).forEach(key => data.append(key, requestParams[key]))
            }
            if (additionalParams) {
                Object.keys(additionalParams).forEach(key => data.append(key, additionalParams[key]))
            }
            const config = {
                url: requestUrl,
                method: "POST",
                data: data,
                headers: getHeaders(true)
            };
            const response = await axios(config);
            onSubmitSuccess(response.data.result);
            setState({ ...state, loading: false });


            clear()
        }
    };

    if (bindSubmitForm) bindSubmitForm(onSubmit);

    const getChildElSize = () => {
        // console.log('onSubmitSuccess', onSubmitSuccess)
        //console.dir(children);
    };
    useEffect(() => getChildElSize(), []);
    const renderPreview = () => {
        // TODO throw error if not single child
        if (children.type === 'img') {
            // if img element replace it's src
            return React.cloneElement(children, { src: state.imagePreview })
        }
        if (children.props.style.backgroundImage) {
            // if not img element but have backgroundImage style prop replace it
            return React.cloneElement(children, {
                style: {
                    ...children.props.style,
                    backgroundImage: `url(${state.imagePreview})`
                }
            })
        }
        return children
    };

    return (
        <>
            <input
                style={{ display: 'none' }}
                ref={inputEl}
                onChange={onInputChange}
                type="file"
                accept=".jpg,.png,.gif"
            />
            <div onClick={onEdit}>{state.imagePreview ? renderPreview() : children}</div>
            <div className="ActiveImageWrapper__controls">
                <Button
                    style={btnStyle}
                    className="btn-transparent"
                    condensed
                    disabled={state.loading}
                    onClick={onEdit}>
                    Изменить
                </Button>
                {club_id && backgroundImage &&
                    <Button
                        style={delBtnStyle}
                        className="btn-transparent"
                        condensed
                        disabled={state.loading}
                        onClick={onDelete}>
                        Удалить
                    </Button>
                }
                {/* {state.imagePreview &&
                    <Button className="btn-simple" disabled={state.loading} onClick={onSubmit}>Заменить</Button>
                } */}
            </div>
        </>
    )
}

ActiveImageWrapper.propTypes = {
    onSubmitSuccess: func,
    requestUrl: string.isRequired,
    requestParams: object,
    children: object.isRequired,
};

export default ActiveImageWrapper