import React, {memo, useState, useEffect} from "react";
import getYouTubeID from "get-youtube-id";
import {metadata} from "youtube-metadata-from-url";
import {connect} from "formik";
import {trash} from "@progress/kendo-svg-icons";
import {SvgIcon} from "@progress/kendo-react-common";
import {SubmitButton, FormControls, FormGroup, FormField} from "../Form";
import CustomCheckbox from "../Form/CustomCheckbox";
import CustomNumber from "../Form/Field/CustomNumber";
import CustomChipList from "../Form/Field/CustomChipList";
import AddVideoLink from "./AddVideoLink";
import AttachFile from "./AttachFile";
import ImagePreview from "../ImagePreview";
import LightTooltip from "../LightTooltip";
import Modal from "../Modal";
import Avatar from "../Layouts/Avatar";
import DndPublicationImage from "../Gallery/components/PublicationImageUpload/DndPublicationImage";
import {BAD_SITES} from "../../appConfig";
import {Request} from "../../utils/request";
import useIsMobile from "../../utils/useIsMobile";


const RenderFields = ({
    fields,
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
    isFederation,
    isMust,
    setIsMust,
    setIsCheckedAddTypes,
    isCheckedAddTypes,
    focus,
    setFocused,
    isCategoryId,
    setIsCategoryId,
    isHalfBreed,
    setIsHalfBreed,
    activeElem,
    setActiveElem,
    setIsTypeId,
    isTypeId,
    isAllCities,
    setIsAllCities,
    name,
    userType,
    profileInfo,
    setContent,
    loadPictures,
    setLoadPictures,
}) => {
    const [advertTypes, setAdvertTypes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [cityLabel, setCityLabel] = useState('');
    const isMobile = useIsMobile();

    const {content} = formik.values;

    useEffect(() => {
        Request({ url: '/api/article/article_ad_types' },
            data => setAdvertTypes(data.map(d => ({ text: d.name, value: d.id }))),
            error => console.log(error.response)
        )
    }, []);

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

    useEffect(() => {
        formik.setFieldValue('pictures', loadPictures);
    }, [loadPictures, isCheckedAddTypes, isAd]);

    useEffect(() => {
        setTimeout(() => {
            formik.setFieldValue('content', '');
        }, 50);

    }, [profileInfo.counters.publications_count])

    const handleClose = picture => {
        const index = loadPictures.indexOf(picture);

        if (index >= 0) {
            loadPictures.splice(index, 1);
            setLoadPictures([...loadPictures]);
        }
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
        const charactersInRow = 90;
        const maxNumberOfRows = 11;
        const reservedRow = 2;
        const numberOfRows = Math.ceil(content.length / charactersInRow) + reservedRow;

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

    const addVideoLink = link => {
        const id = getYouTubeID(link);
        metadata(`https://youtu.be/${id}`)
            .then((json) => {
                formik.setFieldValue('video_id', id);
                formik.setFieldValue('video_link', link);
                formik.setFieldValue('video_name', json.title);
                formik.values.content === '' && setContent(json.title);
                setVideoLink(link);
            })
            .catch((error) => console.log(error));
    };

    const removeVideoLink = () => {
        formik.setFieldValue('video_id', '');
        formik.setFieldValue('video_link', '');
        formik.setFieldValue('video_name', '');
        setVideoLink('');
    };

    const deleteDocument = index => {
        if (window.confirm('Вы действительно хотите удалить этот файл?')) {
            setDocuments([...documents].filter((item, i) => i !== index));
        }
    };

    const handleChangeHalfBreed = () => {
        setIsHalfBreed(!isHalfBreed);
    };

    const handleChangeAllCities = () => {
        setIsAllCities(!isAllCities);
    };

    return (
        <>
            <div className={focus ? '_focus'  : '_no_focus'}>
                <FormGroup className="article-create-form__wrap article-create-form__textarea-wrap">
                    <Avatar
                        card="article"
                        data="article"
                        logo={logo}
                        name={name}
                        userType={userType}
                        canEdit={true}
                    />
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
                    <FormControls className={`article-create-form__controls${focus ? ' _focus' : ''}`}>
                        {loadPictures?.length < 5 &&
                            <LightTooltip title="Прикрепить изображение" enterDelay={200} leaveDelay={200}>
                                <label htmlFor="file" className="article-create-form__labelfile" onClick={() => {
                                    setModalType('photo');
                                    setShowModal(true);
                                }}/>
                            </LightTooltip>
                        }
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
                            {!videoLink && focus &&
                                <>
                                    <CustomCheckbox
                                        id="ad"
                                        label="Куплю/Продам"
                                        className="article-create-form__ad"
                                        checked={isAd}
                                        onChange={() => {
                                            setContent(content);
                                            if (isAd) {
                                                setIsAd(false);
                                                setIsMust(false);
                                                setIsCategoryId(null);
                                            } else if (!isAd) {
                                                setIsAd(true);
                                                setIsMust(false);
                                                setIsCheckedAddTypes(false);
                                                setIsCategoryId(1);
                                            };
                                        }}
                                    />
                                    <CustomCheckbox
                                        id="ad1"
                                        label="Объявление"
                                        className="article-create-form__ad"
                                        checked={isCheckedAddTypes}
                                        onChange={() => {
                                            setContent(content);
                                            if (isCheckedAddTypes) {
                                                setIsCheckedAddTypes(false);
                                                setIsMust(false);
                                                setIsCategoryId(null);
                                            } else if (!isCheckedAddTypes) {
                                                setIsCheckedAddTypes(true);
                                                setIsMust(false);
                                                setIsAd(false);
                                                setIsCategoryId(2);
                                            };
                                        }}
                                    />
                                </>
                            }
                            {isFederation && focus &&
                                <CustomCheckbox
                                    id="is_must_read"
                                    label="Обязательно к прочтению"
                                    className="article-create-form__ad"
                                    checked={isMust}
                                    onChange={() => {
                                        if (isMust) {
                                            setIsMust(false);
                                            setIsAd(false);
                                        } else {
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
                <div className={`article-create-form__advert-wrap${isMobile ? '' : ' _desktop'}`}>
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
                    {!activeElem &&
                        <div className="article-create-form__error-wrap">
                            <div className="FormInput__error">Выберите категорию объявления</div>
                        </div>
                    }
                    <FormGroup className={`article-create-form__advert buy-sell${isMating ? ' isMating' : ''}`}>
                        <FormField className="article-create-form__input-breed_new" {...fields.advert_breed_id} />
                        <FormField className="article-create-form__input-sex_new" {...fields.dog_sex_type_id} />
                        <FormField className="article-create-form__input-color_new" {...fields.dog_color} />
                        <FormField className="article-create-form__input-age_new" {...fields.dog_age} />
                        <CustomNumber cName="article-create-form__input-cost_new" {...fields.advert_cost} maxLength={10}  />
                        {!isMating &&
                            <CustomNumber cName="article-create-form__input-puppies_new" {...fields.advert_number_of_puppies} />
                        }
                    </FormGroup>
                </div>
            }
            {isCheckedAddTypes && focus && (activeElem !== 6) &&
                <div className={`article-create-form__advert-wrap${isMobile ? '' : ' _desktop'}`}>
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
                    {!activeElem &&
                        <div className="article-create-form__error-wrap">
                            <div className="FormInput__error">Выберите категорию объявления</div>
                        </div>
                    }
                    <FormGroup className="article-create-form__advert Ads">
                        <div className="article-create-form__city-select-wrap">
                            <FormField
                                className="article-create-form__input-city"
                                {...fields.dog_city}
                                label={`Место ${cityLabel}`}
                                isMulti={false}
                            />
                        </div>
                        <div className="article-create-form__breed-select-wrap">
                            <FormField
                                className={`article-create-form__input-breedId${isHalfBreed ? ' disabled' : ''}`}
                                {...fields.advert_breed_id}
                            />
                            <CustomCheckbox
                                id="isHalfBreed_checkbox"
                                label="Метис"
                                className="article-create-form__ad"
                                checked={isHalfBreed}
                                onChange={handleChangeHalfBreed}
                            />
                        </div>
                        <FormField className="article-create-form__input-sex" {...fields.dog_sex_type_id} />
                        <div className={activeElem === 5 ? 'article-create-form__age-wrap' : 'article-create-form__input-age'}>
                            <FormField className="article-create-form__input-age" {...fields.dog_age} />
                        </div>
                        <FormField className="article-create-form__input-name" {...fields.dog_name} />
                        <FormField className="article-create-form__input-color" {...fields.dog_color} />
                    </FormGroup>
                </div>
            }
            {isCheckedAddTypes && focus && (activeElem === 6) &&
                <div className={`article-create-form__advert-wrap${isMobile ? '' : ' _desktop'}`}>
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
                    {!activeElem &&
                        <div className="article-create-form__error-wrap">
                            <div className="FormInput__error">Выберите категорию объявления</div>
                        </div>
                    }
                    <FormGroup className="article-create-form__advert Ads">
                        <div className="article-create-form__city-select-wrap">
                            <FormField
                                className={`article-create-form__input-city${isAllCities ? ' disabled' : ''}`}
                                {...fields.dog_city}
                                label={`Место ${cityLabel}`}
                                isMulti={true}
                            />
                            <CustomCheckbox
                                id="isAllCities__checkbox"
                                label="Все города"
                                className="article-create-form__ad"
                                checked={isAllCities}
                                onChange={handleChangeAllCities}
                            />
                        </div>
                        <div className="article-create-form__breed-select-wrap">
                            <FormField
                                className={`article-create-form__input-breedId${isHalfBreed ? ' disabled' : ''}`}
                                {...fields.advert_breed_id}
                            />
                            <CustomCheckbox
                                id="isHalfBreed_checkbox"
                                label="Метис"
                                className="article-create-form__ad"
                                checked={isHalfBreed}
                                onChange={handleChangeHalfBreed}
                            />
                        </div>
                        <FormField className="article-create-form__input-sex" {...fields.dog_sex_type_id} />
                        <div className={activeElem === 5 ? 'article-create-form__age-wrap' : 'article-create-form__input-age'}>
                            <FormField className="article-create-form__input-age" {...fields.dog_age} />
                        </div>
                        <FormField className="article-create-form__input-name" {...fields.dog_name} />
                        <FormField className="article-create-form__input-color" {...fields.dog_color} />
                    </FormGroup>
                </div>
            }
            {!!loadPictures?.length &&
                <ul className={`article-create-form__images __${loadPictures.length}`}>
                    {loadPictures.map((picture, index) =>
                        <li className="ImagePreview__wrap" key={index}>
                            <ImagePreview src={URL.createObjectURL(picture)} />
                            <button
                                className="ImagePreview__close"
                                onClick={() => handleClose(picture)}
                            />
                        </li>
                    )}
                </ul>
            }
            {videoLink &&
                <div className="ImagePreview__wrap">
                    <ImagePreview src={`https://img.youtube.com/vi/${getYouTubeID(videoLink)}/mqdefault.jpg`} />
                    <button
                        className="ImagePreview__close"
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
            {(focus || content) &&
                <div className="article-create-form__button-wrap">
                    {!content && (!!loadPictures?.length || !!videoLink) &&
                        <span className="article-create-form__text-error">
                            Заполните текст для публикации
                        </span>
                    }
                    <SubmitButton
                        type="submit"
                        className={`article-create-form__button${(!isCategoryId && content) || formik.isValid ? ' active' : ''}`}
                    >
                        Опубликовать
                    </SubmitButton>
                </div>
            }
            <Modal
                className="article-create-form__modal"
                showModal={showModal}
                handleClose={closeModal}
                handleX={closeModal}
                headerName={modalType === 'video' ? 'Добавление видео' : 'Прикрепление файла'}
            >
                {modalType === 'photo' &&
                    <DndPublicationImage
                        loadPictures={loadPictures}
                        setLoadPictures={setLoadPictures}
                        closeModal={closeModal}
                    />
                }
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
        </>
    )
};

export default memo(connect(RenderFields));