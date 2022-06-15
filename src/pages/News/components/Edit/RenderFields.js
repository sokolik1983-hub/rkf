import React, { useEffect, useState } from 'react';
import getYouTubeID from 'get-youtube-id';
import { connect } from 'formik';
import CustomChipList from '../../../../components/Form/Field/CustomChipList';
import { FormControls, FormField, FormGroup, SubmitButton } from '../../../../components/Form';
import AddVideoLink from '../../../../components/UserAddArticle/AddVideoLink';
import AttachFile from '../../../../components/UserAddArticle/AttachFile';
import { BAD_SITES } from '../../../../appConfig';
import { Request } from '../../../../utils/request';
import Modal from '../../../../components/Modal';
import LightTooltip from '../../../../components/LightTooltip';
import { SvgIcon } from '@progress/kendo-react-common';
import { trash } from '@progress/kendo-svg-icons';
import useIsMobile from '../../../../utils/useIsMobile';
import { blockContent } from '../../../../utils/blockContent';
import OutsideClickHandler from 'react-outside-click-handler';
import { useFocus } from '../../../../shared/hooks';
import CustomSelect from 'react-select';
import CustomCheckbox from '../../../../components/Form/CustomCheckbox';
import DndPublicationImage from "../../../../components/Gallery/components/PublicationImageUpload/DndPublicationImage";


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
    const [activeElem, setActiveElem] = useState(advertTypeId);
    const [advertTypes, setAdvertTypes] = useState([]);
    const [allPictures, setAllPictures] = useState(imgSrc);
    const [breedValue, setBreedValue] = useState(adBreedId);
    const [cityLabel, setCityLabel] = useState('');
    const [currentCities, setCurrentCities] = useState(currentCityId);
    const [isAllCitiesEdit, setIsAllCitiesEdit] = useState(isAllCities);
    const [isHalfBreedEdit, setIsHalfBreedEdit] = useState(isHalfBreed);
    const [modalType, setModalType] = useState('');
    const [newPictures, setNewPictures] = useState([]);
    const [oldPictures, setOldPictures] = useState(imgSrc);
    const [sexId, setSex] = useState(imgSrc);
    const [sexIdNumber, setSexIdNumber] = useState(dogSex)
    const [showModal, setShowModal] = useState(false);
    const [video, setVideo] = useState(videoLink);

    const { setBlured } = useFocus(false);
    const { content, is_advert, dog_sex_type_id, advert_type_id } = formik.values;
    const isMobile = useIsMobile(900);


    useEffect(() => {
        setSex({'label': `${(dog_sex_type_id === 1) ? 'Кобель' : 'Сука'}`});
    },[])

    useEffect(() => {
        formik.setFieldValue('content', text);
        formik.setFieldValue('pictures', getPictureId());
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

    useEffect(() => {
        formik.setFieldValue('dog_sex_type_id', sexIdNumber);
    }, [sexIdNumber]);

    useEffect(() => {
        formik.setFieldValue('is_halfbreed', isHalfBreedEdit);
        isHalfBreedEdit && formik.setFieldValue('advert_breed_id', '');
    }, [isHalfBreedEdit]);

    useEffect(() => {
        setAllPictures(oldPictures.concat(newPictures))
    }, [oldPictures, newPictures])

    useEffect(() => {
        formik.setFieldValue('pictures', getPictureId());
        formik.setFieldValue('new_pictures', newPictures);
    }, [allPictures])

    useEffect(() => {
        setLiveAdvertId(advert_type_id);
        if(advert_type_id === 4 || advert_type_id === 5) {
            formik.setFieldValue('is_all_cities', false);
        } else if (advert_type_id === 6) {
            formik.setFieldValue('dog_city', []);
        }
    }, [advert_type_id]);

    const getPictureId = () => {
        const arr = [];
        for (let i= 0; i < oldPictures.length; i++) {
            arr.push(oldPictures[i].picture_id);
        };
        return arr;
    }

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

    const handleDeleteImg = (picture, e) => {
        if (newPictures?.includes(picture)) {
            const i = newPictures.indexOf(picture);
            if (i >= 0) {
                setNewPictures([...newPictures.filter(picture => picture !== newPictures[i])]);
                formik.setFieldValue('new_pictures', [newPictures])
            }
        } else {
            const i = oldPictures.indexOf(picture);
            if (i >= 0) {
                setOldPictures([...oldPictures.filter(picture=> picture !== oldPictures[i])]);
                formik.setFieldValue('pictures', getPictureId())
            }
        }
    }

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

    return (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            {
                (advertTypeId !== null) &&
                <>
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
                            <div className="FormInput__error">Выберите категорию объявления</div>
                        </div>
                    }
                </>
            }

            {is_advert &&
                <div className="article-edit__advert">
                    {
                        (advertCategoryId === 1) ?
                            <div className={`article-edit__wrap${isMating ? ' isMating' : ''}`}>
                                <FormGroup inline className="article-edit__ad">
                                    <FormField {...fields.advert_breed_id} options={breeds} />
                                    <FormField {...fields.advert_cost} />
                                    {!isMating &&
                                        <FormField {...fields.advert_number_of_puppies} />
                                    }
                                </FormGroup>
                                <FormGroup inline className="article-edit__ad">
                                    <FormField {...fields.dog_color} />
                                    <FormField {...fields.dog_age} />
                                    <div className="article-edit__custom-select">
                                        <label htmlFor="dog_sex_type_id">Пол</label>
                                        <CustomSelect
                                            value={sexId}
                                            options={sex}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                </FormGroup>
                            </div>
                            :
                            <div className="article-edit__inner-add-inputs">
                                {
                                    advert_type_id !== 6 ?
                                        <div className="article-edit__city-select-wrap">
                                            <FormField
                                                className={`article-create-form__input-city ${(!formik.values.dog_city || formik.values.dog_city.length === 0) ? 'error-field' : ''}`}
                                                {...fields.dog_city}
                                                label={`Место ${cityLabel}`}
                                            />
                                            {
                                                (!formik.values.dog_city || formik.values.dog_city.length === 0) &&
                                                <div className="article-edit__error-wrap ">
                                                    <div className="FormInput__error select-city">Выберите город</div>
                                                </div>
                                            }
                                        </div>
                                        :
                                        <div className="article-edit__city-input-wrap">
                                            <CustomCheckbox
                                                id="isAllCities__checkbox"
                                                label="Все города"
                                                className="article-create-form__ad"
                                                checked={isAllCitiesEdit}
                                                onChange={handleChangeAllCities}
                                            />
                                            <label className="article-edit__city-label" htmlFor="cities-input">Город</label>
                                            <div>
                                                <CustomSelect
                                                    id="cities-input"
                                                    value={currentCities}
                                                    placeholder="Выберите город"
                                                    options={cities ? cities : []}
                                                    isMulti={true}
                                                    onChange={handleCitySelect}
                                                    className={`article-edit__input-breedId ${(isAllCitiesEdit) && 'disabled'} ${(!currentCities && !isAllCitiesEdit) && 'error-field' }`}

                                                />
                                            </div>
                                            {
                                                (!currentCities && !isAllCitiesEdit) &&
                                                <div className="article-edit__error-wrap ">
                                                    <div className="FormInput__error select-city">Выберите город</div>
                                                </div>
                                            }
                                        </div>
                                }
                                <FormGroup inline className="article-edit__ad article-edit__halfbreed-wrap">
                                    <CustomCheckbox
                                        id="isHalfBreed_checkbox"
                                        label="Метис"
                                        className="article-create-form__ad"
                                        checked={isHalfBreedEdit}
                                        onChange={handleChangeHalfBreed}
                                    />
                                    <FormField
                                        className={`article-edit__input-breedId ${(isHalfBreedEdit) ? 'disabled' : ''} ${(!isHalfBreedEdit && !breedValue) ? 'error-input' : ''}`}
                                        {...fields.advert_breed_id}
                                        options={breeds}
                                        onChange={(e) => handleChangeBreed(e)}
                                    />
                                </FormGroup>
                                    <FormField {...fields.dog_name} className="article-edit__name-wrap"/>
                                    <FormField {...fields.dog_color} className="article-edit__color-wrap"/>
                                    <div className={'article-edit__age-wrap' + (activeElem === 5 ? ' about' : '')}>
                                        <FormField {...fields.dog_age} />
                                    </div>
                                    <div className="article-edit__custom-select">
                                        <label htmlFor="dog_sex_type_id">Пол</label>
                                        <CustomSelect value={sexId} options={sex} onChange={(e) => handleChange(e)}/>
                                    </div>
                            </div>
                    }
                </div>
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
                {(!allPictures || allPictures.length < 5) &&
                    <LightTooltip title="Прикрепить изображение" enterDelay={200} leaveDelay={200}>
                        <label htmlFor="file" className="article-edit__attach-img" onClick={() => {
                            setModalType('photo');
                            setShowModal(true);
                        }}/>
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
            {(allPictures || video) &&
                <div className="article-edit__media">
                    {!!allPictures && <div className={`article-edit__images __${allPictures.length}`}>
                        {!!allPictures?.length && allPictures.map(picture =>
                            <div className="article-edit__image">
                                <img src={picture.picture_link || URL.createObjectURL(picture)} alt=""/>
                                <button className="article-edit__image-delete" type="button"
                                        onClick={() => handleDeleteImg(picture)}/>
                            </div>
                        )
                        }
                    </div>}

                    {video &&
                        <div className="article-edit__video">
                            <img src={`https://img.youtube.com/vi/${getYouTubeID(video)}/mqdefault.jpg`} alt="" />
                            <button className="article-edit__image-delete" onClick={handleDeleteVideoLink} />
                        </div>
                    }
                </div>
            }
            {!!docs.length &&
                <div className="article-edit__documents">
                    <h4 className="article-edit__documents-title">Прикреплённые файлы:</h4>
                    <ul className="article-edit__documents-list">
                        {docs.map((item, i) =>
                            <li className="article-edit__documents-item" key={i}>
                                <span>{item.name}</span>
                                <SvgIcon
                                    icon={trash}
                                    size="default"
                                    onClick={() => handleDeleteDocument(i)}
                                />
                            </li>
                        )}
                    </ul>
                </div>
            }

            <FormControls className="article-edit__form-controls">
                <button
                    type="button"
                    className="btn"
                    onClick={onCancel}
                >
                    Отмена
                </button>
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
                {modalType === 'photo' &&
                    <DndPublicationImage
                        loadPictures={newPictures}
                        setLoadPictures={setNewPictures}
                        oldPictures={oldPictures}
                        closeModal={closeModal}
                    />
                }
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