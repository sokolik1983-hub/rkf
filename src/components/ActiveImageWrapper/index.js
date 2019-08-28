import React, {useEffect, useRef, useState} from 'react'
import {object, string, func} from 'prop-types'
import axios from "axios";
import {getHeaders} from "utils/request";
import {objectNotEmpty} from "utils/index";

import Button from 'components/Button'


function ActiveImageWrapper({
                                requestUrl,
                                requestParams,
                                onSubmitSuccess,
                                children
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
            setState({...state, loading: true});
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
            setState({...state, loading: false});


            clear()
        }
    };


    const getChildElSize = () => {
        console.log('onSubmitSuccess', onSubmitSuccess)
        //console.dir(children);
    };
    useEffect(() => getChildElSize(), []);
    const renderPreview = () => {
        // TODO throw error if not single child
        if (children.type === 'img') {
            // if img element replace it's src
            return React.cloneElement(children, {src: state.imagePreview})
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
                style={{display: 'none'}}
                ref={inputEl}
                onChange={onInputChange}
                type="file"
            />
            {state.imagePreview ? renderPreview() : children}
            <div className="ActiveImageWrapper__controls">
                <Button condensed disabled={state.loading} onClick={onEdit}>
                    Изменить
                </Button>
                {
                    state.imagePreview ?
                        <Button disabled={state.loading} onClick={onSubmit}>Заменить</Button>
                        :
                        null
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