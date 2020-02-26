import React from 'react'
import ArticleEditFormPublic from './ArticleEditFormPublic';
import {connectAuthVisible} from "../../../../pages/Login/connectors";

function EditArticleForm({ isAuthenticated, content, file, id, onEditCancel }) {

    if (!isAuthenticated) return null;

    return <ArticleEditFormPublic content={content} file={file} id={id} onEditCancel={onEditCancel} />
}

export default connectAuthVisible(EditArticleForm);