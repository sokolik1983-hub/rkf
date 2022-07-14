import React, { useRef, useState } from "react";
import { object, string, func } from "prop-types";
import axios from "axios";
import { getHeaders } from "utils/request";
import { objectNotEmpty } from "utils/index";
import { acceptType } from "../../utils/checkImgType";
import Button from "components/Button";

import "./index.scss";


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

    const onEdit = () => {
        setState({ ...state, isEdit: true });
        inputEl.current.click()
    };
    const onDelete = async () => {
        try {
            setState({ ...state, loading: true });
            await axios({
                url: `/api/HeaderPicture`,
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
        const file = e.target.files[0];

        if (file) {
            setState({
                ...state,
                inputValue: file,
                imagePreview: URL.createObjectURL(file)
            })
            onChangeFunc && onChangeFunc(file);
        }
        acceptType(file).then(descision => {
            if (!descision) {
                window.alert(`Поддерживаются только форматы .jpg, .jpeg`);
                setState({
                    ...state,
                    inputValue: '',
                });
            }
        });
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
                className="active-image-wrapper__input"
                ref={inputEl}
                onChange={onInputChange}
                type="file"
                accept=".jpg,.jpeg"
            />
            <div onClick={onEdit}>
                {state.imagePreview ? renderPreview() : children}
            </div>
            <div className="active-image-wrapper__controls">
                <Button
                    className="active-image-wrapper__button btn-transparent"
                    condensed
                    disabled={state.loading}
                    onClick={onEdit}>
                    Изменить
                </Button>
                {club_id && backgroundImage &&
                    <Button
                        className="active-image-wrapper__del-button btn-transparent"
                        condensed
                        disabled={state.loading}
                        onClick={onDelete}>
                        Удалить
                    </Button>
                }
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