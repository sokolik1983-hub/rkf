import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Card from "components/Card";
import Container from "../../components/Layouts/Container";
import { Request } from "utils/request";
import { sections, defaultValues } from './config';
import { connectAuthVisible } from "pages/Login/connectors";
import removeNulls from "utils/removeNulls";
import StickyBox from "react-sticky-box";
import UserBanner from "components/Layouts/UserBanner";
import UserInfo from "../../components/Layouts/UserInfo";
import UserMenu from "components/Layouts/UserMenu"
import { endpointGetUserInfo, userNav } from "pages/User/config";
import CopyrightInfo from "components/CopyrightInfo";
import MainInfo from './sections/MainInfo';
import Contacts from './sections/Contacts';
import About from './sections/About';
import Security from './sections/Security';
import DeletePage from './sections/DeletePage';
import useIsMobile from "utils/useIsMobile";
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import moment from "moment";
import './styles.scss';

const UserEdit = ({ history, match, profile_id, is_active_profile, isAuthenticated }) => {
    const [values, setValues] = useState(defaultValues);
    const [requestData, setRequestData] = useState(null);
    const [cities, setCities] = useState([]);
    const [visibilityStatuses, setVisibilityStatuses] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [formTouched, setFormTouched] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const alias = match.params.id;
    const isMobile = useIsMobile();
    const [activeSection, setActiveSection] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorRedirect, setErrorRedirect] = useState(false);
    const [formBusy, setFormBusy] = useState(false);
    const prevRequestData = useRef();
    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));

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

    const getUser = () => PromiseRequest(endpointGetUserInfo + alias)
        .then(data => {
            if (data) {
                data.email = data.emails && data.emails.length ? data.emails[0].value : '';
                data.phone = data.phones && data.phones.length ? data.phones[0].value : '';
                setUserInfo(data);
            }
        });

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
                }
            });
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
        if (data.phones) data.phones = data.phones.filter(i => i.value !== '');
        if (data.birth_date) data.birth_date = moment(data.birth_date).format("YYYY-MM-DD");

        await Request({
            url: sections[type].url,
            method: 'PUT',
            data: JSON.stringify(data)
        }, () => {
            getInfo(type);
            handleSuccess();
            setFormBusy(false);
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
                    setFormTouched={setFormTouched}
                    visibilityStatuses={visibilityStatuses}
                    handleSubmit={handleSubmit}
                    formBusy={formBusy}
                />;
            case 1:
                return <Contacts
                    initialValues={values.contacts}
                    cities={cities}
                    setFormTouched={setFormTouched}
                    visibilityStatuses={visibilityStatuses}
                    handleSubmit={handleSubmit}
                    formBusy={formBusy}
                />;
            case 2:
                return <About
                    initialValues={values.about}
                    setFormTouched={setFormTouched}
                    handleSubmit={handleSubmit}
                    handleError={handleError}
                    formBusy={formBusy}
                />;
            case 3:
                return <Security setFormTouched={setFormTouched} history={history} />;
            case 4:
                return <DeletePage updateInfo={getInfo} />;
            default:
                return <div>Not Found</div>;
        }
    }

    const handleSectionSwitch = (id) => {
        if (formTouched) {
            window.confirm('Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны.') && setActiveSection(id);
        } else {
            setActiveSection(id);
        }
    }

    return (!loaded
        ? <Loading />
        : errorRedirect
            ? <Redirect to="/404" />
            : <Layout>
                <Container className="UserEdit content">
                    <aside className="UserEdit__left">
                        <StickyBox offsetTop={66}>
                            {isMobile &&
                                <UserBanner link={userInfo.headliner_link} />
                            }
                            <Card>
                                <UserInfo
                                    logo_link={userInfo.logo_link}
                                    share_link={`https://rkf.online/user/${alias}`}
                                    first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                    last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                />
                                <UserMenu userNav={userNav(alias)} />
                            </Card>
                            {!isMobile && <CopyrightInfo />}
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
                                <div className="UserEdit__inner-right">
                                    <Card>
                                        <ul className="UserEdit__inner-list">
                                            {Object.keys(sections).map((type, key) => <div className="UserEdit__inner-item" key={key}>
                                                <span className={`k-icon k-icon-32 ${sections[type].icon}`}></span>
                                                <li onClick={() => activeSection !== sections[type].id && handleSectionSwitch(sections[type].id)}>
                                                    {sections[type].name}
                                                </li>
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
                            alignItems: 'flex-start',
                            flexWrap: 'wrap-reverse'
                        }}
                    >
                        <Fade enter={true} exit={true}>
                            {success && <Notification
                                type={{ style: 'success', icon: true }}
                                closable={true}
                                onClose={() => setSuccess(false)}
                            >
                                <span>Информация сохранена!</span>
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
                </Container>
            </Layout>
    )
};

export default React.memo(connectAuthVisible(UserEdit));