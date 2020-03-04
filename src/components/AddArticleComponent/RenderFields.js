import React, { useState } from 'react';
import OutsideClickHandler from "react-outside-click-handler";
import {connect} from 'formik';
import {SubmitButton, FormControls, FormGroup, FormField} from '../Form';
import ClientAvatar from "../ClientAvatar";
import ImagePreview from "../ImagePreview";
import {DEFAULT_IMG, BAD_SITES} from "../../appConfig";
import {useFocus} from "../../shared/hooks";


const RenderFields = ({fields, clubLogo, formik}) => {
    const [src, setSrc] = useState('');
    const {focus, setFocused, setBlured} = useFocus(false);
    const {content, file} = formik.values;

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

    const handleClose = () => {
        formik.setFieldValue('file', '');
        setSrc('');
    };

    const handleKeyDown = (e) => {
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
                <ClientAvatar size={60} avatar={clubLogo ? clubLogo : DEFAULT_IMG.clubAvatar} />
                <FormField
                    {...fields.content}
                    onChange={handleKeyDown}
                    onFocus={setFocused}
                    maxLength="4096"
                    value={content ? content : ''}
                    rows={content ? "3" : "1"}
                />
                {!focus &&
                    <>
                        <label htmlFor="file" className="ArticleCreateForm__labelfile" />
                        <SubmitButton type="submit"
                                      className={`ArticleCreateForm__button ${formik.isValid ? 'active' : ''}`}
                        >
                            Добавить новость
                        </SubmitButton>
                    </>
                }
            </FormGroup>
            {focus &&
                <>
                    <div className="ImagePreview__wrap">
                        {file &&
                            <>
                                <ImagePreview src={src} />
                                <img src="/static/icons/file-cross.svg"
                                     className="ImagePreview__close"
                                     alt=""
                                     onClick={handleClose}
                                />
                            </>
                        }
                    </div>
                    <FormControls>
                        <div className="ArticleCreateForm__attach">
                            <label htmlFor="file" className="ArticleCreateForm__labelfile"/>
                        </div>
                        <div className="ArticleCreateForm__length-hint">
                        <span className="ArticleCreateForm__content-length">{content ? `осталось ${4096 - content.length} знаков`:''}</span>
                            <SubmitButton type="submit"
                                          className={`ArticleCreateForm__button ${formik.isValid ? 'active' : ''}`}
                            >
                                Добавить новость
                            </SubmitButton>
                        </div>
                    </FormControls>
                </>
            }
        </OutsideClickHandler>
    )
};

export default connect(RenderFields);
