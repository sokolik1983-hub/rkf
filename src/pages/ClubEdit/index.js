import React, {useEffect, useState} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {compose} from 'redux';
import StickyBox from 'react-sticky-box';
import {defaultReduxKey, endpointUrl} from './config';
import {connectClientClubAlias} from './connectors';
import reducer from './reducer';
import UserHeader from './components/UserHeader';
import RenderFields from './RenderFields'
import AuthOrLogin from '../Login/components/AuthOrLogin';
import {connectAuthVisible} from '../Login/connectors';
import {endpointGetClubInfo, clubNav} from '../../components/Layouts/ClubLayout/config';
import {connectShowFilters} from '../../components/Layouts/connectors';
import UserMenu from '../../components/Layouts/UserMenu';
import Container from '../../components/Layouts/Container';
import CopyrightInfo from '../../components/CopyrightInfo';
import ClickGuard from '../../components/ClickGuard';
import Loading from '../../components/Loading';
import Layout from '../../components/Layouts';
import {useResourceAndStoreToRedux} from '../../shared/hooks';
import injectReducer from '../../utils/injectReducer';
import useIsMobile from '../../utils/useIsMobile';
import {Request} from '../../utils/request';
import ls from 'local-storage';

import './styles.scss';


let unblock;

const ClubEditPage = ({
        history,
        club_alias,
        profile_id,
        is_federation,
        isOpenFilters,
        getClubSuccess,
        setShowFilters,
        isAuthenticated,
        is_active_profile,
}) => {

    const [notificationsLength, setNotificationsLength] = useState(0);
    const [queryCount, setQueryCount] = useState(0);
    const [serverErrors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [canEdit, setCanEdit] = useState(false);
    const [error, setError] = useState(false);
    const [club, setClub] = useState(null);


    const isMobile = useIsMobile(1080);
    const {user_type, alias} = ls.get('user_info') || {};
    const url = (user_type === 3 && alias !== 'rkf' && alias !== 'rkf-online') ? '/club' : ''

    let clientErrors = {};
    let submitClubAlias,
        submitClubInfo,
        submitClubSchedule,
        submitClubLegalInfo,
        submitClubBankInfo,
        submitClubEmail,
        submitClubPhone,
        submitClubDocuments,
        submitClubSocials;

    useResourceAndStoreToRedux(endpointUrl, getClubSuccess);

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + alias
        }, data => {
            if (data.user_type !== 3) {
                history.replace(`/kennel/${alias}`);
            } else {
                setClub({...data});
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
    }, [alias]);

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
            setErrors(prevObj => ({...prevObj, alias: errors}));
        }
    };

    const bindSubmitClubInfo = {
        submit: (submitFunc, errors) => {
            submitClubInfo = submitFunc;
            clientErrors.info = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({...prevObj, info: errors}));
        }
    };

    const bindSubmitClubSchedule = {
        submit: (submitFunc, errors) => {
            submitClubSchedule = submitFunc;
            clientErrors.schedule = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({...prevObj, schedule: errors}));
        }
    };

    const bindSubmitClubLegalInfo = {
        submit: (submitFunc, errors) => {
            submitClubLegalInfo = submitFunc;
            clientErrors.legalInfo = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({...prevObj, legalInfo: errors}));
        }
    };

    const bindSubmitClubBankInfo = {
        submit: (submitFunc, errors) => {
            submitClubBankInfo = submitFunc;
            clientErrors.bankInfo = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({...prevObj, bankInfo: errors}));
        }
    };

    const bindSubmitClubEmail = {
        submit: (submitFunc, errors) => {
            submitClubEmail = submitFunc;
            clientErrors.email = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({...prevObj, email: errors}));
        }
    };

    const bindSubmitClubPhone = {
        submit: (submitFunc, errors) => {
            submitClubPhone = submitFunc;
            clientErrors.phone = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({...prevObj, phone: errors}));
        }
    };

    const bindSubmitClubDocuments = {
        submit: (submitFunc, errors) => {
            submitClubDocuments = submitFunc;
            clientErrors.documents = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({...prevObj, documents: errors}));
        }
    };

    const bindSubmitClubSocials = {
        submit: (submitFunc, errors) => {
            submitClubSocials = submitFunc;
            clientErrors.socials = errors;
        },
        getErrors: (errors) => {
            setErrors(prevObj => ({...prevObj, socials: errors}));//подумать, где вызвать
        }
    };

    const handleSubmitForms = () => {
        const submitFunctions = [
            submitClubAlias,
            submitClubInfo,
            submitClubSchedule,
            submitClubLegalInfo,
            submitClubBankInfo,
            submitClubEmail,
            submitClubPhone,
            submitClubDocuments,
            submitClubSocials,
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
                setQueryCount(validSubmitFunctions.length);
            } else {
                alert('Заполните все обязятельные поля формы');
            }
        }, reason => {
            console.log('reason', reason);
        });
    };

    useEffect(() => {
        if (isSubmit && Object.keys(serverErrors).length === queryCount - 2) {// "-2" -это 2 запроса с картинками, которые не обрабатываются
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
                setQueryCount(0);
            }
        }
    }, [serverErrors]);

    return (
        loading
            ? <Loading/>
            : error ?
                <Redirect to="404"/> :
                <Layout withFilters setNotificationsLength={setNotificationsLength}>
                    <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
                    <div className="ClubEdit__wrap">
                        <Container className="ClubEdit content">
                            <aside className="ClubEdit__left">
                                <StickyBox offsetTop={60}>
                                    <UserHeader
                                        user="club"
                                        logo={club.logo_link}
                                        name={club.title || "Имя отсутствует"}
                                        alias={alias}
                                        profileId={club.id}
                                        federationName={club.federation_name}
                                        federationAlias={club.federation_alias}
                                        canEdit={canEdit}
                                        isAuthenticated={isAuthenticated}
                                    />
                                    {!isMobile && <UserMenu userNav={canEdit
                                        ? clubNav(alias)
                                        : clubNav(alias).filter(i => i.id !== 2)}
                                                            notificationsLength={notificationsLength}
                                    />}
                                    <CopyrightInfo withSocials={true}/>
                                </StickyBox>
                            </aside>
                            <div className="ClubEdit__inner">
                                <RenderFields
                                    is_federation={is_federation}
                                    isOpenFilters={isOpenFilters}
                                    setShowFilters={setShowFilters}
                                    handleSubmitForms={handleSubmitForms}
                                    bindSubmitClubInfo={bindSubmitClubInfo}
                                    bindSubmitClubAlias={bindSubmitClubAlias}
                                    bindSubmitClubEmail={bindSubmitClubEmail}
                                    bindSubmitClubPhone={bindSubmitClubPhone}
                                    bindSubmitClubSocials={bindSubmitClubSocials}
                                    bindSubmitClubSchedule={bindSubmitClubSchedule}
                                    bindSubmitClubBankInfo={bindSubmitClubBankInfo}
                                    setNotificationsLength={setNotificationsLength}
                                    bindSubmitClubLegalInfo={bindSubmitClubLegalInfo}
                                    bindSubmitClubDocuments={bindSubmitClubDocuments}
                                />
                            </div>
                        </Container>
                    </div>
                </Layout>
    )
};

const ClubEdit = props => (
    <AuthOrLogin>
        <ClubEditPage {...props} />
    </AuthOrLogin>
);

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});

export default compose(withRouter, withReducer, connectClientClubAlias)(React.memo(connectShowFilters(connectAuthVisible(/*ClubEditPage*/ClubEdit))));