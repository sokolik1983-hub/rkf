import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Form, Field, FieldArray, FormElement } from "@progress/kendo-react-form";
import { Fade } from "@progress/kendo-react-animation";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import AdditionalDocuments from "./components/AdditionalDocuments/index";
import { Request } from "../../../../utils/request";
import ruMessages from "../../../../kendoMessages.json"
import ModalDeleteCategory from "../../../../components/UploadedDocuments/components/ModalDeleteCategory";
// import "./index.scss";

loadMessages(ruMessages, 'ru');

const ClubForm = ({ clubAlias, history, status, getDocuments }) => {
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [formProps, setFormProps] = useState(null);
    const initialValues = {documents: []};

    const handleError = e => {
        if (e.response) {
            const message = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
            setError(message);
            !error && setTimeout(() => {
                setError('');
            }, 5000);
        }
    };


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
                                     {
                                         <AdditionalDocuments
                                             documents={formRenderProps.valueGetter('documents')}
                                             history={history}
                                             clubAlias={clubAlias}
                                             handleError={handleError}
                                             setDisableSubmit={setDisableSubmit}
                                             formRenderProps={formRenderProps}
                                             editable={status}
                                             status={status}
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

export default React.memo(ClubForm);