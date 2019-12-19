import React, { useState } from 'react';
import OutsideClickHandler from "react-outside-click-handler";
import {connect} from 'formik';
import {SubmitButton, FormControls, FormGroup, FormField} from '../../../../components/Form';
import ClientAvatar from "../../../../components/ClientAvatar";
import ImagePreview from "../../../../components/ImagePreview";
import {DEFAULT_IMG} from "../../../../appConfig";
import {useFocus} from "../../../../shared/hooks";


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
        const textarea = e.target;
        const offset = textarea.offsetHeight - textarea.clientHeight;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + offset + 'px';
        textarea.value.length > 3000
            ? alert('Превышено максимальное кол-во символов (3000 симв.)')
            : formik.setFieldValue('content', textarea.value);

        const regexp = /http:\/\/[^\s]+/g;
        Array.from(e.target.value.matchAll(regexp)).map(item => alert(`${item['0']} - небезопасная ссылка и будет удалена`));
        formik.setFieldValue('content', e.target.value.replace(regexp, ''));
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
                    maxLength="3001"
                    value={content ? content : ''}
                    rows="1"
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
                        <SubmitButton type="submit"
                                      className={`ArticleCreateForm__button ${formik.isValid ? 'active' : ''}`}
                        >
                            Добавить новость
                        </SubmitButton>
                    </FormControls>
                </>
            }
        </OutsideClickHandler>
    )
};

export default connect(RenderFields);