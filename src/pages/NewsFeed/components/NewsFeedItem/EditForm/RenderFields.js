import React, { useEffect, useState } from "react";
import getYouTubeID from "get-youtube-id";
import { connect } from "formik";
import { Link } from "react-router-dom";
import CustomChipList from "components/Form/Field/CustomChipList";
import { FormControls, FormField, FormGroup, SubmitButton } from "components/Form";
import AddVideoLink from "components/UserAddArticle/AddVideoLink";
import AttachFile from "components/UserAddArticle/AttachFile";
import { BAD_SITES } from "appConfig";
import { Request } from "utils/request";
import Modal from "components/Modal";
import LightTooltip from "components/LightTooltip";
import { SvgIcon } from "@progress/kendo-react-common";
import { filePdf, trash } from "@progress/kendo-svg-icons";
import moment from "moment";


const RenderFields = ({ fields, breeds, formik, text, imgSrc, videoLink, docs, setDocs, categories, setCategories, onCancel, isMating, setIsMating, setIsImageDelete }) => {
    const [src, setSrc] = useState(imgSrc);
    const [video, setVideo] = useState(videoLink);
    const [advertTypes, setAdvertTypes] = useState([]);
    const [modalType, setModalType] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { content, is_advert } = formik.values;

    useEffect(() => {
        formik.setFieldValue('content', text);
        formik.setFieldValue('file', imgSrc);
        formik.setFieldValue('video_link', videoLink);

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
        setIsImageDelete(true);
    };

    const handleDeleteImg = () => {
        formik.setFieldValue('file', '');
        setSrc('');
        setIsImageDelete(true);
    };

    const handleAddVideoLink = link => {
        formik.setFieldValue('video_link', link);
        setVideo(link);
    };

    const handleDeleteVideoLink = () => {
        formik.setFieldValue('video_link', '');
        setVideo('');
    };

    const handleDeleteDocument = index => {
        console.log('here');
        setDocs([...docs].filter((item, i) => i !== index));
    };

    const closeModal = () => {
        setModalType('');
        setShowModal(false);
    };

    return (
        <>
            <div className="article-edit__text">
                <FormField
                    {...fields.content}
                    onChange={handleChangeText}
                    maxLength="4096"
                    rows="5"
                />
                {content &&
                    <span className="article-edit__content-length">
                        {`осталось ${4096 - content.length} знаков`}
                    </span>
                }
            </div>
            <div className="article-edit__media">
                {src &&
                    <div className="article-edit__img" style={{ backgroundImage: `url(${src})` }}>
                        <button className="article-edit__img-delete" onClick={handleDeleteImg}>
                            <SvgIcon icon={trash} size="default" />
                        </button>
                    </div>
                }
                {video &&
                    <div className="article-edit__img" style={{ backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeID(video)}/mqdefault.jpg)` }}>
                        <button className="article-edit__img-delete" onClick={handleDeleteVideoLink}>
                            <SvgIcon icon={trash} size="default" />
                        </button>
                    </div>
                }
            </div>
            <div className="article-edit__controls">
                {!src &&
                    <LightTooltip title="Прикрепить изображение" enterDelay={200} leaveDelay={200}>
                        <div className="article-edit__attach-img">
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="article-edit__img-input"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleChangeImg}
                            />
                            <label htmlFor="file" className="article-edit__attach-img-label"></label>
                        </div>
                    </LightTooltip>
                }
                {!is_advert && !video &&
                    <LightTooltip title="Прикрепить ссылку на YouTube" enterDelay={200} leaveDelay={200}>
                        <button
                            className="article-edit__attach-video"
                            type="button"
                            onClick={() => {
                                setModalType('video');
                                setShowModal(true);
                            }}
                        ></button>
                    </LightTooltip>
                }
                {docs.length < 3 &&
                    <LightTooltip title="Прикрепить PDF" enterDelay={200} leaveDelay={200}>
                        <button
                            className="article-edit__attach-pdf"
                            type="button"
                            onClick={() => {
                                setModalType('pdf');
                                setShowModal(true);
                            }}
                        ></button>
                    </LightTooltip>
                }
            </div>
            {!!docs.length &&
                <div className="article-edit__documents">
                    <ul className="article-edit__documents-list">
                        {docs.map((item, i) =>
                            <li className="DocumentItem" key={i}>
                                <Link
                                    to={`/docs/${item.id}`}
                                    target="_blank"
                                    className="d-flex align-items-center"
                                    rel="noopener noreferrer"
                                >
                                    <SvgIcon icon={filePdf} size="default" />
                                    <div className="d-flex flex-column">{item.name}<span className="DocumentItem__date">
                                        {`Добавлено ${moment(item.create_date).format('D MMMM YYYY')} в ${moment(item.create_date).format('HH:mm')}`}
                                    </span>
                                    </div>
                                </Link>
                                <button
                                    className="DocumentItem__delete-btn"
                                    type="button"
                                    title="Удалить"
                                    onClick={() => handleDeleteDocument(i)}
                                >
                                    <SvgIcon icon={trash} size="default" />
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            }
            {is_advert &&
                <div className="article-edit__advert">
                    <FormGroup inline className="article-edit__ad">
                        <FormField {...fields.advert_breed_id} options={breeds} />
                        <FormField {...fields.advert_cost} />
                        {!isMating && <FormField {...fields.advert_number_of_puppies} />}
                    </FormGroup>
                    <FormGroup inline className="article-edit__ad">
                        <CustomChipList {...fields.advert_type_id} options={advertTypes} setIsMating={setIsMating} />
                    </FormGroup>
                </div>
            }
            <FormControls className="article-edit__form-controls">
                {/* <button type="button" className="btn btn-simple" onClick={onCancel}>Отмена</button> */}
                <SubmitButton
                    type="submit"
                    className={`k-button k-primary ${formik.isValid ? '' : 'disabled'}`}
                >
                    Сохранить
                </SubmitButton>
            </FormControls>
            {showModal &&
                <Modal
                    className="article-edit__modal"
                    showModal={showModal}
                    handleClose={() => modalType && modalType === 'video' ? closeModal() : null}
                    handleX={closeModal}
                    headerName={modalType === 'video' ? 'Добавление видео' : 'Добавление документа'}
                >
                    {modalType === 'video' &&
                        <AddVideoLink
                            setVideoLink={handleAddVideoLink}
                            closeModal={closeModal}
                        />
                    }
                    {modalType === 'pdf' &&
                        <AttachFile
                            documents={docs}
                            setDocuments={setDocs}
                            categories={categories}
                            setCategories={setCategories}
                            closeModal={closeModal}
                        />
                    }
                </Modal>
            }
        </>
    )
};

export default connect(React.memo(RenderFields));
