import React from 'react'
import Container from 'components/Layout/Container'
import BigSlider from 'components/BigSlider'
import WeekExhibitions from 'apps/HomePage/components/WeekExhibitions'
import RecentNews from 'apps/HomePage/components/RecentNews'
import Partners from 'apps/HomePage/components/Partners'
import About from 'apps/HomePage/components/AboutBlock'
import RegisterBlock from 'apps/HomePage/components/Register'
import SpecialOffersSubscription from 'components/Subcriptions/SpecialOffers'

const HomePageLayout = () =>
    <Container className="home">
        <BigSlider/>
        <WeekExhibitions/>
        <About/>
        <RecentNews/>
        <Partners/>
        <RegisterBlock/>
        <SpecialOffersSubscription/>
    </Container>;

export default HomePageLayout;