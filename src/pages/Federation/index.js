import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import TopComponent from "../../components/TopComponent";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import AboutComponent from "../../components/AboutComponent";
import AddArticle from "../../components/AddArticleComponent";
import NewsComponent from "../../components/NewsComponent";
import PhotoComponent from "../../components/PhotoComponent";
import MenuComponent from "../../components/MenuComponent";
import ContactsComponent from "../../components/ContactsComponent";
import DocumentsComponent from "../../components/DocumentsComponent";
import {Request} from "../../utils/request";
import {connectAuthVisible} from "../Login/connectors";
import "./index.scss";


const Federation = ({match, isAuthenticated, profile_id}) => {
    const alias = match.path.replace('/', '');
    const [federation, setFederation] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: `/api/Club/federation_base_info?alias=${alias}`
        }, data => {
            setFederation(data);
            setCanEdit(isAuthenticated && profile_id === data.id);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    if(!loading && !federation) return <PageNotFound/>;

    return loading ?
        <Loading/> :
        <Layout>
            <div className="federation-page">
                <Container className="content federation-page__content">
                    <TopComponent
                        logo={federation.logo}
                        name={federation.name}
                        canEdit={canEdit}
                    />
                    <ExhibitionsComponent alias={alias}/>
                    <div className="federation-page__info">
                        <div className="federation-page__right">
                            <AboutComponent description={federation.description}/>
                            {canEdit &&
                                <AddArticle
                                    clubId={federation.id}
                                    logo={federation.logo}
                                    setPage={setPage}
                                    setNeedRequest={setNeedRequest}
                                />
                            }
                            <NewsComponent
                                alias={alias}
                                page={page}
                                setPage={setPage}
                                needRequest={needRequest}
                                setNeedRequest={setNeedRequest}
                                canEdit={canEdit}
                            />
                        </div>
                        <aside className="federation-page__left">
                            <PhotoComponent
                                photo={federation.owner_photo}
                                name={federation.owner_name}
                                position={federation.owner_position}
                            />
                            <MenuComponent alias={alias} btnName="Страница Федерации"/>
                            <ContactsComponent
                                address={federation.address}
                                owner_name={federation.owner_name}
                                contacts={federation.contacts}
                                work_time={federation.work_time}
                            />
                            {federation.documents && !!federation.documents.length &&
                                <DocumentsComponent documents={federation.documents}/>
                            }
                        </aside>
                    </div>
                </Container>
            </div>
        </Layout>
};

export default React.memo(connectAuthVisible(Federation));