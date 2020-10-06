import React, {useState, useEffect} from "react";
import OutsideClickHandler from "react-outside-click-handler";
import getYouTubeID from "get-youtube-id";
import {connect} from "formik";
import Modal from "../Modal";
import {SubmitButton, FormControls, FormGroup, FormField} from '../Form';
import CustomCheckbox from "../Form/CustomCheckbox";
import CustomNumber from "../Form/Field/CustomNumber";
import CustomChipList from "../Form/Field/CustomChipList";
import AddVideoLink from "./AddVideoLink";
import ClientAvatar from "../ClientAvatar";
import ImagePreview from "../ImagePreview";
import WikiHelp from "../WikiHelp";
import {DEFAULT_IMG, BAD_SITES} from "../../appConfig";
import {useFocus} from "../../shared/hooks";
import {Request} from "../../utils/request";


const RenderFields = ({ fields, logo, formik, isAd, setIsAd, videoLink, setVideoLink, isMating, setIsMating }) => {
    const [src, setSrc] = useState('');
    const [advertTypes, setAdvertTypes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const { focus, setFocused, setBlured } = useFocus(false);
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
        } else {
            formik.setFieldValue('file', '');
            setSrc('');
        }
        setFocused();
    };

    const addVideoLink = link => {
        formik.setFieldValue('video_link', link);
        setVideoLink(link);
        setFocused();
    };

    const removeVideoLink = () => {
        formik.setFieldValue('video_link', '');
        setVideoLink('');
    };

    const handleClose = () => {
        formik.setFieldValue('file', '');
        setSrc('');
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

    const handleOutsideClick = () => {
        setBlured();
    };

    const addRow = () => {
        let charactersInRow = 90;
        let maxNumberOfRows = 25;
        let numberOfRows = Math.round(content.length / charactersInRow);

        if (numberOfRows < maxNumberOfRows) {
            return numberOfRows;
        } else {
            return maxNumberOfRows;
        }
    };

    return (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            <input
                type="file"
                name="file"
                id="file"
                className="ArticleCreateForm__inputfile"
                onChange={handleChange}
            />
            <FormGroup className={focus ? 'ArticleCreateForm__wrap' : 'ArticleCreateForm__wrap inactive'}>
                <ClientAvatar size={60} avatar={logo || DEFAULT_IMG.clubAvatar} />
                <FormField
                    {...fields.content}
                    onChange={handleKeyDown}
                    onFocus={setFocused}
                    maxLength="4096"
                    value={content ? content : ''}
                    rows={content ? addRow() : "1"}
                />
            </FormGroup>
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
                    {isAd &&
                        <>
                            <FormGroup inline className="ArticleCreateForm__advert">
                                <FormField {...fields.advert_breed_id} />
                                <CustomNumber {...fields.advert_cost} />
                                {!isMating && <CustomNumber {...fields.advert_number_of_puppies} />}
                            </FormGroup>
                            <FormGroup inline>
                                <CustomChipList {...fields.advert_type_id} options={advertTypes} setIsMating={setIsMating} />
                            </FormGroup>
                        </>
                    }
                    {content &&
                        <div className="ArticleCreateForm__length-hint">
                            <span className="ArticleCreateForm__content-length">
                                {`осталось ${4096 - content.length} знаков`}
                            </span>
                        </div>
                    }
                    <FormControls className="ArticleCreateForm__controls">
                        <label htmlFor="file" className="ArticleCreateForm__labelfile">Прикрепить изображение</label>
                        {!isAd && !videoLink &&
                            <button
                                className={`ArticleCreateForm__attach-video${(isAd || videoLink) ? ' _disabled' : ''}`}
                                type="button"
                                onClick={() => (isAd || videoLink) ? null : setShowModal(true)}>
                                Добавить ссылку на видео
                            </button>
                        }
                        {!videoLink &&
                            <CustomCheckbox
                                id="ad"
                                label="Объявление"
                                className="ArticleCreateForm__ad"
                                checked={isAd}
                                onChange={() => setIsAd(!isAd)}
                            />
                        }
                        <div className="ArticleCreateForm__button-wrap">
                            <WikiHelp
                                url="https://help.rkf.online/ru/knowledge_base/art/53/cat/3/#/"
                                title="Инструкция по добавлению новости"
                            />
                            <SubmitButton
                                type="submit"
                                className={`ArticleCreateForm__button ${formik.isValid ? 'active' : ''}`}
                            >
                                Опубликовать
                            </SubmitButton>
                        </div>
                    </FormControls>
                </>
            {showModal &&
                <Modal
                    className="ArticleCreateForm__modal"
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                >
                    <AddVideoLink
                        setVideoLink={addVideoLink}
                        showModal={setShowModal}
                    />
                </Modal>
            }
        </OutsideClickHandler>
    )
};

export default connect(RenderFields);