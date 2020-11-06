import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Card from "components/Card";
import Container from "../../components/Layouts/Container";
import { Request } from "utils/request";
import { connectAuthVisible } from "pages/Login/connectors";
import StickyBox from "react-sticky-box";
import UserBanner from "components/Layouts/UserBanner";
import UserInfo from "../../components/Layouts/UserInfo";
import UserMenu from "components/Layouts/UserMenu"
import { endpointGetUserInfo, userNav } from "pages/User/config";
import useIsMobile from "utils/useIsMobile";
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';

import AllCategories from './components/AllCategories';
import CreateCategoryForm from './components/CreateCategoryForm';
import CategoriesList from './components/CategoriesList';
import CategoryPage from './CategoryPage';
import { Route, Switch } from "react-router-dom";
import { Fade } from '@progress/kendo-react-animation';
import ModalEditCategory from './components/ModalEditCategory';
import ModalDeleteCategory from './components/ModalDeleteCategory';
import ModalDeleteDocument from './components/ModalDeleteDocument';
import ls from "local-storage";
import './styles.scss';



const UploadedDocuments = ({ history, location, match, profile_id, is_active_profile, isAuthenticated }) => {
    const [loaded, setLoaded] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const alias = match.params.route;
    const isMobile = useIsMobile();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorRedirect, setErrorRedirect] = useState(false);
    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));
    const [categories, setCategories] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [modal, setModal] = useState({});
    const homePage = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);

    useEffect(() => {
        Promise.all([getUser(), getCategories(), getDocuments()])
            .then(() => setLoaded(true))
            .catch(e => { handleError(e); setErrorRedirect(error && error.response ? error.response : null) });
    }, []);

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


    const getCategories = () => PromiseRequest(`/api/document/publicdocument/category?alias=${alias}`)
        .then(data => {
            if (data) {
                setCategories(data);
            }
        });
    const getDocuments = () => PromiseRequest(`/api/document/publicdocument/public?alias=${alias}`)
        .then(data => {
            if (data) {
                setDocuments(data);
            }
        });

    const handleSuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const handleError = e => {
        if (e.response) {
            let message;
            if (e.response.data) {
                message = e.response.data.errors
                    ? Object.values(e.response.data.errors)
                    : `${e.response.status} ${e.response.statusText}`;
            } else if (e.response.errors) {
                message = e.response.errors
                    ? Object.values(e.response.errors)
                    : `${e.response.status} ${e.response.statusText}`;
            } else {
                message = 'Произошла ошибка';
            }
            setErrorMessage(message);
            setError(true);
            !error && setTimeout(() => {
                setError(false);
            }, 5000);
        }
    };


    return (!loaded
        ? <Loading />
        : errorRedirect
            ? <Redirect to="/404" />
            : <Layout>
                <Container className="UploadedDocuments content">
                    <aside className="UploadedDocuments__left">
                        <StickyBox offsetTop={66}>
                            {isMobile &&
                                <UserBanner link={userInfo.headliner_link} canEdit={canEdit} updateInfo={getUser} />
                            }
                            <Card>
                                <UserInfo
                                    canEdit={canEdit}
                                    logo_link={userInfo.logo_link}
                                    share_link={`https://rkf.online/user/${alias}`}
                                    first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                    last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                    alias={alias}
                                    updateInfo={getUser}
                                />
                            </Card>
                            <UserMenu userNav={userNav(alias)} />
                        </StickyBox>
                    </aside>
                    <div className="UploadedDocuments__right">
                        {!loaded
                            ? <Loading />
                            : <div className="UploadedDocuments__inner">
                                <div className="UploadedDocuments__inner-left">
                                    <Switch>
                                        <Route
                                            exact={true}
                                            path={'/:user?/:route/uploaded-documents/'}
                                            component={({ match }) =>
                                                <AllCategories
                                                    match={match}
                                                    canEdit={canEdit}
                                                    activeCategoryId={activeCategoryId}
                                                    setActiveCategoryId={setActiveCategoryId}
                                                    categories={categories}
                                                    documents={documents}
                                                    setModal={setModal}
                                                    getDocuments={getDocuments}
                                                    handleError={handleError}
                                                    handleSuccess={handleSuccess}
                                                    homePage={homePage}
                                                />}
                                        />
                                        <Route
                                            exact={true}
                                            path={'/:user?/:route/uploaded-documents/:id'}
                                            component={({ match }) =>
                                                <CategoryPage
                                                    match={match}
                                                    canEdit={canEdit}
                                                    setActiveCategoryId={setActiveCategoryId}
                                                    categories={categories}
                                                    documents={documents}
                                                    setModal={setModal}
                                                    getDocuments={getDocuments}
                                                    handleError={handleError}
                                                    handleSuccess={handleSuccess}
                                                    homePage={homePage}
                                                />}
                                        />
                                    </Switch>
                                </div>
                                <div className="UploadedDocuments__inner-right">
                                    <Card>
                                        {canEdit && <>
                                            <h3 className="UploadedDocuments__category-form-title">Создать категорию</h3>
                                            <CreateCategoryForm getCategories={getCategories} handleSuccess={handleSuccess} handleError={handleError} />
                                            <hr />
                                        </>}
                                        <CategoriesList
                                            canEdit={canEdit}
                                            setModal={setModal}
                                            categories={categories}
                                            handleError={handleError}
                                            handleSuccess={handleSuccess}
                                            getCategories={getCategories}
                                            activeCategoryId={activeCategoryId}
                                            homePage={homePage}
                                        />
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
                            {success.status && <Notification
                                type={{ style: 'success', icon: true }}
                                closable={true}
                                onClose={() => setSuccess(false)}
                            >
                                <span>{success.message ? success.message : 'Информация сохранена!'}</span>
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
                    {modal.type === 'editCategory' &&
                        <ModalEditCategory
                            handleError={handleError}
                            handleSuccess={handleSuccess}
                            getCategories={getCategories}
                            categoryId={modal.categoryId}
                            categoryName={modal.categoryName}
                            closeModal={() => setModal({})}
                        />
                    }
                    {modal.type === 'deleteCategory' &&
                        <ModalDeleteCategory handleError={handleError}
                            handleSuccess={handleSuccess}
                            getCategories={getCategories}
                            categoryId={modal.categoryId}
                            closeModal={() => setModal({})}
                        />
                    }
                    {modal.type === 'deleteDocument' &&
                        <ModalDeleteDocument handleError={handleError}
                            handleSuccess={handleSuccess}
                            getDocuments={getDocuments}
                            documentId={modal.documentId}
                            closeModal={() => setModal({})}
                        />
                    }
                </Container>
            </Layout>
    )
};

export default React.memo(connectAuthVisible(UploadedDocuments));