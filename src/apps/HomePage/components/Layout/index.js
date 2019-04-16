import React from 'react'
import BigSlider from 'components/BigSlider'
import WeekExhibitions from 'apps/HomePage/components/WeekExhibitions'
import About from 'apps/HomePage/components/AboutBlock'
import SpecialOffersSubscription from 'components/Subcriptions/SpecialOffers'

const HomePageLayout = () =>
    <div className="home">
        <BigSlider/>
        <WeekExhibitions/>
        <About/>
        <SpecialOffersSubscription/>
    </div>;

export default HomePageLayout;