import React from "react";
import getYouTubeID from "get-youtube-id";
import {Field, Form, FormElement} from "@progress/kendo-react-form";
import FormInput from "../../kendo/Form/FormInput";
import "./index.scss";


const AddVideoLink = ({ setVideoLink, closeModal }) => {
    const youtubeLinkValidator = value => {
        let error = '';

        if(!value) {
            error = 'Добавьте ссылку';
        } else {
            const id = getYouTubeID(value);
            error = !id ? 'Для добавления доступны только ссылки с YouTube' : ''
        }

        return error;
    };

    const handleSubmit = data => {
        const id = getYouTubeID(data.youtube_link);
        setVideoLink(`https://www.youtube.com/embed/${id}`);
        closeModal();
    };

    return (
        <div className="add-video-link">
            <Form
                className="add-video-link__form"
                onSubmit={handleSubmit}
                initialValues={{youtube_link: ''}}
                render={formRenderProps =>
                    <FormElement>
                        <Field
                            id="youtube_link"
                            name="youtube_link"
                            placeholder="Ссылка на видео YouTube"
                            maxLength={150}
                            cutValue={150}
                            component={FormInput}
                            validator={youtubeLinkValidator}
                        />
                        <div className="add-video-link__form-controls">
                            <button
                                type="submit"
                                className="add-video-link__form-submit"
                                disabled={!formRenderProps.modified || !formRenderProps.valid}
                            >Добавить
                            </button>
                        </div>
                    </FormElement>
                }
            />
        </div>
    )
};

export default React.memo(AddVideoLink);