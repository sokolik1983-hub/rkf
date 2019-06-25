import React from 'react'
import ButtonBanner from 'components/ButtonBanner'
import ButtonBannerSm from 'components/ButtonBannerSm'
import BigSlider from 'components/BigSlider'

const banners = [
    {
        id: 1,
        title: 'Мои собаки',
        subTitle: 'У вас пока нет собак',
        icon: '/static/icons/client/grayDog.png'
    },
    {
        id: 2,
        title: 'Мои выставки',
        subTitle: 'Вы не участвуете ни в одной выставке',
        icon: '/static/icons/client/greyPrize.png'
    },
    {
        id: 3,
        title: 'Мои выставки',
        subTitle: 'Завершите настройку учетной записи',
        icon: '/static/icons/client/greyProfileLevel.png'
    }
];

const bannersSm = [
    {
        id: 1,
        title: 'База собак России',
        subTitle: 'Регистрация первой собаки<br/>Регистрация первой собаки</br>Все о реестре собак',
        icon: '/static/icons/client/greyDogBase.png'
    },
    {
        id: 2,
        title: 'Участие в выставках',
        subTitle: 'Первая выставка с собакой<br/>Как найти хендлера?<br/>Подготовка к конкурсу',
        icon: '/static/icons/client/greyDogBase.png'
    },
    {
        id: 3,
        title: 'Щенки',
        subTitle: 'Как выбрать первого щенка<br/>Прививки и клеймо<br/>Как выбрать питомник',
        icon: '/static/icons/client/greyPuppies.png'
    },
    {
        id: 4,
        title: 'Дрессировка',
        subTitle: 'Как выбрать дрессировщика<br/>Как найти собаку в базе</br>Все о реестре собак',
        icon: '/static/icons/client/greyDogTraining.png'
    }
];

const DogOwnerHome = () => <>
    <BigSlider/>
    <div className="flex-row">
        {
            banners.map(banner => <ButtonBanner key={banner.id} {...banner}/>)
        }
    </div>
    <div className="flex-row">
        {
            bannersSm.map(banner => <ButtonBannerSm key={banner.id} {...banner}/>)
        }
    </div>
</>;

export default DogOwnerHome;