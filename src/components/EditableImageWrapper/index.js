import React, {useState, useEffect, useRef} from 'react'
import {string, object} from 'prop-types'
import Button from 'components/Button'
import classnames from 'classnames'
import {getHeaders} from "../../utils/request";
import axios from "axios";
import {objectNotEmpty} from "../../utils";

function EditableImageWrapper({
                                  requestUrl,
                                  requestParams,
                                  onSubmitSuccess,
                                  children
                              }) {

    const inputEl = useRef(null);
    const initialState = {
        isEdit: false,
        imagePreview: null,
        inputValue: null,
    };

    const [state, setState] = useState(initialState);
    const onEdit = () => {
        setState({...state, isEdit: true});
        inputEl.current.click()
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
        }
    };

    const onSubmit = async () => {
        if (state.inputValue) {
            const data = new FormData(requestParams);
            data.append('file', state.inputValue);
            if (objectNotEmpty(requestParams)) {
                Object.keys(requestParams).forEach(key => data.append(key, requestParams[key]))
            }
            const config = {
                url: requestUrl,
                method: "POST",
                data: data,
                headers: getHeaders(true)
            };

            const response = await axios(config);
            onSubmitSuccess(response.data.result);
            clear()
        }
    };


    const getChildElSize = () => {
        console.dir(children);
    };
    useEffect(() => getChildElSize(), []);
    const renderPreview = () => {
        if (children.type === 'img') {
            return React.cloneElement(children, {src: state.imagePreview})
        } else if (children.props.style.backgroundImage) {
            console.log(children.props.style.backgroundImage)
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
                style={{display: 'none'}}
                ref={inputEl}
                onChange={onInputChange}
                type="file"
            />
            {state.imagePreview ? renderPreview() : children}
            <div className="EditableImageWrapper__controls">
                <Button onClick={onEdit}>Изменить</Button>
                {state.imagePreview ? <Button onClick={onSubmit}>Заменить</Button> : null}
            </div>
        </>
    )
}

EditableImageWrapper.propTypes = {
    style: object,
    //imageUrl: string.isRequired,
    requestUrl: string.isRequired,
    requestParams: object,
    type: string,
    className: string,
};

export default EditableImageWrapper