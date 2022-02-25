import React, {useEffect, useState} from 'react';
import { Form, FormElement } from '@progress/kendo-react-form';
import { Fade } from '@progress/kendo-react-animation';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { loadMessages } from '@progress/kendo-react-intl';
import Card from '../Card';
import AdditionalDocuments from './components/AdditionalDocuments';
import ruMessages from '../../kendoMessages.json';
import {blockContent} from '../../utils/blockContent';
import ModalDeleteDocument from '../UploadedDocuments/components/ModalDeleteDocument';
import DocItem from './components/DocItem/DocItem';
import Loading from '../Loading';
import {Request} from '../../utils/request';
import {useSelector} from 'react-redux';

import './index.scss';

loadMessages(ruMessages, 'ru');

const UploadDocsEditPage = ({ clubAlias, history }) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));
    const clubId = useSelector(state => state.authentication.profile_id);
    const [loaded, setLoaded] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [modal, setModal] = useState({});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [formProps, setFormProps] = useState(null);
    const initialValues = {documents: []};

    const closeModal = () => {
        setModal({});
        blockContent(false)
    };

    const getDocuments = (withSuccess) => PromiseRequest(`/api/document/document/private_list?profileId=${clubId}`)
        .then(data => {
            setLoaded(false);
            if (data) {
                setDocuments(data);
                setLoaded(true);
                withSuccess && handleSuccess();
            }
        });
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
    const handleSuccess = (message) => {
        setSuccess(true);
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    useEffect(() => {
        getDocuments();
    }, []);


    return (
        <div className="application-form">
            <Card>
               <Form
                  initialValues={initialValues}
                  key={JSON.stringify(initialValues)}
                  render={formRenderProps => {
                     if (!formProps) setFormProps(formRenderProps);
                     return (
                             <FormElement>
                                 <div className="application-form__content">
                                     <div className="MainInfo__private-docs-wrap">
                                         <h3>Ваши приватные документы</h3>
                                         {
                                             loaded
                                                 ?
                                                 documents?.length > 0
                                                     ?
                                                     documents.map(item => <DocItem key={item.id} id={item.id} name={item.name} link={item.link} date_create={item.date_create} setModal={setModal} />)
                                                     :
                                                     <h3 className="MainInfo__empty-h3">Вы не загрузили ни одного документа</h3>
                                                 :
                                                 <Loading centered={false} />
                                         }

                                     </div>
                                     {
                                         <AdditionalDocuments
                                             documents={formRenderProps.valueGetter('documents')}
                                             history={history}
                                             clubAlias={clubAlias}
                                             handleError={handleError}
                                             formRenderProps={formRenderProps}
                                             getDocuments={getDocuments}
                                         />
                                     }
                                 </div>
                             </FormElement>
                            )
                      }
                   }
               />
            </Card>
            {
                modal.type === 'deleteDocument' &&
                <ModalDeleteDocument handleError={handleError}
                                     handleSuccess={handleSuccess}
                                     getDocuments={getDocuments}
                                     documentId={modal.documentId}
                                     closeModal={closeModal}
                                     isEditPage
                />
            }
            <NotificationGroup
                style={{ position: 'fixed' }}
            >
                <Fade enter={true} exit={true}>
                    {success &&
                        <Notification
                            type={{ style: 'success', icon: true }}
                            closable={true}
                            onClose={() => setSuccess('')}
                        >
                            <span>{success}</span>
                        </Notification>
                    }
                </Fade>
                <Fade enter={true} exit={true}>
                    {error &&
                        <Notification
                            type={{ style: 'error', icon: true }}
                            closable={true}
                            onClose={() => setError('')}
                        >
                            <span>{error}</span>
                        </Notification>
                    }
                </Fade>
            </NotificationGroup>
        </div>
    )
};

export default React.memo(UploadDocsEditPage);