import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import Disclaimer from "components/Disclaimer";
import ExhibitionEditInfo from "./ExhibitionEditInfo";
import { Request } from "../../utils/request";
import { endpointExhibition } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";


const EditExhibition = ({ match, history, isAuthenticated, is_active_profile, profile_id }) => {
    const [exhibition, setExhibition] = useState(null);
    const [loading, setLoading] = useState(true);
    const exhibitionId = match.params.id;
    const canEdit = isAuthenticated && is_active_profile && exhibition && profile_id === exhibition.exhibition.club_id;

    useEffect(() => {
        (() => Request({
            url: `${endpointExhibition}?id=${exhibitionId}`
        }, data => {
            setExhibition(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading /> :
        !canEdit ?
            <Redirect to={`/exhibitions/${exhibitionId}`} /> :
            <Layout>
                <Container className="content exhibition-edit">
                    <Card className="exhibition-edit__card">
                        <Disclaimer>
                            <a className="Disclaimer__support-link" href="http://support.rkf.online/%d0%b8%d0%bd%d1%81%d1%82%d1%80%d1%83%d0%ba%d1%86%d0%b8%d1%8f-%d0%bf%d0%be-%d1%80%d0%b5%d0%b4%d0%b0%d0%ba%d1%82%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d1%8e-%d0%b2%d1%8b%d1%81%d1%82%d0%b0%d0%b2-2/" target="_blank" rel="noopener noreferrer">
                                Инструкция по редактированию выставки клуба
                            </a>
                        </Disclaimer>
                        <ExhibitionEditInfo history={history} {...exhibition} />
                    </Card>
                </Container>
            </Layout>
};

export default connectAuthVisible(React.memo(EditExhibition));