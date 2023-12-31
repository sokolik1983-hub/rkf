import React, { useState } from "react";
import { SvgIcon } from "@progress/kendo-react-common";
import { pencil, trash } from "@progress/kendo-svg-icons";
import { Upload } from "@progress/kendo-react-upload";
import { Button } from "@progress/kendo-react-buttons";
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import ls from "local-storage";

import DocumentItem from "../DocumentItem";
import DocumentItemReadOnly from "../DocumentItemReadOnly";
import Card from "components/Card";
import { Request, getHeaders } from "utils/request";
import kendoMessages from 'kendoMessages.json';
import { DEFAULT_IMG } from "appConfig";

import './styles.scss';

loadMessages(kendoMessages, 'ru-RU');

const Category = ({ canEdit, id, currentCategory, categories, unsortedCategory, documents, setModal, getDocuments, handleError, handleSuccess, editable }) => {
    const [documentsToUpdate, setDocumentsToUpdate] = useState([]);
    const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';
    const isFederation = userType === 5;

    const onBeforeUpload = event => {
        event.headers = getHeaders(true);
        event.additionalData = { category_id: id };
    };

    const onStatusChange = ({ response }) => {
        const { request } = response;
        if (request.status === 200) {
            getDocuments();
            handleSuccess('Документ загружен!');
        } else {
            handleError(request);
        }
    };

    const handleDocumentsUpdate = async () => {
        setDocumentsToUpdate([]);
        await Request({
            url: '/api/document/publicdocument/documents_category',
            method: 'POST',
            data: JSON.stringify({ "documents": documentsToUpdate })
        }, () => {
            getDocuments(true);
        }, error => {
            handleError(error);
        });
    };
    
    return <Card className="UploadedDocuments__category">
        <div className="row d-flex align-items-center">
            <div className="col-11">
                <h1 className="UploadedDocuments__category-title">
                    {currentCategory ? currentCategory.name : 'Документы'}
                    {canEdit && id > 0 && editable && <button
                        className="UploadedDocuments__category-btn"
                        type="button"
                        onClick={() => setModal({ type: 'editCategory', categoryId: id, categoryName: currentCategory.name })}
                    >
                        <SvgIcon icon={pencil} size="default" />
                    </button>}
                </h1>
            </div>
            <div className="col-1">
                {canEdit && id > 0 && editable && <button
                    className="DocumentItem__delete-btn"
                    type="button"
                    onClick={() => setModal({ type: 'deleteCategory', categoryId: id })}
                >
                    <SvgIcon icon={trash} size="default" />
                </button>}
            </div>
        </div>
        <hr className="mt-0" />
        {
            canEdit
                ? documents.filter(d => d.category_id === id)
                    .map((d, i) => <DocumentItem
                        {...d}
                        key={i}
                        categories={categories}
                        unsortedCategory={unsortedCategory}
                        setModal={setModal}
                        documentsToUpdate={documentsToUpdate}
                        setDocumentsToUpdate={setDocumentsToUpdate}
                        editable={editable}
                    />)
                : <div className="DocumentItem container p-0">
                    <div className="d-flex flex-column align-items-start">
                        {
                            documents.filter(d => d.category_id === id)
                                .map((d, i) => <DocumentItemReadOnly key={i} {...d} categories={categories} setModal={setModal} />)
                        }
                    </div>
                </div>
        }
        {!(documents.filter(document => document.category_id === id)).length && <div className="UploadedDocuments__category-placeholder">
            <h4>Не добавлено ни одного документа</h4>
            <img src={DEFAULT_IMG.noNews} alt="" />
        </div>
        }
        {
            !!documentsToUpdate.length && <div className="DocumentItem container p-0 mb-4">
                <div className="row d-flex align-items-center">
                    <div className="col-8">
                    </div>
                    <div className="col-3 text-right">
                        <Button type="button" className="k-primary" onClick={handleDocumentsUpdate}>Применить</Button>
                    </div>
                </div>
            </div>
        }
        {canEdit && editable && <LocalizationProvider language="ru-RU">
            <IntlProvider locale="ru" >
                <Upload
                    batch={true}
                    multiple={false}
                    maxFileSize={10485760}
                    accept={isFederation ? `.pdf, .doc, .docx` : `.pdf`}
                    restrictions={{
                        allowedExtensions: isFederation ? ['.pdf', '.doc', '.docx'] : ['.pdf'],
                        maxFileSize: 10485760
                    }}
                    withCredentials={false}
                    showFileList={true}
                    defaultFiles={[]}
                    onBeforeUpload={onBeforeUpload}
                    onStatusChange={onStatusChange}
                    saveUrl="/api/document/publicdocument"
                    disabled={!editable}
                />
            </IntlProvider>
        </LocalizationProvider>}
    </Card>;
};

export default React.memo(Category);