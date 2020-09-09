import React, { useEffect, useState } from 'react';
import { connect } from 'formik';
import CustomChipList from "components/Form/Field/CustomChipList";
import { FormControls, FormField, FormGroup } from 'components/Form';
import { DEFAULT_IMG, BAD_SITES } from "../../../../appConfig";
import { Request } from "utils/request";


const RenderFields = ({ fields, breeds, formik, text, imgSrc, onCancel }) => {
    const [src, setSrc] = useState(imgSrc);
    const [advertTypes, setAdvertTypes] = useState([]);
    const { content, is_advert } = formik.values;

    useEffect(() => {
        formik.setFieldValue('content', text);
        formik.setFieldValue('file', imgSrc);
        Request({ url: '/api/article/article_ad_types' },
            data => setAdvertTypes(data.map(d => ({ text: d.name, value: d.id }))),
            error => console.log(error.response)
        )
    }, []);

    const handleChangeText = (e) => {
        let text = e.target.value;

        const regexp = /http:\/\/[^\s]+/g;
        Array.from(text.matchAll(regexp)).map(item => alert(`${item['0']} - небезопасная ссылка и будет удалена`));
        text = text.replace(regexp, '');

        BAD_SITES
            .map(x => new RegExp(`(https:\\/\\/)?${x}[^\\s]`, "g"))
            .forEach(x => {
                Array.from(text.matchAll(x)).map(item => alert(`${item['0']} - ссылка на внешний ресурс заблокирована`));
                text = text.replace(x, '');
            });

        formik.setFieldValue('content', text);
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
            <FormGroup inline>
                <FormField {...fields.is_advert} />
            </FormGroup>
            <FormGroup inline className={`article-edit__ad${!is_advert ? ' disabled' : ''}`}>
                <FormField {...fields.advert_breed_id} options={breeds} disabled={!is_advert} />
                <FormField {...fields.advert_cost} disabled={!is_advert} />
                <FormField {...fields.advert_number_of_puppies} disabled={!is_advert} />
            </FormGroup>
            <FormGroup inline className={`article-edit__ad${!is_advert ? ' disabled' : ''}`}>
                <CustomChipList {...fields.advert_type_id} options={advertTypes} disabled={!is_advert} />
            </FormGroup>
            <div className="article-edit__text">
                <FormField
                    {...fields.content}
                    onChange={handleChangeText}
                    maxLength="4096"
                    rows="15"
                />
            </div>
            <span className="article-edit__content-length">{content ? `осталось ${4096 - content.length} знаков` : ''}</span>
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
                    <img src={src || DEFAULT_IMG.noImage} alt="" />
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
