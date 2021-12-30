import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { compose } from "redux";
// import ClubInfo from "./components/ClubInfo";
// import EditPageButtons from "./components/EditPageButtons";
// import ClubHeaderPicture from "./components/ClubHeaderPicture";
// import ClubSchedule from "./components/ClubSchedule";
// import ClubSocial from "./components/ClubSocial";
// import ClubLegalInfo from "./components/ClubLegalInfo";
// import ClubBankInfo from "./components/ClubBankInfo";
// import ClubContacts from "./components/ClubContacts";
// import ClubDocuments from "./components/ClubDocuments";
// import Disclaimer from "../../components/Disclaimer";
// import Card from "../../components/Card";
import AuthOrLogin from "../Login/components/AuthOrLogin";
import Header from "../../components/Layouts/Header";
import Container from "../../components/Layouts/Container";
import { defaultReduxKey, endpointUrl } from "./config";
import { connectClientClubAlias } from "./connectors";
import reducer from "./reducer";
import { useResourceAndStoreToRedux } from "../../shared/hooks";
import injectReducer from "../../utils/injectReducer";

import ls from 'local-storage';


import "./styles.scss";

import {Redirect} from "react-router-dom";
import { Request } from '../../utils/request';
import StickyBox from "react-sticky-box";
import useIsMobile from '../../utils/useIsMobile';
import UserMenu from '../../components/Layouts/UserMenu';
import UserHeader from './components/UserHeader';
import CopyrightInfo from '../../components/CopyrightInfo';
import ClickGuard from '../../components/ClickGuard';
import Loading from '../../components/Loading';
import Layout from '../../components/Layouts';
import { endpointGetClubInfo, clubNav } from '../../components/Layouts/ClubLayout/config';
import { connectAuthVisible } from '../Login/connectors';
import { connectShowFilters } from "../../components/Layouts/connectors";

let unblock;

const ClubEditPage = ({
                          club_alias,
                          club_id,
                          is_federation,
                          is_active_profile,
                          isAuthenticated,
                          history,
                          getClubSuccess,
                          isOpenFilters,
                          setShowFilters,
}) => {
    console.log('club_id',club_id)
    console.log('isAuthenticated',isAuthenticated)
    console.log('is_active_profile',is_active_profile)
    //Всё это один большой костыль! Предполагается это исправить, когда будет 1 форма вместо 10
    let [serverErrors, setErrors] = useState({});
    let [isSubmit, setIsSubmit] = useState(false);
    let [querysCount, setQuerysCount] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const [canEdit, setCanEdit] = useState(false);
    const [club, setClub] = useState(null);


    const isMobile = useIsMobile(1080);

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

    const { user_type, alias } = ls.get('user_info') || {};
    const url = ( user_type === 3 && alias !== 'rkf' && alias !== 'rkf-online') ? '/club' : ''

    useResourceAndStoreToRedux(endpointUrl, getClubSuccess);

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + alias
        }, data => {
            if (data.user_type !== 3) {
                history.replace(`/kennel/${alias}`);
            } else {
                setClub({ ...data});
                setCanEdit(isAuthenticated && is_active_profile && club_id === data.id);
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
        // return () => setNeedRequest(true);
    }, [alias]);

    console.log('club', club)

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
                history.push(`${url}/${club_alias}`);
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
        loading
            ? <Loading />
            : error ?
                <Redirect to="404" /> :
                <Layout withFilters setNotificationsLength={setNotificationsLength}>
                    <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
                    <div className='NurseryEdit__wrap'>
                        <Container className='NurseryEdit content'>
                            <aside className='NurseryEdit__left'>
                                <StickyBox offsetTop={60}>
                                    <UserHeader
                                        user="club"
                                        logo={club.logo_link}
                                        name={club.title || 'Имя отсутствует'}
                                        alias={alias}
                                        profileId={club.id}
                                        federationName={club.federation_name}
                                        federationAlias={club.federation_alias}
                                        canEdit={canEdit}
                                        isAuthenticated={isAuthenticated}
                                    />
                                    {/*{nursery.breeds && !!nursery.breeds.length &&*/}
                                    {/*    <BreedsList breeds={nursery.breeds} />*/}
                                    {/*}*/}
                                    {!isMobile && <UserMenu userNav={canEdit
                                        ? clubNav(alias)
                                        : clubNav(alias).filter(i => i.id !== 2)}
                                                            notificationsLength={notificationsLength}
                                    />}
                                    <CopyrightInfo withSocials={true} />
                                </StickyBox>
                            </aside>
                            {/*<div className="NurseryEdit__right">*/}
                            {/*    {loading*/}
                            {/*        ? <Loading />*/}
                            {/*        : <Form*/}
                            {/*            {...editForm}*/}
                            {/*            initialValues={initialValues}*/}
                            {/*            transformValues={transformValues}*/}
                            {/*            onSuccess={handleSuccess}*/}
                            {/*            onError={handleError}*/}
                            {/*            className="NurseryEdit__form"*/}
                            {/*            withLoading={true}*/}
                            {/*        >*/}
                            {/*            <RenderFields*/}
                            {/*                isOpenFilters={isOpenFilters}*/}
                            {/*                setShowFilters={setShowFilters}*/}
                            {/*                streetTypes={streetTypes}*/}
                            {/*                houseTypes={houseTypes}*/}
                            {/*                flatTypes={flatTypes}*/}
                            {/*                working={working}*/}
                            {/*                handleError={handleError}*/}
                            {/*                setWorking={setWorking}*/}
                            {/*                coOwner={{*/}
                            {/*                    lastName: initialValues.co_owner_last_name,*/}
                            {/*                    firstName: initialValues.co_owner_first_name,*/}
                            {/*                    secondName: initialValues.co_owner_second_name,*/}
                            {/*                    mail: initialValues.co_owner_mail*/}
                            {/*                }}*/}
                            {/*                randomKeyGenerator={randomKeyGenerator}*/}
                            {/*            />*/}
                            {/*        </Form>*/}
                            {/*    }*/}
                            {/*    {showAlert && <Alert {...showAlert} />}*/}
                            {/*</div>*/}
                        </Container>
                    </div>
                </Layout>


        // <Container className="content">
        //     <div className="ClubEditPage">
        //         <h2>Личный кабинет</h2>
        //         <Disclaimer>
        //             <a className="Disclaimer__support-link" href="https://help.rkf.online/ru/knowledge_base/art/54/cat/3/#/" target="_blank" rel="noopener noreferrer">
        //                 Инструкция по редактированию профиля
        //             </a>
        //         </Disclaimer>
        //         <Card className="ClubEditPage__about">
        //             <ClubInfo bindSubmitClubAlias={bindSubmitClubAlias}
        //                       bindSubmitClubLogo={bindSubmitClubLogo}
        //                       bindSubmitClubInfo={bindSubmitClubInfo}
        //                       isFederation={is_federation}
        //             />
        //         </Card>
        //         <Card className="ClubEditPage__schedule">
        //             <ClubSchedule bindSubmitForm={bindSubmitClubSchedule} />
        //         </Card>
        //         <Card className="ClubEditPage__legal">
        //             <ClubLegalInfo bindSubmitForm={bindSubmitClubLegalInfo} />
        //         </Card>
        //         <Card className="ClubEditPage__bank">
        //             <ClubBankInfo bindSubmitForm={bindSubmitClubBankInfo} />
        //         </Card>
        //         <Card className="ClubEditPage__contacts">
        //             <h3>Контакты</h3>
        //             <ClubContacts bindSubmitClubEmail={bindSubmitClubEmail}
        //                           bindSubmitClubPhone={bindSubmitClubPhone}
        //             />
        //         </Card>
        //         <Card className="ClubEditPage__documents">
        //             <h3>Ссылки на документы</h3>
        //             <ClubDocuments bindSubmitForm={bindSubmitClubDocuments} />
        //         </Card>
        //         <Card className="ClubEditPage__socials">
        //             <h3>Социальные сети</h3>
        //             <ClubSocial bindSubmitForm={bindSubmitClubSocials} />
        //         </Card>
        //         <Card className="ClubEditPage__head-picture">
        //             <ClubHeaderPicture bindSubmitForm={bindSubmitClubHeaderPicture} club_id={club_id} />
        //         </Card>
        //         <EditPageButtons handleSubmitForms={handleSubmitForms} />
        //     </div>
        // </Container>
    )
};

const ClubEdit = props => (
    <AuthOrLogin>
        <Header />
        <ClubEditPage {...props} />
    </AuthOrLogin>
);

// const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });

export default compose( /*withRouter, withReducer,*/ connectClientClubAlias)(React.memo(connectShowFilters(connectAuthVisible(/*ClubEditPage*/ClubEdit))));