import React from 'react'
import Container from "components/Layout/Container";
import Head from "./Head";
import Content from './Content'
import PaymentDetails from './PaymentDetails'
import Address from './Address'
import { useResourceAndStoreToRedux } from 'shared/hooks'
import ExhibitionAsideContent from './AsideContent'
import { connectExhibitionDetails } from 'apps/Exhibitions/connectors'
import Partners from 'apps/HomePage/components/Partners'
import { SponsorsData, PartnersData } from 'apps/HomePage/components/Partners/data'
import ExhibitionDetailsPrices from '../DetailsPrices'
import './styles.scss'
// import FooterSmall from 'components/Layout/FooterSmall'

function ExhibitionDetails(props) {
    const { getDetailsSuccess, exhibitionId, details } = props;
    const { loading } = useResourceAndStoreToRedux('/api/exhibitions/exhibition/' + String(exhibitionId), getDetailsSuccess);
    return (
        <>
            <Container className="ExhibitionDetails">
                <Head loading={loading} {...details} />
                <div className="ExhibitionDetails__wrap">
                    <Content {...details} />
                    <ExhibitionAsideContent {...details} />
                </div>
                {exhibitionId && <ExhibitionDetailsPrices exhibition_id={exhibitionId} />}
                <PaymentDetails />
                <Partners title="Наши спонсоры" items={SponsorsData} />
                <Partners title="Наши партнеры" items={PartnersData} />
                <Address />
            </Container>
            {/* <FooterSmall/> */}
        </>
    )

}

export default connectExhibitionDetails(ExhibitionDetails)