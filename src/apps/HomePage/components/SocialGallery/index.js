import React, {Fragment} from 'react'
import Container from 'components/Layout/Container'
import Gallery from 'components/Gallery'
import {fakeData} from './data'

import './styles.scss'

const SocialGallery = () =>
    <Fragment>
        <div className="social-gallery">
            <div className="social-gallery__title">Мы в социальных сетях</div>
            <div className="social-gallery__subtitle">Делитесь своими фотографими в инстаграмм с хэштегом #РКФ</div>
            <Gallery items={fakeData}/>

        </div>
        <Container pad className="social-gallery__popular">
            <div className="social-gallery__popular-title">Популярное</div>
            <div className="social-gallery__popular-tags">
                <div className="social-gallery__popular-tag">Щенки</div>
                <div className="social-gallery__popular-tag">Выставки</div>
                <div className="social-gallery__popular-tag">Евразия 2019</div>
                <div className="social-gallery__popular-tag">Конкурс пар</div>
                <div className="social-gallery__popular-tag">Сводная ведомость</div>
            </div>
        </Container>
    </Fragment>;

export default SocialGallery;
