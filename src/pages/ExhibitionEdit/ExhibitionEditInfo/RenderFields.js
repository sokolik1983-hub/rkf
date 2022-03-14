import React, {useEffect, useState} from "react";
import {connect} from 'formik';
import {FormGroup, FormField, FormControls} from "../../../components/Form";
import {exhibitionInfoForm} from "../config";
import {DEFAULT_IMG} from "../../../appConfig";
import {acceptType} from "../../../utils/checkImgType";
import Contacts from "./components/Contacts";
import Alert from "../../../components/Alert";
import Modal from '../../../components/Modal';
import {blockContent} from '../../../utils/blockContent';
import Button from '../../../components/Button';
import { Request } from "utils/request";


const RenderFields = ({
                          formik,
                          avatar,
                          map,
                          documents,
                          dates,
                          onCancel,
                          setInitialValues,
                          exhibitionId,
                      }) => {
    const [avatarSrc, setAvatarSrc] = useState(avatar);
    const [alert, setAlert] = useState(false);
    const [mapSrc, setMapSrc] = useState(map);
    const [docs, setDocs] = useState(documents);
    const [judge, setJudge] = useState([])
    const [docField, setDocField] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const {fields} = exhibitionInfoForm;
    const {
        phones,
        emails,
    } = formik.values;

    useEffect(() => {
        formik.setFieldValue('avatar', avatar);
        formik.setFieldValue('map', map);

        getJudgeList();
    }, []);

    useEffect(() => {
        if (showModal) {
            blockContent(true)
        } else {
            blockContent(false)
        }
    }, [showModal]);

    const handleValidate = value => {
        let error;
        if (!value) {
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
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue(type, file);
            type === 'avatar' ? setAvatarSrc(URL.createObjectURL(file)) : setMapSrc(URL.createObjectURL(file));
            e.target.value = '';
        } else {
            formik.setFieldValue('file', '');
            type === 'avatar' ? setAvatarSrc('') : setMapSrc('');
        }
        acceptType(file).then(descision => {
            if (!descision) {
                window.alert(`Поддерживаются только форматы .jpg, .jpeg`);
                type === 'avatar' ? setAvatarSrc(avatar) : setMapSrc(map);
            }
        });
        if (file && file.size > 20971520) {
            setAlert(true);
            type === 'avatar' ? setAvatarSrc(avatar) : setMapSrc(map);
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

        if (isValid) {
            if (!doc.url) {
                formik.setFieldTouched(`docs_url_${doc.id}`, true, true);
            }
            if (!doc.name) {
                formik.setFieldTouched(`docs_name_${doc.id}`, true, true);
            }
            if (doc.url && doc.name) {
                setDocs(docs ? [...docs, doc] : [doc]);
                setDocField(null);
            }
        }
    };

    const handleDeleteDocs = id => {
        if (window.confirm('Вы действительно хотите удалить эту ссылку?')) {
            let newValues = {...formik.values};
            delete newValues[`docs_url_${id}`];
            delete newValues[`docs_name_${id}`];
            formik.setValues(newValues);
            setDocs(docs.filter(doc => doc.id !== id));
        }
    };

    const getJudgeList = async () => {
        await Request({
            url: `/api/exhibitions/common/relevant_judges?id=${exhibitionId}`,
            method: 'GET'
        },
            data => setJudge(data),
            error => console.log(error))
    }

    return (
        <>
            <FormField
                {...fields.name}
            />
            <div className="exhibition-edit__img">
                <h5>Фото для мероприятия</h5>
                <label className="exhibition-edit__img-label">
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        className="exhibition-edit__img-input"
                        accept=".jpg, .jpeg"
                        onChange={e => handleChangeImg(e, 'avatar')}
                    />
                    <img src={avatarSrc || DEFAULT_IMG.noImage} alt=""/>
                </label>
                {avatarSrc &&
                    <button className="exhibition-edit__img-delete" onClick={() => handleDeleteImg('avatar')}/>}
            </div>
            <FormField
                {...fields.description}
            />
            {dates && !!dates.length &&

                <div>
                    <h5>Даты проведения мероприятия</h5>
                    {dates.map(date =>
                        <FormGroup inline key={date.id} className="exhibition-edit__dates">
                            <span>{`${date.day < 10 ? '0' + date.day : date.day}.${date.month < 10 ? '0' + date.month : date.month}.${date.year}`}</span>
                            <FormField
                                name={`time_start_${date.id}`}
                                label="Время работы с"
                                type="time"
                                validate={handleValidate}
                            />
                            <FormField
                                name={`time_end_${date.id}`}
                                label="До"
                                type="time"
                                validate={handleValidate}
                            />
                        </FormGroup>
                    )}
                </div>
            }
            <FormGroup inline className="exhibition-edit__rank">
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
            <div className="exhibition-edit__judge">
                <h5>Судья/специалист</h5>
                <Button
                    primary={true}
                    onClick={() => setShowModal(true)}
                >
                    Подобрать судью
                </Button>
            </div>
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
            <Contacts
                phones={phones}
                emails={emails}
                errors={formik.errors}/>
            <div className="exhibition-edit__documents">
                <h3>Документы</h3>
                {docs && !!docs.length &&
                    <ul className="exhibition-edit__documents-list">
                        {docs.map(doc => (
                            <li className="exhibition-edit__documents-item" key={doc.id}>
                                <a href={doc.url} target="__blank"
                                   className="exhibition-edit__documents-link">{doc.name}</a>
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
            <FormField {...fields.address_additional_info} />
            <div className="exhibition-edit__img">
                <h5>Схема проезда</h5>
                <label className="exhibition-edit__img-label">
                    <input
                        type="file"
                        name="map"
                        id="map"
                        className="exhibition-edit__img-input"
                        accept=".jpg, .jpeg"
                        onChange={e => handleChangeImg(e, 'map')}
                    />
                    <img src={mapSrc || DEFAULT_IMG.noImage} alt=""/>
                </label>
                {mapSrc && <button className="exhibition-edit__img-delete" onClick={() => handleDeleteImg('map')}/>}
            </div>
            <FormField {...fields.additional_info} />
            <FormControls>
                <button type="button" className="btn btn-simple" onClick={onCancel}>Отмена</button>
                <button type="submit" className="btn btn-simple">Обновить</button>
            </FormControls>
            {alert &&
                <Alert
                    title="Внимание!"
                    text="Размер изображения не должен превышать 20 мб."
                    autoclose={5}
                    onOk={() => setAlert(false)}
                />
            }
            {showModal &&
                <Modal showModal={showModal}
                       handleClose={() =>setShowModal(false)}
                       handleX={() => {setShowModal(false)}}
                       noBackdrop={true}
                       iconName="owner2-white"
                       headerName="Выбор судьи/специалиста"
                       className="exhibition-edit__judge__modal"
            >
                    {judge ?
                        <>
                            <h3>Список судей/специалистов</h3>
                            <ul className="exhibition-edit__judge-list">
                                {judge.map(data =>
                                    <li key={data.id}>
                                        <span>
                                            №{data.cert_number}
                                        </span>
                                        <span>
                                            {data.last_name && `${data.last_name} `}
                                            {data.first_name && `${data.first_name} `}
                                            {data.second_name}
                                        </span>
                                        <span>
                                            {data.city_name}
                                        </span>
                                        <span>
                                            {data.all_breeder &&
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_2219_2838)">
                                                        <path d="M10 8.74758C10 8.74758 5.33984 8.56635 5.33984 14.4952C5.33984 18.534 8.21363 15.5825 10 15.5825" fill="#72839C"/>
                                                        <path d="M10 8.74758C10 8.74758 14.6602 8.56635 14.6602 14.4952C14.6602 18.534 11.7864 15.5825 10 15.5825" fill="#72839C"/>
                                                        <path d="M7.78245 7.86058C8.65205 7.79263 9.27212 6.65123 9.16742 5.31119C9.06271 3.97115 8.27289 2.93992 7.40329 3.00786C6.53369 3.07581 5.91361 4.21721 6.01832 5.55725C6.12302 6.89729 6.91285 7.92852 7.78245 7.86058Z" fill="#72839C"/>
                                                        <path d="M4.29515 10.1055C5.06869 9.84864 5.37435 8.67234 4.97787 7.47811C4.58138 6.28387 3.63289 5.52394 2.85935 5.78076C2.08582 6.03757 1.78015 7.21388 2.17664 8.40811C2.57312 9.60234 3.52161 10.3623 4.29515 10.1055Z" fill="#72839C"/>
                                                        <path d="M13.983 5.54655C14.0877 4.20651 13.4676 3.06511 12.598 2.99717C11.7284 2.92922 10.9386 3.96046 10.8339 5.3005C10.7292 6.64054 11.3492 7.78193 12.2188 7.84988C13.0884 7.91782 13.8783 6.88659 13.983 5.54655Z" fill="#72839C"/>
                                                        <path d="M17.8208 8.41997C18.2172 7.22573 17.9116 6.04943 17.138 5.79261C16.3645 5.5358 15.416 6.29573 15.0195 7.48996C14.623 8.6842 14.9287 9.8605 15.7022 10.1173C16.4758 10.3741 17.4243 9.6142 17.8208 8.41997Z" fill="#72839C"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2219_2838">
                                                            <rect width="16" height="13.6181" fill="white" transform="translate(2 3)"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            }
                                        </span>
                                    </li>
                                )}
                            </ul>
                            <Button primary={true}>
                                Выбрать
                            </Button>
                        </>:
                        <p>Подходящих судей не найдено</p>}
            </Modal>
}
        </>
    )
};

export default connect(React.memo(RenderFields));