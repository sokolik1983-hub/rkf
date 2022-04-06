import React, { useState, useEffect} from "react";
import getYouTubeID from "get-youtube-id";
import {connect} from "formik";

import { trash } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";
import OutsideClickHandler from "react-outside-click-handler";

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
import Modal from "../Modal";
import { acceptType } from "../../utils/checkImgType";
import useIsMobile from "../../utils/useIsMobile";
import InitialsAvatar from "../InitialsAvatar";


const RenderFields = ({ fields,
                          logo,
                          formik,
                          isAd,
                          setIsAd,
                          videoLink,
                          setVideoLink,
                          documents,
                          categories,
                          setDocuments,
                          setCategories,
                          isMating,
                          setIsMating,
                          setLoadFile,
                          isFederation,
                          isMust,
                          setIsMust,
                          setIsCheckedAddTypes,
                          isCheckedAddTypes,
                          focus,
                          setFocused,
                          setBlured,
                          isCategoryId,
                          setIsCategoryId,
                          isHalfBreed,
                          setIsHalfBreed,
                          activeElem,
                          setActiveElem,
                          setIsTypeId,
                          isTypeId,
                          isAllCities,
                          setIsAllCities
                            }) => {
    const [src, setSrc] = useState('');
    const [advertTypes, setAdvertTypes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [cityLabel, setCityLabel] = useState('');
    const isMobile = useIsMobile();


    const { content, file } = formik.values;

    useEffect(() => {
        Request({ url: '/api/article/article_ad_types' },
            data => setAdvertTypes(data.map(d => ({ text: d.name, value: d.id }))),
            error => console.log(error.response)
        )
    }, []);

    const handleChange = e => {
        const file = e.target.files[0];

        if (file && file.size < 20971520) {
            formik.setFieldValue('file', file);
            setSrc(URL.createObjectURL(file));
            e.target.value = '';
            setLoadFile(true);
        } else {
            window.alert(`Размер изображения не должен превышать 20 мб`);
            formik.setFieldValue('file', '');
            setSrc('');
            setLoadFile(false);
        }
        acceptType(file).then(descision => {
            if (!descision) {
                window.alert(`Поддерживаются только форматы .jpg, .jpeg`);
                formik.setFieldValue('file', '');
            }
        });
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
        setIsAd(false);
    };

    const handleChangeHalfBreed = () => {
        if (isHalfBreed) {
            setIsHalfBreed(false);
        } else if (!isHalfBreed) {
            setIsHalfBreed(true);
        }
    };

    const handleChangeAllCities = () => {
        setIsAllCities(!isAllCities);
    };

    useEffect(() => {
        formik.setFieldValue('advert_type_id', isTypeId);
    }, [isTypeId]);

    useEffect(() => {
        formik.setFieldValue('is_halfbreed', isHalfBreed);
        isHalfBreed && formik.setFieldValue('advert_breed_id', '');
    }, [isHalfBreed]);

    useEffect(() => {
        formik.setFieldValue('advert_category_id', isCategoryId);
    }, [isCategoryId, activeElem]);

    useEffect(() => {
        if(activeElem === 4) {
            setCityLabel('потери');
        } else if(activeElem === 5) {
            setCityLabel('нахождения');
        }
    }, [activeElem]);

    useEffect(() => {
        formik.setFieldValue('is_all_cities', isAllCities);
        isAllCities && formik.setFieldValue('dog_city', []);
    }, [isAllCities]);

    return (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            <div className={focus ? `_focus` : `_no_focus`}>
                <FormGroup className="article-create-form__wrap article-create-form__textarea-wrap">
                    {
                        logo !== "/static/icons/default/default_avatar.svg"
                            ?
                            <ClientAvatar size={40} avatar={logo} />
                            :
                            <InitialsAvatar card="article"/>
                    }

                        <FormField
                            {...fields.content}
                            onChange={handleKeyDown}
                            onFocus={setFocused}
                            maxLength="1000"
                            value={content ? content : ''}
                            rows={content ? addRow() : focus ? "2" : "1"}
                            className={focus ? `_textarea_focus` : ``}
                        />
                </FormGroup>
                <div className="article-create-form__controls-wrap">
                    <FormControls className={`article-create-form__controls ${focus ? ' _focus' : ''}`}>
                        <LightTooltip title="Прикрепить изображение" enterDelay={200} leaveDelay={200}>
                            <label htmlFor="file" className="article-create-form__labelfile" />
                        </LightTooltip>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            accept="image/*"
                            className="article-create-form__inputfile"
                            onChange={handleChange}
                        />
                        {!videoLink &&
                            <LightTooltip title="Прикрепить ссылку на YouTube" enterDelay={200} leaveDelay={200}>
                                <button
                                    className="article-create-form__attach-video"
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
                                className="article-create-form__attach-pdf"
                                type="button"
                                onClick={() => {
                                    setModalType('pdf');
                                    setShowModal(true);
                                }}
                            />
                        </LightTooltip>
                        <div className="article-create-form__ad-wrap">
                        {
                            !videoLink && focus &&
                            <CustomCheckbox
                                id="ad"
                                label="Куплю/Продам"
                                className="article-create-form__ad"
                                checked={isAd}
                                onChange={() => {
                                    if (isAd) {
                                        setIsAd(false);
                                        setIsMust(false);
                                        setIsCategoryId(null);
                                    } else if (!isAd) {
                                        setIsAd(true);
                                        setIsMust(false);
                                        setIsCheckedAddTypes(false);
                                        setIsCategoryId(1);
                                    }
                                }}
                            />
                        }
                            {
                                !videoLink && focus &&
                                <CustomCheckbox
                                    id="ad1"
                                    label="Объявление"
                                    className="article-create-form__ad"
                                    checked={isCheckedAddTypes}
                                    onChange={() => {
                                        if (isCheckedAddTypes) {
                                            setIsCheckedAddTypes(false);
                                            setIsMust(false);
                                            setIsCategoryId(false);
                                        } else if (!isCheckedAddTypes) {
                                            setIsCheckedAddTypes(true);
                                            setIsMust(false);
                                            setIsAd(false);
                                            setIsCategoryId(2);
                                        }
                                    }}
                                />
                            }
                        {
                            isFederation && focus &&
                            <CustomCheckbox
                                id="is_must_read"
                                label="Обязательно к прочтению"
                                className="article-create-form__ad"
                                checked={isMust}
                                onChange={() => {
                                    if (isMust) {
                                        setIsMust(false);
                                        setIsAd(false);
                                    } else if (!isMust) {
                                        setIsMust(true);
                                        setIsAd(false);
                                    }
                                }}
                            />
                        }
                        </div>
                    </FormControls>
                    {content && !isMobile &&
                        <div className="article-create-form__length-hint">
                            <span className="article-create-form__content-length">
                                {`осталось ${1000 - content.length} знаков`}
                            </span>
                        </div>
                    }
                </div>
            </div>
            {isAd && focus &&
                <div className={`article-create-form__advert-wrap ${isMobile ? '' : ' _desktop'}`}>
                    <FormGroup inline>
                        <CustomChipList
                            {...fields.advert_type_id}
                            options={advertTypes?.filter(item => item.value < 4)}
                            setIsMating={setIsMating}
                            setIsTypeId={setIsTypeId}
                            setActiveElem={setActiveElem}
                            activeElem={activeElem}
                        />
                    </FormGroup>
                    {
                        !activeElem && <div className="article-create-form__error-wrap">
                            <div className="FormInput__error">Выберите категорию объявления</div>
                        </div>
                    }
                    <FormGroup className={`article-create-form__advert buy-sell ${isMating ? 'isMating' : ''}`}>
                        <FormField className="article-create-form__input-breed_new" {...fields.advert_breed_id} />
                        <FormField className="article-create-form__input-sex_new" {...fields.dog_sex_type_id} />
                        <FormField className="article-create-form__input-color_new" {...fields.dog_color} />
                        <FormField className="article-create-form__input-age_new" {...fields.dog_age} />
                        <CustomNumber cName={' article-create-form__input-cost_new'} {...fields.advert_cost} maxLength={10}  />
                        {!isMating && <CustomNumber cName={' article-create-form__input-puppies_new'} {...fields.advert_number_of_puppies} />}
                    </FormGroup>
                </div>
            }
            {isCheckedAddTypes && focus && (activeElem !== 6) &&
                <div className={`article-create-form__advert-wrap ${isMobile ? '' : ' _desktop'}`}>
                    <FormGroup inline>
                        <CustomChipList
                            {...fields.advert_type_id}
                            options={advertTypes?.filter(item => item.value > 3 )}
                            setIsMating={setIsMating}
                            setIsTypeId={setIsTypeId}
                            setActiveElem={setActiveElem}
                            activeElem={activeElem}
                        />
                    </FormGroup>
                    {
                        !activeElem && <div className="article-create-form__error-wrap">
                            <div className="FormInput__error">Выберите категорию объявления</div>
                        </div>
                    }
                    <FormGroup className="article-create-form__advert Ads">
                        <div className="article-create-form__city-select-wrap">
                            <FormField className={`article-create-form__input-city`}  {...fields.dog_city} label={`Место ${cityLabel}`} isMulti={false}/>
                        </div>
                        <div className="article-create-form__breed-select-wrap">
                            <FormField className={`article-create-form__input-breedId ${isHalfBreed && 'disabled'}`} {...fields.advert_breed_id} />
                            <CustomCheckbox
                                id="isHalfBreed_checkbox"
                                label="Метис"
                                className="article-create-form__ad"
                                checked={isHalfBreed}
                                onChange={handleChangeHalfBreed}
                            />
                        </div>
                        <FormField className="article-create-form__input-sex" {...fields.dog_sex_type_id} />
                        <div className={(activeElem === 5) ? 'article-create-form__age-wrap' : 'article-create-form__input-age'}>
                            <FormField className="article-create-form__input-age" {...fields.dog_age} />
                        </div>
                        <FormField className="article-create-form__input-name" {...fields.dog_name} />
                        <FormField className="article-create-form__input-color" {...fields.dog_color} />
                    </FormGroup>
                </div>
            }

            {isCheckedAddTypes && focus && (activeElem === 6) &&
            <div className={`article-create-form__advert-wrap ${isMobile ? '' : ' _desktop'}`}>
                <FormGroup inline>
                    <CustomChipList
                        {...fields.advert_type_id}
                        options={advertTypes?.filter(item => item.value > 3 )}
                        setIsMating={setIsMating}
                        setIsTypeId={setIsTypeId}
                        setActiveElem={setActiveElem}
                        activeElem={activeElem}
                    />
                </FormGroup>
                {
                    !activeElem && <div className="article-create-form__error-wrap">
                        <div className="FormInput__error">Выберите категорию объявления</div>
                    </div>
                }
                <FormGroup className="article-create-form__advert Ads">
                        <div className="article-create-form__city-select-wrap">
                            <FormField className={`article-create-form__input-city ${isAllCities && 'disabled'}`}  {...fields.dog_city} label={`Место ${cityLabel}`} isMulti={true} />
                            <CustomCheckbox
                                id="isAllCities__checkbox"
                                label="Все города"
                                className="article-create-form__ad"
                                checked={isAllCities}
                                onChange={handleChangeAllCities}
                            />
                        </div>
                        <div className="article-create-form__breed-select-wrap">
                            <FormField className={`article-create-form__input-breedId ${isHalfBreed && 'disabled'}`} {...fields.advert_breed_id} />
                            <CustomCheckbox
                                id="isHalfBreed_checkbox"
                                label="Метис"
                                className="article-create-form__ad"
                                checked={isHalfBreed}
                                onChange={handleChangeHalfBreed}
                            />
                        </div>
                        <FormField className="article-create-form__input-sex" {...fields.dog_sex_type_id} />
                        <div className={(activeElem === 5) ? 'article-create-form__age-wrap' : 'article-create-form__input-age'}>
                            <FormField className="article-create-form__input-age" {...fields.dog_age} />
                        </div>
                        <FormField className="article-create-form__input-name" {...fields.dog_name} />
                        <FormField className="article-create-form__input-color" {...fields.dog_color} />
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
                    <div className="article-create-form__documents">
                        <h4 className="article-create-form__documents-title">Прикреплённые файлы:</h4>
                        <ul className="article-create-form__documents-list">
                            {documents.map((item, i) =>
                                <li className="article-create-form__documents-item" key={i}>
                                    <span>{item.name}</span>
                                    <button type="button" onClick={() => deleteDocument(i)}>
                                        <SvgIcon icon={trash} size="default" />
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                }
                {focus && <div className="article-create-form__button-wrap">
                    <SubmitButton
                        type="submit"
                        className={`article-create-form__button ${formik.isValid ? 'active' : ''}`}
                    >
                        Опубликовать
                    </SubmitButton>
                </div>}
            </>
            <Modal
                className="article-create-form__modal"
                showModal={showModal}
                handleClose={closeModal}
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
        </OutsideClickHandler>
    )
};

export default connect(RenderFields);