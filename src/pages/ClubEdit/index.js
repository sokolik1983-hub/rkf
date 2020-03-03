import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import ClubInfo from './components/ClubInfo';
import EditPageButtons from './components/EditPageButtons';
import ClubHeaderPicture from './components/ClubHeaderPicture';
import ClubSchedule from './components/ClubSchedule';
import ClubSocial from './components/ClubSocial';
import ClubLegalInfo from './components/ClubLegalInfo';
import ClubBankInfo from './components/ClubBankInfo';
import ClubContacts from './components/ClubContacts';
import ClubDocuments from './components/ClubDocuments';

import AuthOrLogin from 'apps/Auth/containers/AuthOrLogin';
import Card from "components/Card";
import Header from 'components/Layouts/Header';
import Container from "components/Layouts/Container";
import { defaultReduxKey, endpointUrl } from "./config";
import { connectClientClubAlias } from './connectors';
import reducer from "./reducer";
import { useResourceAndStoreToRedux } from 'shared/hooks'
import injectReducer from "utils/injectReducer";
import './styles.scss';

const ClubEdit = props => (
    <AuthOrLogin>
        <Header />
        <ClubEditPage {...props} />
    </AuthOrLogin>);

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });
export default compose(
    withRouter,
    withReducer,
    connectClientClubAlias
)(ClubEdit);

let unblock;
function ClubEditPage({ club_alias, club_id, is_federation, is_active_profile, history, getClubSuccess }) {
    //Всё это один большой костыль! Предполагается это исправить, когда будет 1 форма вместо 10
    let [serverErrors, setErrors] = useState({});
    let [isSubmit, setIsSubmit] = useState(false);
    let [querysCount, setQuerysCount] = useState(0);
    let submitClubAlias,
        submitClubLogo,
        submitClubInfo,
        submitClubSchedule,
        submitClubLegalInfo,
        submitClubBankInfo,
        submitClubEmail,
        submitClubPhone,
        submitClubDocuments,
        submitClubSocials,
        submitClubHeaderPicture;
    let clientErrors = {};

    useEffect(() => {
        unblock = is_active_profile ? history.block('Вы точно хотите уйти со страницы редактирования?') : history.block();
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
    const bindSubmitClubSchedule = {
        submit: (submitFunc, errors) => {
            submitClubSchedule = submitFunc;
            clientErrors.schedule = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({ ...prevObj, schedule: errors }));
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
            submitClubSchedule,
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

    useResourceAndStoreToRedux(endpointUrl, getClubSuccess);
    
    return <Container className="content">
        <div className="ClubEditPage">
            <h2>Личный кабинет</h2>
            <Card className="ClubEditPage__about">
                <ClubInfo bindSubmitClubAlias={bindSubmitClubAlias}
                    bindSubmitClubLogo={bindSubmitClubLogo}
                    bindSubmitClubInfo={bindSubmitClubInfo}
                    isFederation={is_federation}
                />
            </Card>
            <Card className="ClubEditPage__schedule">
                <ClubSchedule bindSubmitForm={bindSubmitClubSchedule} />
            </Card>
            <Card className="ClubEditPage__legal">
                <ClubLegalInfo bindSubmitForm={bindSubmitClubLegalInfo} />
            </Card>
            <Card className="ClubEditPage__bank">
                <ClubBankInfo bindSubmitForm={bindSubmitClubBankInfo} />
            </Card>
            <Card className="ClubEditPage__contacts">
                <h3>Контакты</h3>
                <ClubContacts bindSubmitClubEmail={bindSubmitClubEmail}
                    bindSubmitClubPhone={bindSubmitClubPhone}
                />
            </Card>
            <Card className="ClubEditPage__documents">
                <h3>Ссылки на документы</h3>
                <ClubDocuments bindSubmitForm={bindSubmitClubDocuments} />
            </Card>
            <Card className="ClubEditPage__socials">
                <h3>Социальные сети</h3>
                <ClubSocial bindSubmitForm={bindSubmitClubSocials} />
            </Card>
            <Card className="ClubEditPage__head-picture">
                <ClubHeaderPicture bindSubmitForm={bindSubmitClubHeaderPicture} club_id={club_id} />
            </Card>
            <EditPageButtons handleSubmitForms={handleSubmitForms} />
        </div>
    </Container>
}