import React, { useState, useEffect } from "react";
import { Fade } from "@progress/kendo-react-animation";
import { SvgIcon } from "@progress/kendo-react-common";
import { Button, Chip } from "@progress/kendo-react-buttons";
import { folder, chevronLeft } from "@progress/kendo-svg-icons";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import FormUpload from "./components/FormUpload";
import Loading from "../../../components/Loading";
import { getHeaders, Request } from "../../../utils/request";
import DocumentItemReadOnly from "../../UploadedDocuments/components/DocumentItemReadOnly";

import "./index.scss";
import Alert from "../../Alert";

const AttachFile = ({ documents, categories, setDocuments, setCategories, closeModal, isFederation }) => {
    const [formProps, setFormProps] = useState(null);
    const [activeCategory, setActiveCategory] = useState('');
    const [touchedCategories, setTouchedCategories] = useState('');
    const [attachBlocked, setAttachBlocked] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [attachedDocuments, setAttachedDocuments] = useState([]);
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        !categories && getCategories();
        if (documents.length) {
            setAttachedDocuments(documents.filter(d => d.category_id || d.category_id === 0));
            setUploadedDocuments(documents
                .filter(d => d.category_id === undefined || d.category_id === null)
                .map(d => ({ ...d, uid: d.uid ? d.uid : d.id?.toString(), status: 1 }))
            );
            setTouchedCategories(Array.from(new Set(documents.map(d => d.category_id))));
            setLoaded(true);
        } else {
            setLoaded(true);
        }
    }, []);

    const getCategories = async () => {
        await Request({
            url: `/api/document/publicdocument/categories_with_documents`
        }, data => {
            if (data) {
                setCategories(data);
            }
        }, error => {
            handleError(error);
        });
    };

    const handleSuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const handleError = e => {
        if (e.response) {
            let message;
            if (e.response.data) {
                message = e.response.data.errors
                    ? Object.values(e.response.data.errors)
                    : `${e.response.status} ${e.response.statusText}`;
            } else if (e.response.errors) {
                message = e.response.errors
                    ? Object.values(e.response.errors)
                    : `${e.response.status} ${e.response.statusText}`;
            } else {
                message = 'Произошла ошибка';
            }
            setErrorMessage(message);
            setError(true);
            !error && setTimeout(() => {
                setError(false);
            }, 5000);
        }
    };

    const handleChipClick = (document, category) => {
        const { id, name } = document;
        if (attachedDocuments.find(d => d.id === id)) {
            const updated = attachedDocuments.filter(d => d.id !== id);
            setAttachedDocuments(updated);
            setTouchedCategories(Array.from(new Set(updated.map(d => d.category_id))));
            setAttachBlocked(false);
        } else {
            const updated = [
                ...attachedDocuments,
                { id: id, name: name, category_id: category.id }
            ];
            setAttachedDocuments(updated);
            setTouchedCategories(Array.from(new Set(updated.map(d => d.category_id))));
            (uploadedDocuments.length + updated.length) > 2 && setAttachBlocked(true);
        }
    }

    const handleAttach = () => {
        setDocuments([
            ...uploadedDocuments.filter(d => d.status !== 2),
            ...attachedDocuments
        ]);
        closeModal();
    }

    const isSelected = id => {
        if (attachedDocuments.filter(d => d.id === id).length) {
            return true
        } else {
            return false
        }
    }

    const onAdd = (event) => {
        const { newState } = event;
        console.log('newState', newState);
        if ((attachedDocuments.length + newState.length) <= 3) {
            formProps.onChange('documents', { value: newState })
        } else {
            setAlert(true);
        }
    }

    const onRemove = (event) => {
        const { newState } = event;
        formProps.onChange('documents', { value: newState });
    }

    const onProgress = (event, name) => formProps.onChange(name, { value: event.newState });

    const onBeforeUpload = (e, type) => {
        e.headers = getHeaders(true);
    };

    const onStatusChange = (event, name) => {
        const { newState, affectedFiles, response } = event;
        if (response) {
            if (response.status === 201) {
                const updatedNewState = newState.map(d => d.uid === affectedFiles[0].uid
                    ? ({ ...d, id: response.response?.result?.id, name: response.response?.result?.name })
                    : d);
                formProps.onChange(name, { value: updatedNewState });
                setUploadedDocuments(updatedNewState);
                (updatedNewState.length + attachedDocuments.length) > 2 && setAttachBlocked(true);
                !newState.find(d => d.status !== 4) && handleSuccess();
            } else {
                if (affectedFiles.length) {
                    setUploadedDocuments(newState.filter(d => d.uid !== affectedFiles[0].uid));
                    setAttachBlocked(false);
                }
                handleError(response);
            }

        } else {
            formProps.onChange(name, { value: newState });
        }
    }

    return (
        <div className="AttachFile">
            {
                loaded && categories
                    ? <>
                        <Form
                            initialValues={{ documents: uploadedDocuments }}
                            render={formRenderProps => {
                                if (!formProps) setFormProps(formRenderProps);
                                return (<FormElement>
                                    <Field
                                        id="documents"
                                        name="documents"
                                        component={FormUpload}
                                        saveUrl="/api/article/public_document"
                                        saveField="file"
                                        accept={isFederation ? ".pdf, .doc, .docx" : ".pdf"}
                                        multiple={true}
                                        showActionButtons={true}
                                        onAdd={onAdd}
                                        onRemove={onRemove}
                                        onBeforeUpload={e => onBeforeUpload(e, 27)}
                                        onStatusChange={(e) => onStatusChange(e, 'documents')}
                                        onProgress={(e) => onProgress(e, 'documents')}
                                        disabled={attachBlocked}
                                    />
                                </FormElement>)
                            }} />
                        {
                            !!categories.length && <div className="AttachFile__breadcrumbs">
                                <h3 className="AttachFile__breadcrumbs-title">
                                    {`Категории${activeCategory ? ' / ' + activeCategory.name : ''}`}
                                </h3>
                                {activeCategory && <div className="AttachFile__breadcrumbs-back-btn" onClick={() => setActiveCategory(false)}>
                                    <SvgIcon icon={chevronLeft} size="default" />Назад к категориям
                                </div>
                                }
                            </div>
                        }
                        <div className="AttachFile__file-explorer">
                            {activeCategory
                                ? <div className="AttachFile__documents">
                                    {categories
                                        .filter(c => c.category_id === activeCategory.id)[0].documents
                                        .map(doc => <div
                                            key={doc.id}
                                            className="AttachFile__document">
                                            <DocumentItemReadOnly
                                                {...doc}
                                                categories={categories}
                                                editable={false}
                                            />
                                            <div className="AttachFile__document-chip">
                                                <Chip
                                                    text="Прикрепить"
                                                    value="chip"
                                                    disabled={attachBlocked && !isSelected(doc.id)}
                                                    onClick={() => handleChipClick(doc, activeCategory)}
                                                    selected={isSelected(doc.id)}
                                                />
                                            </div>
                                        </div>)}
                                </div>
                                : <div className="AttachFile__categories">
                                    {categories.map(c => <div
                                        key={c.category_id}
                                        className="AttachFile__category"
                                        onClick={() => { setActiveCategory({ id: c.category_id, name: c.category_name }) }}>
                                        <div className="AttachFile__category-inner">
                                            <SvgIcon icon={folder} size="default" />
                                            <span>{c.category_name}</span>
                                        </div>
                                        {
                                            touchedCategories.includes(c.category_id) &&
                                            <div className="AttachFile__category-counter">
                                                {attachedDocuments.filter(d => d.category_id === c.category_id).length}
                                            </div>
                                        }
                                    </div>)}
                                </div>
                            }
                        </div>
                        <div className="AttachFile__info">
                            {attachBlocked ? 'Вы прикрепили максимальное количество файлов' : 'Макс. количество: 3 файла'}
                        </div>
                        <div className="AttachFile__button">
                            {(!!attachedDocuments.length || !!uploadedDocuments.length) &&
                                <Button className="k-button k-primary" onClick={handleAttach} >Прикрепить</Button>
                            }
                        </div>
                    </>
                    : <Loading centered={false} />
            }
            <NotificationGroup
                style={{
                    alignItems: 'flex-start',
                    flexWrap: 'wrap-reverse'
                }}
            >
                <Fade enter={true} exit={true}>
                    {success.status && <Notification
                        type={{ style: 'success', icon: true }}
                        closable={true}
                        onClose={() => setSuccess(false)}
                    >
                        <span>{success.message ? success.message : 'Успешно загружено!'} </span>
                    </Notification>}
                </Fade>
                <Fade enter={true} exit={true}>
                    {error && <Notification
                        type={{ style: 'error', icon: true }}
                        closable={true}
                        onClose={() => setError(false)}
                    >
                        <span>{errorMessage}</span>
                    </Notification>}
                </Fade>
            </NotificationGroup>
            {alert &&
                <Alert
                    text="11111111"
                    okButton={true}
                    autoclose={1.5}
                    onOk={() => {
                        setAlert(false);
                        closeModal();
                        }
                    }
                />
            }
        </div>
    )
};

export default React.memo(AttachFile);