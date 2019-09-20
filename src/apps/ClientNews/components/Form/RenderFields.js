import React, { useRef } from 'react';
import ClientAvatar from 'components/ClientAvatar';
import { connect } from 'formik';
import { useVisibility } from 'shared/hooks';
import {
    SubmitButton,
    FormControls,
    FormGroup,
    FormField,
} from 'components/Form'


const FormButton = ({ isUpdate, isValid }) => {
    return (
        isUpdate
            ? <SubmitButton type="submit" className="btn-simple btn-lg">Обновить</SubmitButton>
            : <SubmitButton type="submit" className={`ArticleCreateForm__button ${isValid ? 'active' : ''}`}>Добавить новость</SubmitButton>
    );
}



const RenderFields = ({ fields, isUpdate, formik }) => {
    const textarea = useRef();
    const { visibility, toggleVisibility } = useVisibility(false);
    const attachImg = visibility
        ? '/static/icons/client/attach-image-active.svg'
        : '/static/icons/client/attach-image.svg';
    const handleKeyDown = (e) => {
        const textarea = e.target;
        var offset = textarea.offsetHeight - textarea.clientHeight;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + offset + 'px';
        formik.setFieldValue('content', textarea.value);
    }
    return (
        <>
            <FormGroup className="ArticleCreateForm__wrap">
                <ClientAvatar size={46} />
                <FormField
                    {...fields.content}
                    onChange={handleKeyDown}
                    ref={textarea}
                    rows="1"
                />
                <img className="ArticleCreateForm__add-emoji" src={'/static/icons/client/add-emoji.svg'} alt="" />
            </FormGroup>
            {
                visibility
                    ? <FormField {...fields.file} />
                    : null
            }
            <FormControls>
                <div className="ArticleCreateForm__attach">
                    <img className="ArticleCreateForm__attach-image" src={attachImg} alt="" onClick={toggleVisibility} />
                    <img className="ArticleCreateForm__attach-file" src={'/static/icons/client/attach-file.svg'} alt="" />
                </div>
                <FormButton isUpdate={isUpdate} isValid={formik.isValid} />
            </FormControls>
        </>
    );
}




export default connect(RenderFields)