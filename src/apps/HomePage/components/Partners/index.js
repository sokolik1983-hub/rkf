import React from 'react'
import PartnersSponsors from 'components/PartnersSponsors'
import Container from 'components/Layout/Container'
import {fakeData} from './data'
import './styles.scss'


const Partners = () =>
    <Container pad className="partners">
        <div className="partners__title">Наши партнёры</div>
        <div className="partners__list">
            <PartnersSponsors items={fakeData}/>
        </div>
    </Container>

export default Partners;