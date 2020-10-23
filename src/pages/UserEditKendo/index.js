import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ls from 'local-storage';
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Card from "components/Card";
import Container from "../../components/Layouts/Container";
import Alert from "../../components/Alert";
import { Request } from "../../utils/request";
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
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [formTouched, setFormTouched] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    //const [canEdit, setCanEdit] = useState(false);
    const alias = match.params.id;
    const isMobile = useIsMobile();

    const [activeSection, setActiveSection] = useState(0);

    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));

    useEffect(() => {
        Promise.all([getUser(), getInfo(), getCities()])
            .then(() => setLoaded(true))
            .catch(e => { handleError(e); setError(error && error.response ? error.response : null) });
    }, []);

    const getUser = () => PromiseRequest(endpointGetUserInfo + alias)
        .then(data => {
            if (data) {
                data.email = data.emails.length ? data.emails[0].value : '';
                data.phone = data.phones.length ? data.phones[0].value : '';
                setUserInfo(data);
                //setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
            }
        });

    const getInfo = () => PromiseRequest('/api/owners/owner/owner_edit_information')
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
                data.is_public = !data.is_public; // Backend workaround
                const birthDate = data.personal_information.birth_date;
                if (birthDate) data.personal_information.birth_date = birthDate.split('T')[0];

                setInitialValues({
                    ...initialValues,
                    ...removeNulls(data)
                });
            }
        });

    const getCities = () => PromiseRequest('/api/city')
        .then(data => {
            if (data) {
                setCities(data);
            }
        });

    const transformValues = values => {
        const newValues = { ...values };
        delete newValues.banner;
        delete newValues.logo;
        newValues.is_public = !newValues.is_public; // Backend workaround

        return newValues;
    };

    const handleSuccess = (data, { alias, logo_link }) => {
        getInfo();
        setShowAlert({
            title: "Информация сохранена!",
            autoclose: 2,
            onOk: () => setShowAlert(false)
        });
        let updatedUserInfo = {
            ...ls.get('user_info'),
            alias,
            logo_link
        };
        ls.set('user_info', updatedUserInfo);
    };

    const handleError = e => {
        if (e.response) {
            let errorText = e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
            setShowAlert({
                title: `Ошибка: ${errorText}`,
                text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
                autoclose: 7.5,
                onOk: () => setShowAlert(false)
            });
        }
    };

    const sections = [
        { name: 'Основная информация', id: 0 },
        { name: 'Контакты', id: 1 },
        { name: 'О себе', id: 2 },
        { name: 'Безопасность', id: 3 },
        { name: 'Удаление страницы', id: 4 }
    ];

    const renderSection = (section) => {
        switch (section) {
            case 0:
                return <MainInfo initialValues={initialValues} setFormTouched={setFormTouched} />;
            case 1:
                return <Contacts initialValues={initialValues} cities={cities} setFormTouched={setFormTouched} />;
            case 2:
                return <About setFormTouched={setFormTouched} />;
            case 3:
                return <Security {...initialValues} setFormTouched={setFormTouched} getInfo={getInfo} history={history} />;
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
                                        <ul style={{ paddingLeft: '20px' }}>
                                            {sections.map(({ name, id }, key) => <li key={key} onClick={() => handleSectionSwitch(id)}>{name}</li>)}
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