import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import StickyBox from "react-sticky-box";
import moment from "moment";
import ls from "local-storage";
import { Fade } from "@progress/kendo-react-animation";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { Request } from "../../utils/request";
import removeNulls from "../../utils/removeNulls";
import useIsMobile from "../../utils/useIsMobile";
import Card from "../../components/Card";
import Alert from "../../components/Alert";
import Layout from "../../components/Layouts";
import Loading from "../../components/Loading";
import ClickGuard from "../../components/ClickGuard";
import UserInfo from "../../components/Layouts/UserInfo";
import Container from "../../components/Layouts/Container";
import CopyrightInfo from "../../components/CopyrightInfo";
import { connectShowFilters } from "../../components/Layouts/connectors";
import { endpointGetRolesInfo, endpointGetUserInfo } from "../../components/Layouts/UserLayout/config";
import About from "./sections/About";
import MainInfo from "./sections/MainInfo";
import Contacts from "./sections/Contacts";
import Security from "./sections/Security";
import DeletePage from "./sections/DeletePage";
import { connectAuthVisible } from "../Login/connectors";
import { sections, defaultValues, phoneMask } from "./config";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./styles.scss";

let unblock;

const UserEdit = ({ history, match, profile_id, is_active_profile, isAuthenticated, isOpenFilters, withFilters, setShowFilters }) => {
    const [values, setValues] = useState(defaultValues);
    const [requestData, setRequestData] = useState(null);
    const [cities, setCities] = useState([]);
    const [visibilityStatuses, setVisibilityStatuses] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [formModified, setFormModified] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const alias = match.params.alias;
    const isMobile = useIsMobile(1080);
    const [activeSection, setActiveSection] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorRedirect, setErrorRedirect] = useState(false);
    const [formBusy, setFormBusy] = useState(false);
    const [rolesInfo, setRolesInfo] = useState([]);
    const [judgeInfo, setJudgeInfo] = useState([]);
    const prevRequestData = useRef();
    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));

    useEffect(() => {
        unblock = is_active_profile ? history.block('Вы точно хотите уйти со страницы редактирования?') : history.block();
        return () => unblock();
    }, []);

    useEffect(() => {
        Promise.all([
            Object.keys(sections).map(type => sections[type].url && getInfo(type)),
            getUser(), getCities(), getVisibilityStatuses()])
            .then(() => setLoaded(true))
            .catch(e => { handleError(e); setErrorRedirect(error && error.response ? error.response : null) });
    }, []);

    useEffect(() => {
        if (prevRequestData.current !== requestData) {
            setValues({
                ...values,
                ...requestData
            })
            prevRequestData.current = requestData;
        }
    }, [requestData]);

    useEffect(() => {
        if (userInfo?.profile_id) {
            (() => getRolesInfo())();
        }
    }, [userInfo]);

    useEffect(() => {
        if (!!rolesInfo) {
            setJudgeInfo(rolesInfo.open_roles?.map(
                item => item.key_name === "role_judge" && item.role_data
            ));
        }
    }, [rolesInfo]);

    const getUser = async needUpdateAvatar => {
        await Request({
            url: endpointGetUserInfo + alias
        }, data => {
            if (needUpdateAvatar) {
                ls.set('user_info', { ...ls.get('user_info'), logo_link: data.logo_link });
            }
            setUserInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
        }, error => {
            console.log(error.response);
            setError(error.response);
        });
    };

    const getRolesInfo = async() => {
        await Request({
            url: endpointGetRolesInfo + userInfo.profile_id
        }, data => {
            setRolesInfo(data);
        }, error => {
            console.log(error.response);
            setErrorRedirect(error.response);
        });
    };


    const getInfo = (type) => {
        PromiseRequest(sections[type].url)
            .then(data => {
                if (data) {
                    if (data.contacts && data.contacts.length) {
                        data.contacts.map(item => {
                            if (item.contact_type_id === 1 && !/[+][7]{1}[(]\d{3}[)]\d{3}[-]\d{2}[-]\d{2}/.test(item.value)) {
                                const valueArr = item.value.split(' ');
                                item.value = '+' + valueArr[0] + valueArr[1].slice(0, 6) + '-' + valueArr[1].slice(-2);
                            }
                            return item;
                        });
                    }
                    if (data.birth_date) data.birth_date = data.birth_date.split('T')[0];
                    setRequestData({ [type]: removeNulls(data) });
                    setFormBusy(false);
                }
            })
            .catch(() => setErrorRedirect(true));
    };

    const getCities = () => PromiseRequest('/api/city')
        .then(data => {
            if (data) {
                setCities(data);
            }
        });

    const getVisibilityStatuses = () => PromiseRequest('/api/owners/owner/visibility_statuses')
        .then(data => {
            if (data) {
                setVisibilityStatuses(data);
            }
        });

    const setNameToLocalStorage = (data) => {
        let updatedUserInfo = {
            ...ls.get('user_info'),
            first_name: data.first_name,
            last_name: data.last_name,
        };

        ls.set('user_info', updatedUserInfo);
    }

    const handleSuccess = () => {
        setSuccess(true);
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const handleError = e => {
        if (e.response) {
            let message = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
            setErrorMessage(message);
            setError(true);
            !error && setTimeout(() => {
                setError(false);
            }, 5000);
        }
    };

    const handleSubmit = async (data, type) => {
        setFormBusy(true);
        if (data.social_networks) data.social_networks = data.social_networks.filter(i => i.site !== '');
        if (data.mails) data.mails = data.mails.filter(i => i.value !== '');
        if (data.phones) data.phones = data.phones.filter(i => i.value !== '' && i.value !== phoneMask);
        if (data.address && data.address.postcode) data.address.postcode = data.address.postcode.replaceAll('_', '');
        if (data.birth_date) data.birth_date = moment(data.birth_date).format("YYYY-MM-DD");

        await Request({
            url: sections[type].url,
            method: 'PUT',
            data: JSON.stringify(data)
        }, () => {
            getInfo(type);
            handleSuccess();
            setNameToLocalStorage(data);
        }, error => {
            handleError(error);
            setFormBusy(false);
        });
    };

    const renderSection = (section) => {
        switch (section) {
            case 0:
                return <MainInfo
                    initialValues={values.general}
                    setFormModified={setFormModified}
                    visibilityStatuses={visibilityStatuses}
                    handleSubmit={handleSubmit}
                    formBusy={formBusy}
                    alias={alias}
                    history={history}
                    judgeInfo={judgeInfo}
                />;
            case 1:
                return <Contacts
                    initialValues={values.contacts}
                    cities={cities}
                    setFormModified={setFormModified}
                    visibilityStatuses={visibilityStatuses}
                    handleSubmit={handleSubmit}
                    formBusy={formBusy}
                />;
            case 2:
                return <About
                    initialValues={values.about}
                    setFormModified={setFormModified}
                    handleSubmit={handleSubmit}
                    handleError={handleError}
                    formBusy={formBusy}
                />;
            case 3:
                return <Security
                    setFormModified={setFormModified}
                    history={history}
                    handleSuccess={handleSuccess}
                    handleError={handleError}
                />;
            case 4:
                return <DeletePage
                    judgeInfo={judgeInfo}
                />;
            default:
                return <div>Not Found</div>;
        }
    }

    const handleSectionSwitch = (id) => {
        if (formModified) {
            window.confirm('Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны.') && setActiveSection(id);
        } else {
            setActiveSection(id);
        }
        setShowFilters({ isOpenFilters: false });
    };

    return (!loaded
        ? <Loading />
        : errorRedirect
            ? <Redirect to="/404" />
            : <Layout layoutWithFilters>
                <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
                <div className="UserEdit__wrap">
                    <Container className="UserEdit content">
                        <aside className="UserEdit__left">
                            <StickyBox offsetTop={60}>
                                <Card>
                                    <UserInfo
                                        canEdit={canEdit}
                                        logo_link={userInfo.logo_link}
                                        share_link={`${window.location.host}/user/${alias}`}
                                        first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                        last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                        alias={alias}
                                        updateInfo={getUser}
                                        judgeInfo={userInfo.open_roles}
                                    />
                                </Card>
                                {!isMobile && <MenuComponentNew />}
                                <CopyrightInfo withSocials={true} />
                            </StickyBox>
                        </aside>
                        <div className="UserEdit__right">
                            {!loaded
                                ? <Loading />
                                : <div className="UserEdit__inner">
                                    <div className="UserEdit__inner-left">
                                        <Card>
                                            {renderSection(activeSection)}
                                        </Card>
                                    </div>
                                    <div className={`UserEdit__inner-right${isOpenFilters ? ' _open' : ''}`}>
                                        <Card>
                                            <span className="d-none UserEdit__profile-label">Профиль</span>
                                            <ul className="UserEdit__inner-list">
                                                {Object.keys(sections).map((type, key) => <div
                                                    className={sections[type].id === activeSection ? "UserEdit__inner-item active" : "UserEdit__inner-item"}
                                                    key={key}
                                                    onClick={() => activeSection !== sections[type].id && handleSectionSwitch(sections[type].id)}
                                                >
                                                    <span className={`k-icon k-icon-32 ${sections[type].icon}`} />
                                                    <li>{sections[type].name}</li>
                                                </div>
                                                )}
                                            </ul>
                                        </Card>
                                    </div>
                                </div>
                            }
                        </div>
                        <NotificationGroup
                            style={{
                                position: 'fixed',
                                right: '1vh',
                                top: '80vh',
                            }}
                        >
                            {success && <Alert
                                title="Сохранение данных"
                                text="Данные сохранены!"
                                autoclose={2.5}
                                onOk={() => setSuccess(false)}
                            />}
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
                    </Container>
                </div>
            </Layout>
    )
};

export default React.memo(connectShowFilters(connectAuthVisible(UserEdit)));