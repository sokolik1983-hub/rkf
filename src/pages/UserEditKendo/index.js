import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Card from "components/Card";
import Container from "../../components/Layouts/Container";
import Alert from "../../components/Alert";
import { Request } from "utils/request";
import { defaultValues } from './config';
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
import './styles.scss';

const UserEdit = ({ history, match, profile_id, is_active_profile, isAuthenticated }) => {
    const [initialValues, setInitialValues] = useState(defaultValues);
    const [cities, setCities] = useState([]);
    const [visibilityStatuses, setVisibilityStatuses] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [formTouched, setFormTouched] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const alias = match.params.id;
    const isMobile = useIsMobile();
    const [activeSection, setActiveSection] = useState(0);

    const sections = {
        general: {
            name: 'Основная информация',
            id: 0,
            url: '/api/owners/owner/owner_edit_general_information',
            icon: 'k-i-information'
        },
        contacts: {
            name: 'Контакты',
            id: 1,
            url: '/api/owners/owner/owner_edit_contact_information',
            icon: 'k-i-track-changes'
        },
        about: {
            name: 'О себе',
            id: 2,
            url: '/api/owners/owner/owner_edit_about_information',
            icon: 'k-i-user'
        },
        security: {
            name: 'Безопасность',
            id: 3,
            url: '/api/owners/owner/owner_edit_safety_information',
            icon: 'k-i-lock'
        },
        delete: {
            name: 'Удаление страницы',
            id: 4,
            icon: 'k-i-trash'
        }
    };

    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));

    useEffect(() => {
        Promise.all([
            Object.keys(sections).map(type => sections[type].url && getInfo(type)),
            getUser(), getCities(), getVisibilityStatuses()])
            .then(() => setLoaded(true))
            .catch(e => { handleError(e); setError(error && error.response ? error.response : null) });
    }, []);

    const getUser = () => PromiseRequest(endpointGetUserInfo + alias)
        .then(data => {
            if (data) {
                data.email = data.emails && data.emails.length ? data.emails[0].value : '';
                data.phone = data.phones && data.phones.length ? data.phones[0].value : '';
                setUserInfo(data);
            }
        });

    function getInfo(type) {
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

                    let obj = initialValues;
                    obj[type] = removeNulls(data);

                    // TO FIX!
                    // setInitialValues({
                    //     ...initialValues
                    // });

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

    const handleError = e => {
        if (e.response) {
            let errorText = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
            setShowAlert({
                title: `Ошибка: ${errorText}`,
                //text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
                autoclose: 5,
                onOk: () => setShowAlert(false)
            });
        }
    };

    const handleSubmit = async (data, type) => {
        data.social_networks && data.social_networks.filter(i => i.site !== '');
        await Request({
            url: sections[type].url,
            method: 'PUT',
            data: JSON.stringify(data)
        }, () => {
            getInfo(type);
            setShowAlert({
                title: "Информация сохранена!",
                autoclose: 1,
                onOk: () => setShowAlert(false)
            });
        }, error => {
            handleError(error)
        });
    };

    const renderSection = (section) => {
        switch (section) {
            case 0:
                return <MainInfo
                    initialValues={initialValues.general}
                    setFormTouched={setFormTouched}
                    visibilityStatuses={visibilityStatuses}
                    handleSubmit={handleSubmit}
                />;
            case 1:
                return <Contacts
                    initialValues={initialValues.contacts}
                    cities={cities}
                    setFormTouched={setFormTouched}
                    visibilityStatuses={visibilityStatuses}
                    handleSubmit={handleSubmit}
                />;
            case 2:
                return <About
                    initialValues={initialValues.about}
                    setFormTouched={setFormTouched}
                    handleSubmit={handleSubmit}
                    handleError={handleError}
                />;
            case 3:
                return <Security
                    {...initialValues.security}
                    setFormTouched={setFormTouched}
                    getInfo={() => getInfo('security')}
                    history={history}
                />;
            case 4:
                return <DeletePage />;
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
        : error
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
                    {showAlert && <Alert {...showAlert} />}
                </Container>
            </Layout>
    )
};

export default React.memo(connectAuthVisible(UserEdit));