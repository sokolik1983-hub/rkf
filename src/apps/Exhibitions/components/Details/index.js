import React, {useEffect} from 'react'
import Container from "components/Layout/Container";
import Head from "./Head";
import Content from './Content'
import {useResourceAndStoreToRedux} from 'shared/hooks'
import ExhibitionAsideContent from './AsideContent'
import {connectExhibitionDetails} from 'apps/Exhibitions/connectors'
import './styles.scss'

function ExhibitionDetails(props) {
    const {getDetailsSuccess, exhibitionId, details} = props;
    const {loading} = useResourceAndStoreToRedux('/api/exhibitions/exhibition/'+String(exhibitionId), getDetailsSuccess);
    return (
        <Container className="ExhibitionDetails">
            <Head {...details}/>
            <div className="ExhibitionDetails__wrap">
                <Content {...details}/>
                <ExhibitionAsideContent {...details}/>
            </div>
        </Container>
    )

}

export default connectExhibitionDetails(ExhibitionDetails)