import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import Card from "components/Card";
import ClubLegalInfo from 'apps/ClubLegalInfo';
import ClubBankInfo from 'apps/ClubBankInfo';
import ClubInfo from 'apps/ClubInfo';
import ClubContacts from 'apps/ClubContacts';
import ClubDocuments from 'apps/ClubDocuments';
import ClubSocial from 'apps/ClubSocial';
import ClubHeaderPicture from 'apps/ClubInfo/components/HeaderPicture';
import EditPageButtons from 'apps/Client/components/EditPageButtons';
import { connectClientClubAlias } from 'apps/ClientClub/connectors';
import './styles.scss';

let unblock;

function ClubEditPage({ club_alias, history }) {
    //Всё это один большой костыль! Предполагается это исправить, когда будет 1 форма вместо 10
    let [serverErrors, setErrors] = useState({});
    let [isSubmit, setIsSubmit] = useState(false);
    let [querysCount, setQuerysCount] = useState(0);
    let submitClubAlias,
        submitClubLogo,
        submitClubInfo,
        submitClubLegalInfo,
        submitClubBankInfo,
        submitClubEmail,
        submitClubPhone,
        submitClubDocuments,
        submitClubSocials,
        submitClubHeaderPicture;
    let clientErrors = {};

    useEffect(() => {
        unblock = history.block('Вы точно хотите уйти со страницы редактирования?');
        return () => unblock();
    }, []);

    const bindSubmitClubAlias = {
        submit: (submitFunc, errors) => {
            submitClubAlias = submitFunc;
            clientErrors.alias = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({ ...prevObj, alias: errors }));
        }
    };
    const bindSubmitClubLogo = (submitFormFunction) => {
        submitClubLogo = submitFormFunction;
    };
    const bindSubmitClubInfo = {
        submit: (submitFunc, errors) => {
            submitClubInfo = submitFunc;
            clientErrors.info = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({ ...prevObj, info: errors }));
        }
    };
    const bindSubmitClubLegalInfo = {
        submit: (submitFunc, errors) => {
            submitClubLegalInfo = submitFunc;
            clientErrors.legalInfo = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({ ...prevObj, legalInfo: errors }));
        }
    };
    const bindSubmitClubBankInfo = {
        submit: (submitFunc, errors) => {
            submitClubBankInfo = submitFunc;
            clientErrors.bankInfo = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({ ...prevObj, bankInfo: errors }));
        }
    };
    const bindSubmitClubEmail = {
        submit: (submitFunc, errors) => {
            submitClubEmail = submitFunc;
            clientErrors.email = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({ ...prevObj, email: errors }));
        }
    };
    const bindSubmitClubPhone = {
        submit: (submitFunc, errors) => {
            submitClubPhone = submitFunc;
            clientErrors.phone = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({ ...prevObj, phone: errors }));
        }
    };
    const bindSubmitClubDocuments = {
        submit: (submitFunc, errors) => {
            submitClubDocuments = submitFunc;
            clientErrors.documents = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({ ...prevObj, documents: errors }));
        }
    };
    const bindSubmitClubSocials = {
        submit: (submitFunc, errors) => {
            submitClubSocials = submitFunc;
            clientErrors.socials = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({ ...prevObj, socials: errors }));//подумать, где вызвать
        }
    };
    const bindSubmitClubHeaderPicture = (submitFormFunction) => {
        submitClubHeaderPicture = submitFormFunction;
    };

    const handleSubmitForms = () => {
        const submitFunctions = [
            submitClubAlias,
            submitClubLogo,
            submitClubInfo,
            submitClubLegalInfo,
            submitClubBankInfo,
            submitClubEmail,
            submitClubPhone,
            submitClubDocuments,
            submitClubSocials,
            submitClubHeaderPicture
        ];
        const validSubmitFunctions = submitFunctions.filter(func => !!func).map(func => func());

        Promise.all(validSubmitFunctions).then(values => {
            let isValid = true;

            Object.keys(clientErrors).forEach(key => {
                if (Object.keys(clientErrors[key]).length) {
                    isValid = false;
                }
            });

            if (isValid) {
                setIsSubmit(true);
                setQuerysCount(querysCount = validSubmitFunctions.length);
            } else {
                alert('Заполните все обязятельные поля формы');
            }
        }, reason => {
            console.log('reason', reason);
        });
    };

    useEffect(() => {
        if (isSubmit && Object.keys(serverErrors).length === querysCount - 2) {// "-2" -это 2 запроса с картинками, которые не обрабатываются
            const isValid = !Object.keys(serverErrors).filter(key => Object.keys(serverErrors[key]).length).length;
            if (isValid && club_alias) {
                unblock();
                history.push(`/${club_alias}`);
            } else {
                alert(Object.values(serverErrors)
                    .filter(e => Object.entries(e).length)
                    .map(e => `Ошибка: ${Object.values(e)[0]}`)
                    .join('\n'));
                setIsSubmit(false);
                setErrors({});
                setQuerysCount(0);
            }
        }
    }, [serverErrors]);

    return (
        <div className="ClubEditPage">
            <h2>Личный кабинет</h2>
            <Card style={{ margin: '24px 0' }}>
                <ClubInfo bindSubmitClubAlias={bindSubmitClubAlias}
                    bindSubmitClubLogo={bindSubmitClubLogo}
                    bindSubmitClubInfo={bindSubmitClubInfo}
                />
            </Card>
            <Card style={{ margin: '24px 0' }}>
                <ClubLegalInfo bindSubmitForm={bindSubmitClubLegalInfo} />
            </Card>
            <Card style={{ margin: '24px 0' }}>
                <ClubBankInfo bindSubmitForm={bindSubmitClubBankInfo} />
            </Card>
            <Card style={{ margin: '24px 0' }}>
                <h3>Контакты</h3>
                <ClubContacts bindSubmitClubEmail={bindSubmitClubEmail}
                    bindSubmitClubPhone={bindSubmitClubPhone}
                />
            </Card>
            <Card style={{ margin: '24px 0' }}>
                <h3>Ссылки на документы</h3>
                <ClubDocuments bindSubmitForm={bindSubmitClubDocuments} />
            </Card>
            <Card style={{ margin: '24px 0' }}>
                <h3>Социальные сети</h3>
                <ClubSocial bindSubmitForm={bindSubmitClubSocials} />
            </Card>
            <Card style={{ margin: '24px 0' }}>
                <ClubHeaderPicture bindSubmitForm={bindSubmitClubHeaderPicture} />
            </Card>
            <EditPageButtons handleSubmitForms={handleSubmitForms} />
        </div>
    )
}

export default compose(withRouter, connectClientClubAlias)(ClubEditPage)