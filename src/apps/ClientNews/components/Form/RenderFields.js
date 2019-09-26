import React, { useRef, useState } from 'react';
import ClientAvatar from 'components/ClientAvatar';
import { connect } from 'formik';
import { useFocus } from 'shared/hooks';
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

const RenderFields = ({ fields, isUpdate, formik }) => {
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

    const { focus, setFocused } = useFocus(false);
    const handleKeyDown = (e) => {
        const textarea = e.target;
        var offset = textarea.offsetHeight - textarea.clientHeight;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + offset + 'px';
        formik.setFieldValue('content', textarea.value);
    }
    return (
        <React.Fragment>
            <input type="file" name="file" id="file" className="ArticleCreateForm__inputfile" onChange={handleChange} />


            <FormGroup className={focus ? 'ArticleCreateForm__wrap' : 'ArticleCreateForm__wrap inactive'}>
                <ClientAvatar size={46} />
                <FormField
                    {...fields.content}
                    onChange={handleKeyDown}
                    onFocus={setFocused}
                    ref={textarea}
                    rows="1"
                />
                {
                    !focus
                        ? (
                            <>
                                <label htmlFor="file" className="ArticleCreateForm__labelfile"></label>
                                <img className="ArticleCreateForm__add-emoji" src={'/static/icons/client/add-emoji.svg'} alt="" />
                                <FormButton isUpdate={isUpdate} isValid={formik.isValid} />
                            </>
                        )
                        : null
                }
            </FormGroup>
            {
                focus
                    ? (<React.Fragment>
                        <img className="ArticleCreateForm__add-emoji" src={'/static/icons/client/add-emoji.svg'} alt="" />

                        <div className="ImagePreview__wrap">
                            {
                                src ? (<> <ImagePreview src={src} /> <img src="/static/icons/file-cross.svg" className="ImagePreview__close" alt="" onClick={handleClose} /> </>) : null
                            }
                        </div>
                        <FormControls>
                            <div className="ArticleCreateForm__attach">

                                <label htmlFor="file" className="ArticleCreateForm__labelfile"></label>
                                <img className="ArticleCreateForm__add-emoji" src={'/static/icons/client/add-emoji.svg'} alt="" />
                                {/* <img className="ArticleCreateForm__attach-file" src={'/static/icons/client/attach-file.svg'} alt="" /> */}
                            </div>
                            <FormButton isUpdate={isUpdate} isValid={formik.isValid} />
                        </FormControls>
                    </React.Fragment>)
                    : null
            }

        </React.Fragment>

    );
}

export default connect(RenderFields)