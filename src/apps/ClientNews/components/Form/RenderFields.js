import React, { useRef, useState } from 'react';
import ClientAvatar from 'components/ClientAvatar';
import { connect } from 'formik';
import { useFocus } from 'shared/hooks';
import OutsideClickHandler from "react-outside-click-handler";
import { connectArticleCreateForm } from '../../connectors';
import {
    SubmitButton,
    FormControls,
    FormGroup,
    FormField,
} from 'components/Form'
import ImagePreview from 'components/ImagePreview';

const FormButton = ({ isUpdate, isValid }) => {
    return (
        isUpdate
            ? <SubmitButton type="submit" className="btn-simple btn-lg">Обновить</SubmitButton>
            : <SubmitButton type="submit" className={`ArticleCreateForm__button ${isValid ? 'active' : ''}`}>Добавить новость</SubmitButton>
    );
}


const RenderFields = ({ fields, isUpdate, formik, clubLogo }) => {
    const textarea = useRef();
    const [src, setSrc] = useState('');
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
    }

    const { focus, setFocused, setBlured } = useFocus(false);
    const handleKeyDown = (e) => {
        const textarea = e.target;
        var offset = textarea.offsetHeight - textarea.clientHeight;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + offset + 'px';
        textarea.value.length > 3000
            ? alert('Превышено максимальное кол-во символов')
            : formik.setFieldValue('content', textarea.value);
    }
    const handleOutsideClick = () => {
        setBlured();
    }
    const { content, file } = formik.values;
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
                <ClientAvatar size={46} avatar={clubLogo} />
                <FormField
                    {...fields.content}
                    onChange={handleKeyDown}
                    onFocus={setFocused}
                    maxLength="3001"
                    value={content ? content : ''}
                    ref={textarea}
                    rows="1"
                />
                {
                    !focus
                        ? (
                            <>
                                <label htmlFor="file" className="ArticleCreateForm__labelfile"></label>
                                {/* <img className="ArticleCreateForm__add-emoji" src={'/static/icons/client/add-emoji.svg'} alt="" /> */}
                                <FormButton isUpdate={isUpdate} isValid={formik.isValid} />
                            </>
                        )
                        : null
                }
            </FormGroup>
            {
                focus
                    ? (<React.Fragment>
                        {/* <img className="ArticleCreateForm__add-emoji" src={'/static/icons/client/add-emoji.svg'} alt="" /> */}

                        <div className="ImagePreview__wrap">
                            {
                                file ? (<> <ImagePreview src={src} /> <img src="/static/icons/file-cross.svg" className="ImagePreview__close" alt="" onClick={handleClose} /> </>) : null
                            }
                        </div>
                        <FormControls>
                            <div className="ArticleCreateForm__attach">

                                <label htmlFor="file" className="ArticleCreateForm__labelfile"></label>
                                {/* <img className="ArticleCreateForm__add-emoji" src={'/static/icons/client/add-emoji.svg'} alt="" /> */}
                                {/* <img className="ArticleCreateForm__attach-file" src={'/static/icons/client/attach-file.svg'} alt="" /> */}
                            </div>
                            <FormButton isUpdate={isUpdate} isValid={formik.isValid} />
                        </FormControls>
                    </React.Fragment>)
                    : null
            }
        </OutsideClickHandler>
    );
}

export default connectArticleCreateForm(connect(RenderFields))