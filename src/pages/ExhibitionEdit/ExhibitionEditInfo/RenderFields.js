import React, {useEffect, useState} from "react";
import {connect} from 'formik';
import {FormGroup, FormField, FormControls} from "../../../components/Form";
import {exhibitionInfoForm} from "../config";
import {DEFAULT_IMG} from "../../../appConfig";


const RenderFields = ({formik, avatar, map, documents, dates, onCancel, setInitialValues}) => {
    const [avatarSrc, setAvatarSrc] = useState(avatar);
    const [mapSrc, setMapSrc] = useState(map);
    const [docs, setDocs] = useState(documents);
    const [docField, setDocField] = useState(null);
    const {fields} = exhibitionInfoForm;

    useEffect(() => {
        formik.setFieldValue('avatar', avatar);
        formik.setFieldValue('map', map);
    }, []);

    const handleValidate = value => {
        let error;
        if(!value) {
            error = 'Поле не может быть пустым';
        }
        return error;
    };

    const handleValidateUrl = value => {
        let error = handleValidate(value);
        if (!/^https?:\/\/.*/.test(value)) {
            error = 'Введите правильную ссылку';
        }
        return error;
    };

    const handleChangeImg = (e, type) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            formik.setFieldValue(type, file);
            type === 'avatar' ? setAvatarSrc(URL.createObjectURL(file)) : setMapSrc(URL.createObjectURL(file));
            e.target.value = '';
        } else {
            formik.setFieldValue('file', '');
            type === 'avatar' ? setAvatarSrc('') : setMapSrc('');
        }
    };

    const handleDeleteImg = type => {
        formik.setFieldValue(type, '');
        type === 'avatar' ? setAvatarSrc('') : setMapSrc('');
    };

    const addDocsFields = () => {
        const id = docs && docs.length ? docs[docs.length - 1].id + 1 : 1;

        setInitialValues({...formik.values, [`docs_url_${id}`]: '', [`docs_name_${id}`]: ''});

        setDocField({id, url: '', name: ''});
    };

    const removeDocsFields = () => {
        let newValues = {...formik.values};
        delete newValues[`docs_url_${docField.id}`];
        delete newValues[`docs_name_${docField.id}`];

        setInitialValues(newValues);
        setDocField(null);
    };

    const handleChangeDocs = (e, id, fieldName) => {
        let doc = {...docField};
        doc[fieldName] = e.target.value;
        formik.setFieldValue(`docs_${fieldName}_${id}`, e.target.value);
        setDocField(doc);
    };

    const handleAddDocs = id => {
        const doc = {...docField};
        const isValid = !(Object.keys(formik.errors).length && (formik.errors[`docs_url_${id}`] || formik.errors[`docs_name_${id}`]));

        if(isValid) {
            if(!doc.url) {
                formik.setFieldTouched(`docs_url_${doc.id}`,true, true);
            }
            if(!doc.name) {
                formik.setFieldTouched(`docs_name_${doc.id}`,true, true);
            }
            if(doc.url && doc.name) {
                setDocs(docs ? [...docs, doc] : [doc]);
                setDocField(null);
            }
        }
    };

    const handleDeleteDocs = id => {
        if(window.confirm('Вы действительно хотите удалить эту ссылку?')) {
            let newValues = {...formik.values};
            delete newValues[`docs_url_${id}`];
            delete newValues[`docs_name_${id}`];

            formik.setValues(newValues);
            setDocs(docs.filter(doc => doc.id !== id));
        }
    };

    return (
        <>
            <FormField
                {...fields.name}
            />
            <div className="exhibition-edit__img">
                <h5>Фото для выставки</h5>
                <label className="exhibition-edit__img-label">
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        className="exhibition-edit__img-input"
                        accept=".png, .jpg, .jpeg"
                        onChange={e => handleChangeImg(e, 'avatar')}
                    />
                    <img src={avatarSrc || DEFAULT_IMG.noImage} alt=""/>
                </label>
                {avatarSrc && <button className="exhibition-edit__img-delete" onClick={() => handleDeleteImg('avatar')} />}
            </div>
            <FormField
                {...fields.description}
            />
            {dates && !!dates.length &&
                dates.map(date =>
                    <FormGroup inline key={date.id} className="exhibition-edit__dates">
                        <span>{`${date.day < 10 ? '0'+date.day : date.day}.${date.month < 10 ? '0'+date.month : date.month}.${date.year}`}</span>
                        <FormField
                            name={`time_start_${date.id}`}
                            label="Начало"
                            type="time"
                            validate={handleValidate}
                        />
                        <FormField
                            name={`time_end_${date.id}`}
                            label="Окончание"
                            type="time"
                            validate={handleValidate}
                        />
                    </FormGroup>
                )
            }
            <FormGroup inline>
                <FormField
                    disabled={true}
                    {...fields.rank_types}
                />
                <FormField
                    disabled={true}
                    {...fields.class_types}
                />
                <FormField
                    disabled={true}
                    {...fields.breed_types}
                />
            </FormGroup>
            <FormGroup inline>
                <FormField
                    {...fields.schedule_url}
                />
                <FormField
                    {...fields.schedule_name}
                />
            </FormGroup>
            <FormGroup inline>
                <FormField
                    {...fields.catalog_url}
                />
                <FormField
                    {...fields.catalog_name}
                />
            </FormGroup>
            <div className="exhibition-edit__documents">
                <h3>Документы</h3>
                {docs && !!docs.length &&
                    <ul className="exhibition-edit__documents-list">
                        {docs.map(doc => (
                            <li className="exhibition-edit__documents-item" key={doc.id}>
                                <a href={doc.url} target="__blank" className="exhibition-edit__documents-link">{doc.name}</a>
                                <button
                                    className="exhibition-edit__documents-delete"
                                    type="button"
                                    onClick={() => handleDeleteDocs(doc.id)}
                                    title="Удалить"
                                >✕</button>
                            </li>
                        ))}
                    </ul>
                }
                {docField &&
                    <FormGroup inline>
                        <FormField
                            name={`docs_url_${docField.id}`}
                            label='Ссылка'
                            placeholder="https://"
                            isUrl={true}
                            value={docField.url}
                            onChange={e => handleChangeDocs(e, docField.id, 'url')}
                            validate={handleValidateUrl}
                        />
                        <FormField
                            name={`docs_name_${docField.id}`}
                            label='Название'
                            placeholder="Название документа"
                            value={docField.name}
                            onChange={e => handleChangeDocs(e, docField.id, 'name')}
                            validate={handleValidate}
                        />
                        <button
                            className="exhibition-edit__documents-submit btn btn-simple"
                            type="button"
                            onClick={() => handleAddDocs(docField.id)}
                        >Добавить</button>
                    </FormGroup>
                }
                {docField ?
                    <button className="exhibition-edit__documents-add" type="button" onClick={removeDocsFields}>
                        Отменить
                    </button> :
                    <button className="exhibition-edit__documents-add" type="button" onClick={addDocsFields}>
                        + Добавить ссылку
                    </button>
                }
            </div>
            <FormGroup inline>
                <FormField
                    disabled={true}
                    {...fields.city_id}
                />
                <FormField
                    {...fields.address}
                />
            </FormGroup>
            <div className="exhibition-edit__img">
                <h5>Схема проезда</h5>
                <label className="exhibition-edit__img-label">
                    <input
                        type="file"
                        name="map"
                        id="map"
                        className="exhibition-edit__img-input"
                        accept=".png, .jpg, .jpeg"
                        onChange={e => handleChangeImg(e, 'map')}
                    />
                    <img src={mapSrc || DEFAULT_IMG.noImage} alt=""/>
                </label>
                {mapSrc && <button className="exhibition-edit__img-delete" onClick={() => handleDeleteImg('map')} />}
            </div>
            <FormControls>
                <button type="button" className="btn btn-simple" onClick={onCancel}>Отмена</button>
                <button type="submit" className="btn btn-simple">Обновить</button>
            </FormControls>
        </>
    )
};

export default connect(React.memo(RenderFields));