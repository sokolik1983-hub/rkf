import React from 'react'
import BigSlider from 'components/BigSlider'
import WeekExhibitions from 'apps/HomePage/components/WeekExhibitions'

const HomePageLayout = () =>
    <div className="home">
        <BigSlider/>
        <WeekExhibitions/>
    </div>;

export default HomePageLayout;