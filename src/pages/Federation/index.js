import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layout/Container";
import TopComponent from "../../components/TopComponent";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import AboutComponent from "../../components/AboutComponent";
import NewsComponent from "../../components/NewsComponent";
import PhotoComponent from "../../components/PhotoComponent";
import MenuComponent from "../../components/MenuComponent";
import ContactsComponent from "../../components/ContactsComponent";
import DocumentsComponent from "../../components/DocumentsComponent";
import {Request} from "../../utils/request";
import "./index.scss";


const Federation = ({match}) => {
    const alias = match.path.replace('/', '');
    const [federation, setFederation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: `/api/Club/federation_base_info?alias=${alias}`
        }, data => {
            setFederation(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading/> :
        <Layout>
            <div className="federation-page">
                <Container className="content federation-page__content">
                    <TopComponent
                        alias={alias}
                        logo={federation.logo}
                        name={federation.name}
                        status={federation.status || "текущий статус"}
                    />
                    <ExhibitionsComponent alias={alias}/>
                    <div className="federation-page__info">
                        <div className="federation-page__right">
                            <AboutComponent description={federation.description}/>
                            <NewsComponent alias={alias}/>
                        </div>
                        <aside className="federation-page__left">
                            <PhotoComponent
                                photo={federation.owner_photo}
                                name={federation.owner_name}
                                position={federation.owner_position}
                            />
                            <MenuComponent alias={alias}/>
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

export default React.memo(Federation);