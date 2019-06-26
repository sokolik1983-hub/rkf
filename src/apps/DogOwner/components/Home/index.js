import React from 'react'
import ButtonBanner from 'components/ButtonBanner'
import ButtonBannerSm from 'components/ButtonBannerSm'
import BigSlider from 'components/BigSlider'
import {banners, bannersSm} from './dataBanners'


const DogOwnerHome = () => <>
    <BigSlider style={{marginBottom: 80}}/>
    <div style={{justifyContent: 'space-between'}} className="flex-row">
        {
            banners.map(banner => <ButtonBanner key={banner.id} {...banner}/>)
        }
    </div>
    <h4 className="text-center">Полезная информация</h4>
    <div style={{justifyContent: 'space-between'}} className="flex-row">
        {
            bannersSm.map(banner => <ButtonBannerSm key={banner.id} {...banner}/>)
        }
    </div>
</>;

export default DogOwnerHome;