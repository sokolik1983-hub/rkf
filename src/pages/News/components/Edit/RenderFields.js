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
                          isHalfBreed
}) => {
    const [src, setSrc] = useState(imgSrc);
    const [sexId, setSex] = useState(imgSrc);
    const [sexIdNumber, setSexIdNumber] = useState(dogSex)
    const [video, setVideo] = useState(videoLink);
    const [advertTypes, setAdvertTypes] = useState([]);
    const [modalType, setModalType] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isHalfBreedEdit, setIsHalfBreedEdit] = useState(isHalfBreed);

    const { focus, setFocused, setBlured } = useFocus(false);
    const { content, is_advert, dog_sex_type_id } = formik.values;
    const isMobile = useIsMobile();

    console.log('fields', fields);
    // console.log('dogCity', dogCity);

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
    }
    const handleChangeHalfBreed = () => {
        if (isHalfBreedEdit) {
            setIsHalfBreedEdit(false);
        } else if (!isHalfBreedEdit) {
            setIsHalfBreedEdit(true);
            formik.setFieldValue('advert_breed_id', '');
        }
    };
    const handleChangeBreed = (e) => {
        formik.setFieldValue('advert_breed_id', e.value);
    }

    useEffect(() => {
        formik.setFieldValue('dog_sex_type_id', sexIdNumber);
    }, [sexIdNumber]);



    useEffect(() => {
        formik.setFieldValue('is_halfbreed', isHalfBreedEdit);
        isHalfBreedEdit && formik.setFieldValue('advert_breed_id', '');
    }, [isHalfBreedEdit]);

    return (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
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
                                <FormField
                                    className={`ArticleCreateForm__input-city`}
                                    {...fields.dog_city}
                                />
                                <FormGroup inline className="article-edit__ad">
                                    <CustomCheckbox
                                         id="isHalfBreed_checkbox"
                                         label="Метис"
                                         className="ArticleCreateForm__ad"
                                         checked={isHalfBreedEdit}
                                         onChange={handleChangeHalfBreed}
                                     />
                                    <FormField
                                        className={`article-edit__input-breedId ${(isHalfBreedEdit) && 'disabled'}`}
                                        {...fields.advert_breed_id}
                                        options={breeds}
                                        onChange={(e) => handleChangeBreed(e)}
                                    />
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
                    }
                    <FormGroup inline className="article-edit__ad">
                        <CustomChipList {...fields.advert_type_id} options={advertTypes} setIsMating={setIsMating} advertTypeId={advertTypeId}/>
                    </FormGroup>
                </div>
            }
            <FormControls className="article-edit__form-controls">
                <button type="button" className="btn" onClick={onCancel}>Отмена</button>
                <SubmitButton
                    type="submit"
                    className={`article-edit__button${formik.isValid ? ' _active' : ''}`}
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