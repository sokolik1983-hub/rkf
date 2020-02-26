import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import ExhibitionEditInfo from "./ExhibitionEditInfo";
import {Request} from "../../utils/request";
import {endpointExhibition} from "./config";
import {connectAuthVisible} from "../Login/connectors";
import "./index.scss";


const EditExhibition = ({match, history, isAuthenticated, is_active_profile, profile_id}) => {
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
        <Loading/> :
        !canEdit ?
            <Redirect to={`/exhibitions/${exhibitionId}`}/> :
            <Layout>
                <Container className="content exhibition-edit">
                    <Card className="exhibition-edit__card">
                        <ExhibitionEditInfo history={history} {...exhibition}/>
                    </Card>
                </Container>
            </Layout>
};

export default connectAuthVisible(React.memo(EditExhibition));