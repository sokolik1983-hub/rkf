import React, { useState } from "react";
import DocumentItem from "../DocumentItem";
import DocumentItemReadOnly from "../DocumentItemReadOnly";
import { SvgIcon } from "@progress/kendo-react-common";
import { pencil } from "@progress/kendo-svg-icons";
import { Upload } from "@progress/kendo-react-upload";
import Card from "components/Card";
import { Button } from "@progress/kendo-react-buttons";
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import { Request, getHeaders } from "utils/request";
import kendoMessages from 'kendoMessages.json';
import './styles.scss';

loadMessages(kendoMessages, 'ru-RU');

const Category = ({ canEdit, id, currentCategory, categories, unsortedCategory, documents, setModal, getDocuments, handleError, handleSuccess }) => {
    const [documentsToUpdate, setDocumentsToUpdate] = useState([]);

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
        <h1 className="UploadedDocuments__category-title">
            {currentCategory ? currentCategory.name : 'Неотсортированные'}
            {canEdit && id > 0 && <button
                className="UploadedDocuments__category-btn"
                type="button"
                //title="Редактировать"
                onClick={() => setModal({ type: 'editCategory', categoryId: id, categoryName: currentCategory.name })}
            >
                <SvgIcon icon={pencil} size="default" />
            </button>}
        </h1>
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
                    />)
                : <div className="DocumentItem container p-0">
                    <div className="row d-flex align-items-center">
                        {
                            documents.filter(d => d.category_id === id)
                                .map((d, i) => <DocumentItemReadOnly key={i} {...d} categories={categories} setModal={setModal} />)
                        }
                    </div>
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
        {canEdit && <LocalizationProvider language="ru-RU">
            <IntlProvider locale="ru" >
                <Upload
                    batch={true}
                    multiple={false}
                    maxFileSize={10485760}
                    accept=".pdf"
                    restrictions={{
                        allowedExtensions: ['.pdf']
                    }}
                    withCredentials={false}
                    showFileList={false}
                    defaultFiles={[]}
                    onBeforeUpload={onBeforeUpload}
                    onStatusChange={onStatusChange}
                    saveUrl="/api/document/publicdocument"
                />
            </IntlProvider>
        </LocalizationProvider>}
    </Card>;
};

export default React.memo(Category);