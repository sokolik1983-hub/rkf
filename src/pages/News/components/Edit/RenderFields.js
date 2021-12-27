import React, { useEffect, useState } from "react";
import getYouTubeID from "get-youtube-id";
import { connect } from "formik";
import CustomChipList from "../../../../components/Form/Field/CustomChipList";
import { FormControls, FormField, FormGroup, SubmitButton } from "../../../../components/Form";
import AddVideoLink from "../../../../components/UserAddArticle/AddVideoLink";
import AttachFile from "../../../../components/UserAddArticle/AttachFile";
import { BAD_SITES } from "../../../../appConfig";
import { Request } from "../../../../utils/request";
import Modal from "../../../../components/Modal";
import LightTooltip from "../../../../components/LightTooltip";
import { SvgIcon } from "@progress/kendo-react-common";
import { trash } from "@progress/kendo-svg-icons";
import { acceptType } from "../../../../utils/checkImgType";
import useIsMobile from "../../../../utils/useIsMobile";
import { blockContent } from '../../../../utils/blockContent';
import OutsideClickHandler from "react-outside-click-handler";
import { useFocus } from '../../../../shared/hooks';
import CustomSelect from "react-select";
import CustomCheckbox from "../../../../components/Form/CustomCheckbox";


const RenderFields = ({ fields,
                          breeds,
                          sex,
                          formik,
                          text,
                          imgSrc,
                          videoLink,
                          docs,
                          setDocs,
                          categories,
                          setCategories,
                          onCancel,
                          isMating,
                          setIsMating,
                          setIsImageDelete,
                          dogSex,
                          advertTypeId,
                          advertCategoryId,
                          isHalfBreed,
                          adBreedId,
                          currentCityId,
                          cities,
                          isAllCities,
                          setLiveAdvertId
}) => {
    const [src, setSrc] = useState(imgSrc);
    const [sexId, setSex] = useState(imgSrc);
    const [sexIdNumber, setSexIdNumber] = useState(dogSex)
    const [video, setVideo] = useState(videoLink);
    const [advertTypes, setAdvertTypes] = useState([]);
    const [modalType, setModalType] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isHalfBreedEdit, setIsHalfBreedEdit] = useState(isHalfBreed);
    const [activeElem, setActiveElem] = useState(advertTypeId);
    const [breedValue, setBreedValue] = useState(adBreedId);
    const [cityLabel, setCityLabel] = useState('');
    const [currentCities, setCurrentCities] = useState(currentCityId);
    const [isAllCitiesEdit, setIsAllCitiesEdit] = useState(isAllCities);

    const { focus, setFocused, setBlured } = useFocus(false);
    const { content, is_advert, dog_sex_type_id, advert_type_id } = formik.values;
    const isMobile = useIsMobile();

    useEffect(() => {
        setSex({'label': `${(dog_sex_type_id === 1) ? 'Кобель' : 'Сука'}`});
    },[])

    useEffect(() => {
        formik.setFieldValue('content', text);
        formik.setFieldValue('file', imgSrc);
        formik.setFieldValue('video_link', videoLink);

        Request({ url: '/api/article/article_ad_types' },
            data => setAdvertTypes(data.map(d => ({ text: d.name, value: d.id }))),
            error => console.log(error.response)
        )
    }, []);

    useEffect(() => {
        blockContent(showModal)
    }, [showModal]);

    useEffect(() => {
        if(activeElem === 4) {
            setCityLabel('потери');
        } else if(activeElem === 5) {
            setCityLabel('нахождения');
        }
    }, [activeElem]);

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
        const file = e.target.files[0];

        if (file && file.size < 20971520) {
            formik.setFieldValue('file', file);
            setSrc(URL.createObjectURL(file));
            e.target.value = '';
        } else {
            window.alert(`Размер изображения не должен превышать 20 мб`);
            formik.setFieldValue('file', '');
            setSrc('');
        }
        setIsImageDelete(true);
        acceptType(file).then(descision => {
            if (!descision) {
                window.alert(`Поддерживаются только форматы .jpg, .jpeg`);
                formik.setFieldValue('file', '');
                setSrc('');
            }
        });
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
        setDocs([...docs].filter((item, i) => i !== index));
    };

    const closeModal = () => {
        setModalType('');
        setShowModal(false);
    };

    const addRow = () => {
        let charactersInRow = 130;
        let maxNumberOfRows = 11;
        let reservedRow = 1;
        let numberOfRows = Math.ceil(content.length / charactersInRow) + reservedRow;

        if (numberOfRows < maxNumberOfRows) {
            return numberOfRows;
        } else {
            return maxNumberOfRows;
        }
    };

    const handleOutsideClick = () => {
        !content && setBlured();
    };
    const handleChange = (e) => {
        setSex(e);
        setSexIdNumber((e.label === 'Кобель') ? 1 : 2);
    };
    const handleChangeHalfBreed = () => {
        if (isHalfBreedEdit) {
            setIsHalfBreedEdit(false);
        } else if (!isHalfBreedEdit) {
            setIsHalfBreedEdit(true);
            formik.setFieldValue('advert_breed_id', '');
            setBreedValue(null);
        }
    };
    const handleChangeBreed = (e) => {
        formik.setFieldValue('advert_breed_id', e.value);
        setBreedValue(e.value);
    };

    useEffect(() => {
        formik.setFieldValue('dog_sex_type_id', sexIdNumber);
    }, [sexIdNumber]);
    useEffect(() => {
        formik.setFieldValue('is_halfbreed', isHalfBreedEdit);
        isHalfBreedEdit && formik.setFieldValue('advert_breed_id', '');
    }, [isHalfBreedEdit]);

    const handleCitySelect = (e) => {
        setCurrentCities(e);
        formik.setFieldValue('dog_city', e.map(m => m.value));
    };

    const handleChangeAllCities = () => {
        if (isAllCitiesEdit) {
            setIsAllCitiesEdit(false);
            formik.setFieldValue('is_all_cities', false);
        } else if (!isAllCitiesEdit) {
            setIsAllCitiesEdit(true);
            formik.setFieldValue('is_all_cities', true);
            setCurrentCities('');
        }
    };

    useEffect(() => {
        setLiveAdvertId(advert_type_id);
        if(advert_type_id === 4 || advert_type_id === 5) {
            formik.setFieldValue('is_all_cities', false);
        } else if (advert_type_id === 6) {
            formik.setFieldValue('dog_city', []);
        }
    }, [advert_type_id]);

    return (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            {
                (advertTypeId !== null) &&
                <>
                    <div className="article-edit__categories-wrap">
                        {
                            <CustomCheckbox
                                id="ad"
                                label={(advertCategoryId === 1) ? "Куплю/Продам" : "Объявление"}
                                className="ArticleCreateForm__ad"
                                checked={true}
                            />
                        }
                    </div>
                    <FormGroup inline className="article-edit__ad">
                        <CustomChipList
                            {...fields.advert_type_id}
                            options={(advertCategoryId === 1) ? (advertTypes?.filter(item => item.value < 4)) : (advertTypes?.filter(item => item.value > 3 ))}
                            setIsMating={setIsMating}
                            advertTypeId={advertTypeId}
                            activeElem={activeElem}
                            setActiveElem={setActiveElem}
                        />
                    </FormGroup>
                    {
                        !activeElem && <div className="article-edit__error-wrap">
                            <div className="FormInput__error">Выберите категорию объявления.</div>
                        </div>
                    }
                </>
            }

            <div className="article-edit__text">
                <FormField
                    {...fields.content}
                    onChange={handleChangeText}
                    maxLength="1000"
                    rows={content && addRow()}
                />
                {content && !isMobile &&
                    <span className="article-edit__content-length">
                        {`осталось ${1000 - content.length} знаков`}
                    </span>
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
                                className="article-edit__image-input"
                                accept=".jpg, .jpeg"
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
            <div className="article-edit__media">
                {src &&
                    <div className="article-edit__image">
                        <img src={src} alt="" />
                        <button className="article-edit__image-delete" onClick={handleDeleteImg} />
                    </div>
                }
                {video &&
                    <div className="article-edit__video">
                        <img src={`https://img.youtube.com/vi/${getYouTubeID(video)}/mqdefault.jpg`} alt="" />
                        <button className="article-edit__image-delete" onClick={handleDeleteVideoLink} />
                    </div>
                }
            </div>
            {!!docs.length &&
                <div className="article-edit__documents">
                    <h4 className="article-edit__documents-title">Прикреплённые файлы:</h4>
                    <ul className="article-edit__documents-list">
                        {docs.map((item, i) =>
                            <li className="article-edit__documents-item" key={i}>
                                <span>{item.name}</span>
                                <SvgIcon icon={trash} size="default" onClick={() => handleDeleteDocument(i)} />
                            </li>
                        )}
                    </ul>
                </div>
            }
            {is_advert &&
                <div className="article-edit__advert">
                    {
                        (advertCategoryId === 1) ?
                            <div className="article-edit__wrap">
                                <FormGroup inline className="article-edit__ad">
                                    <FormField {...fields.advert_breed_id} options={breeds} />
                                    <FormField {...fields.advert_cost} />
                                    {!isMating && <FormField {...fields.advert_number_of_puppies} />}
                                </FormGroup>
                                <FormGroup inline className="article-edit__ad">
                                    <FormField {...fields.dog_color} />
                                    <FormField {...fields.dog_age} />
                                    <div className="article-edit__custom-select">
                                        <label htmlFor="dog_sex_type_id">Пол</label>
                                        <CustomSelect value={sexId} options={sex} onChange={(e) => handleChange(e)}/>
                                    </div>
                                </FormGroup>
                            </div>
                            :
                            <div>
                                {
                                    advert_type_id !== 6 ?
                                    <FormField
                                        className={`ArticleCreateForm__input-city`}
                                        {...fields.dog_city}
                                        label={`Место ${cityLabel}`}
                                    />
                                        :
                                        <>
                                            <CustomCheckbox
                                                id="isAllCities__checkbox"
                                                label="Все города"
                                                className="ArticleCreateForm__ad"
                                                checked={isAllCitiesEdit}
                                                onChange={handleChangeAllCities}
                                            />
                                            <CustomSelect
                                                value={currentCities}
                                                placeholder={'Выберите город'}
                                                label={'Город'}
                                                options={cities ? cities : []}
                                                isMulti={true}
                                                onChange={handleCitySelect}
                                                className={`article-edit__input-breedId ${(isAllCitiesEdit) && 'disabled'}`}
                                            />
                                        </>
                                }
                                <FormGroup inline className="article-edit__ad article-edit__halfbreed-wrap">
                                    <CustomCheckbox
                                         id="isHalfBreed_checkbox"
                                         label="Метис"
                                         className="ArticleCreateForm__ad"
                                         checked={isHalfBreedEdit}
                                         onChange={handleChangeHalfBreed}
                                     />
                                    <FormField
                                        className={`article-edit__input-breedId ${(isHalfBreedEdit) && 'disabled'} ${(!isHalfBreedEdit && !breedValue) && 'error-input'}`}
                                        {...fields.advert_breed_id}
                                        options={breeds}
                                        onChange={(e) => handleChangeBreed(e)}
                                    />
                                        {
                                            (!isHalfBreedEdit && !breedValue) && <div className="article-edit__error-wrap ">
                                                <div className="FormInput__error select-breed">Поле не может быть пустым</div>
                                            </div>
                                        }
                                </FormGroup>
                                <FormGroup inline className="article-edit__ad">
                                    <FormField {...fields.dog_name} />
                                    <FormField {...fields.dog_color} />
                                    <div className={(activeElem === 5) && 'article-edit__age-wrap'}>
                                        <FormField {...fields.dog_age} />
                                    </div>
                                    <div className="article-edit__custom-select">
                                        <label htmlFor="dog_sex_type_id">Пол</label>
                                        <CustomSelect value={sexId} options={sex} onChange={(e) => handleChange(e)}/>
                                    </div>
                                </FormGroup>
                            </div>
                    }
                </div>
            }
            <FormControls className="article-edit__form-controls">
                <button type="button" className="btn" onClick={onCancel}>Отмена</button>
                <SubmitButton
                    type="submit"
                    className={`article-edit__button${(advert_type_id === 6) 
                        ?
                        ((formik.isValid && (currentCities?.length > 0 || isAllCitiesEdit)) ? ' _active' : '') 
                        :
                        (formik.isValid ? ' _active' : '')  }`}
                >
                    Обновить
                </SubmitButton>
            </FormControls>
            <Modal
                className="article-edit__modal"
                showModal={showModal}
                handleClose={closeModal}
                handleX={closeModal}
                noBackdrop={true}
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
        </OutsideClickHandler>
    )
};

export default connect(React.memo(RenderFields));