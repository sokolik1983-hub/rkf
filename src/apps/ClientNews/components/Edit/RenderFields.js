import React, { useState, useEffect } from 'react';
import { connect } from 'formik';
import {
    SubmitButton,
    FormControls,
    FormGroup,
    FormField,
} from 'components/Form'
import ImagePreview from 'components/ImagePreview';

const RenderFields = ({ fields, formik, content, file, id, onEditCancel }) => {
    const [src, setSrc] = useState('');

    useEffect(() => {
        setSrc(file);
        formik.setFieldValue('content', content);
        formik.setFieldValue('file', file);
    }, []);

    const handleChange = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            formik.setFieldValue('file', file);
            setSrc(URL.createObjectURL(file));
            e.target.value = '';
        } else {
            formik.setFieldValue('file', null);
            setSrc(null);
        }
    };

    const handleClose = () => {
        formik.setFieldValue('file', null);
        setSrc(null);
    }

    const handleKeyDown = (e) => {
        const textarea = e.target;
        var offset = textarea.offsetHeight - textarea.clientHeight;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + offset + 'px';
        textarea.value.length > 3000
            ? alert('Превышено максимальное кол-во символов (3000 симв.)')
            : formik.setFieldValue('content', textarea.value);
    }
    return (
        <>
            <input
                type="file"
                name={`file-${id}`}
                id={`file-${id}`}
                className="ArticleEditForm__inputfile"
                onChange={handleChange}
            />


            <FormGroup className="ArticleEditForm__wrap">
                <FormField
                    {...fields.content}
                    onChange={handleKeyDown}
                    maxLength="3001"
                    value={formik.values.content}
                    rows="3"
                />
            </FormGroup>
            <React.Fragment>
                <div className="ImagePreview__wrap">
                    {
                        src ? (<> <ImagePreview src={src} /> <img src="/static/icons/file-cross.svg" className="ImagePreview__close" alt="" onClick={handleClose} /> </>) : null
                    }
                </div>
                <FormControls>
                    <div className="ArticleEditForm__attach">

                        <label htmlFor={`file-${id}`} className="ArticleEditForm__labelfile"></label>
                    </div>
                    <div>
                        <button type="button" className="btn ArticleEditForm__button-cancel" onClick={onEditCancel}>Отмена</button>
                        <SubmitButton type="submit" className="btn-simple btn-lg">Обновить</SubmitButton>
                    </div>
                </FormControls>
            </React.Fragment>
        </>
    );
}

export default connect(RenderFields);