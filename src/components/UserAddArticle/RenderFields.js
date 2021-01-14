import React, { useState, useEffect } from "react";
import getYouTubeID from "get-youtube-id";
import { connect } from "formik";
import Modal from "../Modal";
import { SubmitButton, FormControls, FormGroup, FormField } from '../Form';
import CustomCheckbox from "../Form/CustomCheckbox";
import CustomNumber from "../Form/Field/CustomNumber";
import CustomChipList from "../Form/Field/CustomChipList";
import AddVideoLink from "./AddVideoLink";
import AttachFile from "./AttachFile";
import ClientAvatar from "../ClientAvatar";
import ImagePreview from "../ImagePreview";
import { DEFAULT_IMG, BAD_SITES } from "../../appConfig";
import { Request } from "../../utils/request";
import LightTooltip from "../LightTooltip";
import { trash } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";
import { useFocus } from "../../shared/hooks";
import OutsideClickHandler from "react-outside-click-handler";
import useIsMobile from "../../utils/useIsMobile";


const RenderFields = ({ fields, logo, formik, isAd, setIsAd, videoLink, setVideoLink, documents, categories, setDocuments, setCategories, isMating, setIsMating, setLoadFile }) => {
    const [src, setSrc] = useState('');
    const [advertTypes, setAdvertTypes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const { focus, setFocused, setBlured } = useFocus(false);
    const isMobile = useIsMobile();

    const { content, file } = formik.values;

    useEffect(() => {
        Request({ url: '/api/article/article_ad_types' },
            data => setAdvertTypes(data.map(d => ({ text: d.name, value: d.id }))),
            error => console.log(error.response)
        )
    }, []);

    const handleChange = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            formik.setFieldValue('file', file);
            setSrc(URL.createObjectURL(file));
            e.target.value = '';
            setLoadFile(true);
        } else {
            formik.setFieldValue('file', '');
            setSrc('');
            setLoadFile(false);
        }
    };

    const addVideoLink = link => {
        formik.setFieldValue('video_link', link);
        setVideoLink(link);
    };

    const removeVideoLink = () => {
        formik.setFieldValue('video_link', '');
        setVideoLink('');
    };

    const deleteDocument = index => {
        if (window.confirm('Вы действительно хотите удалить этот файл?')) {
            setDocuments([...documents].filter((item, i) => i !== index));
        }
    };

    const handleClose = () => {
        formik.setFieldValue('file', '');
        setSrc('');
        setLoadFile(false);
    };

    const handleKeyDown = e => {
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

    const addRow = () => {
        let charactersInRow = 90;
        let maxNumberOfRows = 11;
        let reservedRow = 2;
        let numberOfRows = Math.ceil(content.length / charactersInRow) + reservedRow;

        if (numberOfRows < maxNumberOfRows) {
            return numberOfRows;
        } else {
            return maxNumberOfRows;
        }
    };

    const closeModal = () => {
        setModalType('');
        setShowModal(false);
    };

    const handleOutsideClick = () => {
        !content && setBlured();
    };

    return (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            <div className={focus ? `_focus` : `_no_focus`}>
                <FormGroup className="ArticleCreateForm__wrap">
                    <ClientAvatar size={40} avatar={logo || DEFAULT_IMG.clubAvatar} />
                    <FormField
                        {...fields.content}
                        onChange={handleKeyDown}
                        onFocus={setFocused}
                        maxLength="1000"
                        value={content ? content : ''}
                        rows={content ? addRow() : focus ? "3" : "1"}
                        className={focus ? `_textarea_focus` : ``}
                    />
                </FormGroup>
                <div className="ArticleCreateForm__controls-wrap">
                    <FormControls className={`ArticleCreateForm__controls ${focus ? ' _focus' : ''}`}>
                        <LightTooltip title="Прикрепить изображение" enterDelay={200} leaveDelay={200}>
                            <label htmlFor="file" className="ArticleCreateForm__labelfile" />
                        </LightTooltip>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            accept=".jpg, .jpeg"
                            className="ArticleCreateForm__inputfile"
                            onChange={handleChange}
                        />
                        {!videoLink &&
                            <LightTooltip title="Прикрепить ссылку на YouTube" enterDelay={200} leaveDelay={200}>
                                <button
                                    className="ArticleCreateForm__attach-video"
                                    type="button"
                                    onClick={() => {
                                        setModalType('video');
                                        setShowModal(true);
                                    }}
                                />
                            </LightTooltip>
                        }
                        <LightTooltip title="Прикрепить PDF" enterDelay={200} leaveDelay={200}>
                            <button
                                className="ArticleCreateForm__attach-pdf"
                                type="button"
                                onClick={() => {
                                    setModalType('pdf');
                                    setShowModal(true);
                                }}
                            />
                        </LightTooltip>
                        {!videoLink && focus &&
                            <CustomCheckbox
                                id="ad"
                                label="Объявление"
                                className="ArticleCreateForm__ad"
                                checked={isAd}
                                onChange={() => setIsAd(!isAd)}
                            />
                        }
                    </FormControls>
                    {content && !isMobile &&
                        <div className="ArticleCreateForm__length-hint">
                            <span className="ArticleCreateForm__content-length">
                                {`осталось ${1000 - content.length} знаков`}
                            </span>
                        </div>
                    }
                </div>
            </div>
            {isAd && focus &&
                <div className={`ArticleCreateForm__advert-wrap ${isMobile ? '' : ' _desktop'}`}>
                    <FormGroup inline>
                        <CustomChipList {...fields.advert_type_id} options={advertTypes} setIsMating={setIsMating} />
                    </FormGroup>
                    <FormGroup inline className="ArticleCreateForm__advert">
                        <FormField {...fields.advert_breed_id} />
                        <CustomNumber {...fields.advert_cost} />
                        {!isMating && <CustomNumber {...fields.advert_number_of_puppies} />}
                    </FormGroup>
                </div>
            }
            <>
                {file &&
                    <div className="ImagePreview__wrap">
                        <ImagePreview src={src} />
                        <img src="/static/icons/file-cross.svg"
                            className="ImagePreview__close"
                            alt=""
                            onClick={handleClose}
                        />
                    </div>
                }
                {videoLink &&
                    <div className="ImagePreview__wrap">
                        <ImagePreview src={`https://img.youtube.com/vi/${getYouTubeID(videoLink)}/mqdefault.jpg`} />
                        <img src="/static/icons/file-cross.svg"
                            className="ImagePreview__close"
                            alt=""
                            onClick={removeVideoLink}
                        />
                    </div>
                }
                {!!documents.length &&
                    <div className="ArticleCreateForm__documents">
                        <h4 className="ArticleCreateForm__documents-title">Прикреплённые файлы:</h4>
                        <ul className="ArticleCreateForm__documents-list">
                            {documents.map((item, i) =>
                                <li className="ArticleCreateForm__documents-item" key={i}>
                                    <span>{item.name}</span>
                                    <button type="button" onClick={() => deleteDocument(i)}>
                                        <SvgIcon icon={trash} size="default" />
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                }
                {focus && <div className="ArticleCreateForm__button-wrap">
                    <SubmitButton
                        type="submit"
                        className={`ArticleCreateForm__button ${formik.isValid ? 'active' : ''}`}
                    >
                        Опубликовать
                    </SubmitButton>
                </div>}
            </>
            {showModal &&
                <Modal
                    className="ArticleCreateForm__modal"
                    showModal={showModal}
                    handleClose={() => modalType && modalType === 'video' ? closeModal() : null}
                    handleX={closeModal}
                    headerName={modalType === 'video' ? 'Добавление видео' : 'Прикрепление файла'}
                >
                    {modalType === 'video' &&
                        <AddVideoLink
                            setVideoLink={addVideoLink}
                            closeModal={closeModal}
                        />
                    }
                    {modalType === 'pdf' &&
                        <AttachFile
                            documents={documents}
                            categories={categories}
                            setDocuments={setDocuments}
                            setCategories={setCategories}
                            closeModal={closeModal}
                        />
                    }
                </Modal>
            }
        </OutsideClickHandler>
    )
};

export default connect(RenderFields);