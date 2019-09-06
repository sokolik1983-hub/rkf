import React, {useState} from 'react';
import {useResourceAndStoreToRedux} from 'shared/hooks';
import Card from 'components/Card'
import Container from 'components/Layout/Container';
import FooterSmall from 'components/Layout/FooterSmall';
import FeaturedExhibitions from '../Featured';
import Head from './Head';
import Content from './Content';
import PaymentDetails from './PaymentDetails';
import Address from './Address';
import ExhibitionDetailsPrices from '../DetailsPrices';
import ExhibitionAsideContent from './AsideContent';
import {connectExhibitionDetails} from 'apps/Exhibitions/connectors';
import Partners from 'apps/HomePage/components/Partners';
import {
    SponsorsData,
    PartnersData
} from 'apps/HomePage/components/Partners/data';

import './styles.scss';

function ExhibitionDetails(props) {
    const {getDetailsSuccess, exhibitionId, details} = props;
    const {loading} = useResourceAndStoreToRedux(
        '/api/exhibitions/exhibition/' + String(exhibitionId),
        getDetailsSuccess
    );

    // TODO: replace with dynamic data
    const [featuredExh, setFeaturedExh] = useState(false);
    if (!featuredExh) {
        fetch('/api/exhibitions/Exhibition/featured?Alias=real_tyu')
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => setFeaturedExh(response.result));
    }

    return (
        <>
            <Container className="ExhibitionDetails">
                <Head loading={loading} {...details} />
                <div className="ExhibitionDetails__wrap">
                    <Content {...details} />
                    <ExhibitionAsideContent {...details} />
                </div>
                {exhibitionId && (
                    <ExhibitionDetailsPrices exhibition_id={exhibitionId}/>
                )}
                <PaymentDetails/>
                <Partners title="Наши спонсоры" items={SponsorsData}/>
                <Partners title="Наши партнеры" items={PartnersData}/>
                <Address {...details} />
                <h3 className="FeaturedExhibitions__title">Другие выставки</h3>
                <Card>
                    <FeaturedExhibitions/>
                </Card>
            </Container>
            <FooterSmall/>
        </>
    );
}

export default connectExhibitionDetails(ExhibitionDetails);
