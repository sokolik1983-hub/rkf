import React from 'react'
import Container from 'components/Layout/Container'
import BigSlider from 'components/BigSlider'
import SocialGallery from 'apps/HomePage/components/SocialGallery'

import Partners from 'apps/HomePage/components/Partners'
import About from 'apps/HomePage/components/AboutBlock'
import RegisterBlock from 'apps/HomePage/components/Register'
import SpecialOffersSubscription from 'components/Subcriptions/SpecialOffers'
import PublicLayout from 'components/Layout'
import {demoSlides} from './demoSlides'


import WeekExhibitions from '../WeekExhibitions'
import News from '../News'

const HomePageLayout = () =>
    <PublicLayout>
        <Container className="home">
            <BigSlider slides={demoSlides}/>
            <WeekExhibitions/>
            <About/>
            <News/>
            <Partners/>
            <RegisterBlock/>
            <SocialGallery/>
            <SpecialOffersSubscription/>
        </Container>
    </PublicLayout>;

export default HomePageLayout;