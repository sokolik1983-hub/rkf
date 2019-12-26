import React from 'react';
import Form from './Form.js';
import { newsArticleEditFormConfig } from 'apps/ClientNews/config';
import RenderFields from './RenderFields';
import { connectArticleForm } from 'apps/ClientNews/connectors';
import { Request } from "utils/request";
import './styles.scss';

const { fields } = newsArticleEditFormConfig;


function ArticleEditFormPublic({ content, file, id, onEditCancel, editArticleSuccess }) {
    const prevFile = file;

    const updateImage = (content, file) => {
        if (file) {
            if ((file !== prevFile)) { // Update image
                const data = new FormData();
                data.append('id', id);
                data.append('file', typeof file === 'string'
                    ? new File([file], file, { type: "image/jpeg" })
                    : file);
                Request({
                    url: `/api/ClubArticle/image`,
                    method: "POST",
                    data: data,
                    isMultipart: true
                }, (result) => {
                    editArticleSuccess({id, content, file: result.picture_link});
                    onEditCancel();
                });
            } else {
                editArticleSuccess({id, content});
                onEditCancel();
            }
        } else { // Delete image
            Request({
                url: `/api/ClubArticle/image/${id}`,
                method: "DELETE"
            }, () => {
                editArticleSuccess({id, content, file: ''});
                onEditCancel();
            });
        }
    };

    const handleSubmit = ({ content, file }) => {
        Request({
            url: `/api/ClubArticle`,
            method: "PUT",
            data: JSON.stringify({ id, content })
        }, () => updateImage(content, file));
    };

    const transformValues = values => ({ id: id, file: values.file });

    return (
        <Form
            isMultipart
            transformValues={transformValues}
            resetForm="true"
            callback={handleSubmit}
            {...newsArticleEditFormConfig}
            className="ArticleEditForm"
        >
            <RenderFields fields={fields} content={content} file={file} id={id} onEditCancel={onEditCancel} />
        </Form>
    )
}

export default connectArticleForm(ArticleEditFormPublic)