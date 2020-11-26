import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import FormUpload from "./components/FormUpload";
import { SvgIcon } from "@progress/kendo-react-common";
import { file, folder, chevronLeft } from "@progress/kendo-svg-icons";
import { Button, Chip } from '@progress/kendo-react-buttons';
import Loading from "components/Loading";
import { Request, getHeaders } from "utils/request";
import moment from "moment";
import "./index.scss";


const AttachFile = ({ documents, categories, setDocuments, setCategories, closeModal }) => {
    const [formProps, setFormProps] = useState(null);
    const [activeCategory, setActiveCategory] = useState('');
    const [touchedCategories, setTouchedCategories] = useState('');
    const [attachBlocked, setAttachBlocked] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loaded, setLoaded] = useState(!!categories.length);
    const [attachedDocuments, setAttachedDocuments] = useState([]);
    const [uploadedDocuments, setUploadedDocuments] = useState([]);

    useEffect(() => {
        !categories.length && getCategories();
    }, []);

    const getCategories = async () => {
        await Request({
            url: `/api/document/publicdocument/categories_with_documents`
        }, data => {
            if (data) {
                setCategories(data);
                setLoaded(true);
            } else {
                setError('Номер родословной не найден в базе ВЕРК');
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
            setTouchedCategories(Array.from(new Set(updated.map(d => d.categoryId))));
            setAttachBlocked(false);
        } else {
            const updated = [
                ...attachedDocuments,
                { id: id, name: name, categoryId: category.id }
            ];
            setAttachedDocuments(updated);
            setTouchedCategories(Array.from(new Set(updated.map(d => d.categoryId))));
            (documents.length + uploadedDocuments.length + updated.length) > 2 && setAttachBlocked(true);
        }
    }

    const handleAttach = () => {
        setDocuments([
            ...documents,
            ...uploadedDocuments?.filter(d => d.status !== 1),
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
        if ((attachedDocuments.length + newState.length) <= 3) {
            formProps.onChange('documents', { value: newState })
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

            <Form
                initialValues={{ documents: documents?.map(d => ({ ...d, uid: d.id.toString(), status: 1 })) || [] }}
                render={formRenderProps => {
                    if (!formProps) setFormProps(formRenderProps);
                    return (<FormElement>
                        <Field
                            id="documents"
                            name="documents"
                            component={FormUpload}
                            saveUrl={'/api/article/public_document'}
                            saveField="file"
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
                !loaded
                    ? <Loading centered={false} />
                    : !!categories.length && <>
                        <div className="AttachFile__breadcrumbs">
                            <h3 className="AttachFile__breadcrumbs-title">
                                {`Категории${activeCategory ? ' / ' + activeCategory.name : ''}`}
                            </h3>
                            {activeCategory && <div className="AttachFile__breadcrumbs-back-btn" onClick={() => setActiveCategory(false)}>
                                <SvgIcon icon={chevronLeft} size="default" />Назад к категориям
                            </div>}
                        </div>
                        <div className="AttachFile__file-explorer">
                            {activeCategory
                                ? <div className="AttachFile__documents">
                                    {categories
                                        .filter(c => c.category_id === activeCategory.id)[0].documents
                                        .map(d => <div
                                            key={d.id}
                                            className="AttachFile__document">
                                            <div className="AttachFile__document-info-wrap">
                                                <SvgIcon icon={file} size="default" />
                                                <div className="AttachFile__document-info">
                                                    <span className="AttachFile__document-name">
                                                        <Link
                                                            to={`/docs/${d.id}`}
                                                            target="_blank"
                                                            className="d-flex align-items-center"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {d.name}
                                                        </Link>
                                                    </span>
                                                    <span className="AttachFile__document-date">
                                                        {`Добавлено ${moment(d.date_create).format('D MMMM YYYY')} в ${moment(d.date_create).format('HH:mm')}`}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="AttachFile__document-chip">
                                                <Chip
                                                    text="Прикрепить"
                                                    value="chip"
                                                    disabled={attachBlocked && !isSelected(d.id)}
                                                    onClick={() => handleChipClick(d, activeCategory)}
                                                    selected={isSelected(d.id)}
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
                                                {attachedDocuments.filter(d => d.categoryId === c.category_id).length}
                                            </div>
                                        }
                                    </div>)}
                                </div>
                            }
                        </div>
                    </>
            }
            <div className="AttachFile__info">
                {attachBlocked ? 'Вы прикрепили максимальное количество файлов' : 'Макс. количество: 3 файла'}
            </div>
            <div className="AttachFile__button">
                {(!!attachedDocuments.length || !!uploadedDocuments.length) &&
                    <Button className="k-button k-primary" onClick={handleAttach} >Прикрепить</Button>
                }
            </div>
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
        </div>
    )
};

export default React.memo(AttachFile);