import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import Card from "components/Card";
import { Request } from "utils/request";
import { connectAuthVisible } from "pages/Login/connectors";
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import AllCategories from './components/AllCategories';
import CategoriesList from './components/CategoriesList';
import CategoryPage from './CategoryPage';
import { Route, Switch } from "react-router-dom";
import { Fade } from '@progress/kendo-react-animation';
import ModalAddCategory from './components/ModalAddCategory';
import ModalEditCategory from './components/ModalEditCategory';
import ModalDeleteCategory from './components/ModalDeleteCategory';
import ModalDeleteDocument from './components/ModalDeleteDocument';
import { SvgIcon } from "@progress/kendo-react-common";
import { plus } from "@progress/kendo-svg-icons";
import './styles.scss';

const UploadedDocuments = ({ canEdit, location, match }) => {
    const [loaded, setLoaded] = useState(false);
    const alias = match.params.route;
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
        Promise.all([getCategories(), getDocuments()])
            .then(() => setLoaded(true))
            .catch(e => { handleError(e); setErrorRedirect(error && error.response ? error.response : null) });
    }, []);

    const getCategories = () => PromiseRequest(`/api/document/publicdocument/category?alias=${alias}`)
        .then(data => {
            if (data) {
                setCategories(data);
            }
        });
    const getDocuments = (withSuccess) => PromiseRequest(`/api/document/publicdocument/public?alias=${alias}`)
        .then(data => {
            if (data) {
                setDocuments(data);
                withSuccess && handleSuccess();
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
            : <>
                {!loaded
                    ? <Loading />
                    : <div className="UploadedDocuments">
                        <div className="UploadedDocuments-left">
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
                        <div className="UploadedDocuments-right">
                            <Card>
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
                                {canEdit && <>
                                    <hr className="UploadedDocuments__category-devider" />
                                    <div
                                        className="UploadedDocuments__category-add"
                                        onClick={() => setModal({ type: 'addCategory' })}
                                    >
                                        <h3>Добавить категорию</h3>
                                        <button className="UploadedDocuments__add-btn" type="button" >
                                            <SvgIcon icon={plus} size="default" />
                                        </button>
                                    </div>
                                </>}
                            </Card>
                        </div>
                    </div>
                }
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
                {
                    modal.type === 'addCategory' &&
                    <ModalAddCategory
                        handleError={handleError}
                        handleSuccess={handleSuccess}
                        getCategories={getCategories}
                        closeModal={() => setModal({})}
                    />
                }
                {
                    modal.type === 'editCategory' &&
                    <ModalEditCategory
                        handleError={handleError}
                        handleSuccess={handleSuccess}
                        getCategories={getCategories}
                        categoryId={modal.categoryId}
                        categoryName={modal.categoryName}
                        closeModal={() => setModal({})}
                    />
                }
                {
                    modal.type === 'deleteCategory' &&
                    <ModalDeleteCategory handleError={handleError}
                        handleSuccess={handleSuccess}
                        getCategories={getCategories}
                        categoryId={modal.categoryId}
                        closeModal={() => setModal({})}
                    />
                }
                {
                    modal.type === 'deleteDocument' &&
                    <ModalDeleteDocument handleError={handleError}
                        handleSuccess={handleSuccess}
                        getDocuments={getDocuments}
                        documentId={modal.documentId}
                        closeModal={() => setModal({})}
                    />
                }
            </>
    )
};

export default React.memo(connectAuthVisible(UploadedDocuments));