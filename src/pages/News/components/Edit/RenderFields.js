import React, {useEffect, useState} from 'react';
import {connect} from 'formik';
import {FormControls, FormField} from '../../../../components/Form';
import {DEFAULT_IMG} from "../../../../appConfig";


const RenderFields = ({fields, formik, text, imgSrc, onCancel}) => {
    const [src, setSrc] = useState(imgSrc);
    const {content} = formik.values;

    useEffect(() => {
        formik.setFieldValue('content', text);
        formik.setFieldValue('file', imgSrc);
    }, []);

    const handleChangeText = (e) => {
        const textarea = e.target;
        
        const regexp = /http:\/\/[^\s]+/g;
        Array.from(e.target.value.matchAll(regexp)).map(item => alert(`${item['0']} - небезопасная ссылка и будет удалена`));
        formik.setFieldValue('content', e.target.value.replace(regexp, ''));
    };

    const handleChangeImg = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            formik.setFieldValue('file', file);
            setSrc(URL.createObjectURL(file));
            e.target.value = '';
        } else {
            formik.setFieldValue('file', '');
            setSrc('');
        }
    };

    const handleDeleteImg = () => {
        formik.setFieldValue('file', '');
        setSrc('');
    };

    return (
        <>
            <div className="article-edit__text">
                <FormField
                    {...fields.content}
                    value={formik.values.content || ''}
                    onChange={handleChangeText}
                    maxLength="4096"
                    rows="15"
                />
            </div>
            <span className="article-edit__content-length">{content ? `осталось ${4096 - content.length} знаков`:''}</span>
            <div className="article-edit__img">
                <label className="article-edit__img-label">
                    <input
                        type="file"
                        name="file"
                        id="file"
                        className="article-edit__img-input"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleChangeImg}
                    />
                    <img src={src || DEFAULT_IMG.noImage} alt=""/>
                </label>
                {src && <button className="article-edit__img-delete" onClick={handleDeleteImg} />}
            </div>
            <FormControls>
                <button type="button" className="btn btn-simple" onClick={onCancel}>Отмена</button>
                <button type="submit" className="btn btn-simple">Обновить</button>
            </FormControls>
        </>
    )
};

export default connect(React.memo(RenderFields));
