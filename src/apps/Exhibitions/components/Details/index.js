import React from 'react';
import { useResourceAndStoreToRedux } from 'shared/hooks';
import Card from 'components/Card';
import Container from 'components/Layout/Container';
import FooterSmall from 'components/Layout/FooterSmall';
import FeaturedExhibitions from '../Featured';
import Head from './Head';
import Content from './Content';
import ExhibitionDocuments from 'apps/ExhibitionDocuments';
import PaymentDetails from './PaymentDetails';
import Address from './Address';
import ExhibitionDetailsPrices from '../DetailsPrices';
import ExhibitionAsideContent from './AsideContent';
import { connectExhibitionDetails } from 'apps/Exhibitions/connectors';
import Partners from 'apps/HomePage/components/Partners';
import {
    SponsorsData,
    PartnersData
} from 'apps/HomePage/components/Partners/data';
import Loading from 'components/Loading';

import './styles.scss';

function ExhibitionDetails(props) {
    const { getDetailsSuccess, exhibitionId, details } = props;
    const { loading } = useResourceAndStoreToRedux(
        '/api/exhibitions/exhibition/' + String(exhibitionId),
        getDetailsSuccess
    );
    if(!loading) window.scrollTo(0, 0);

    return loading
        ? <Loading />
        : (<>
            <Container pad content className="ExhibitionDetails">
                <Head loading={loading} {...details} />
                <div className="ExhibitionDetails__wrap">
                    <Content {...details} />
                    <ExhibitionAsideContent {...details} />
                </div>
                {details ? (
                    <ExhibitionDocuments exhibitionId={details.id} />
                ) : null}
                {exhibitionId && (
                    <ExhibitionDetailsPrices exhibition_id={exhibitionId} />
                )}
                <PaymentDetails />
                <Partners title="Наши спонсоры" items={SponsorsData} />
                <Partners title="Наши партнеры" items={PartnersData} />
                <Address {...details} />
                <h3 className="FeaturedExhibitions__title">Другие выставки</h3>
                <Card>
                    <FeaturedExhibitions />
                </Card>
            </Container>
            <FooterSmall />
        </>);
}

export default connectExhibitionDetails(ExhibitionDetails);
