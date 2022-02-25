import React, { useState } from "react";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Fade } from "@progress/kendo-react-animation";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { loadMessages } from "@progress/kendo-react-intl";
import Card from "../Card";
import AdditionalDocuments from "../../pages/ClubEdit/components/ClubForm/components/AdditionalDocuments";
import ruMessages from "../../kendoMessages.json"

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