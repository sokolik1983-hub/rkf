import React from 'react'
import {Link} from "react-router-dom";
import Breadcrumbs from 'components/Breadcrumbs'
import DetailsContent from '../DetailsContent'
import DetailsAside from '../DetailsAside'
import Button from 'components/Button'
import Tabs from "components/Tabs";
import {TabContent} from "components/Tabs";

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'

import './index.scss'

const DetailsLayout = () =>
    <ExhibitionsPathContext.Consumer>{
        ({path}) =>
            <div className="exhibition-details">
                <div className="exhibition-details__head">
                    <Breadcrumbs>
                        <Link className="breadcrumbs__link" to={path}>Выставки</Link>
                        <Link className="breadcrumbs__link" to={'/'}>Интернациональная выставка собак 2019</Link>
                    </Breadcrumbs>
                    <h1>Интернациональная выставка собак «мемориал А. П. Мазовера 2019»</h1>
                    <div className="exhibition-details__signature--top">
                        <div>Организатор: РКФ</div>
                        <div><a href="//www.rkf.org.ru">www.rkf.org.ru</a></div>
                    </div>
                </div>
                <DetailsContent>

                    <div className="exhibition-details__photo">
                        <img src="/static/images/noimg/details.svg" alt=""/>
                    </div>
                    <Tabs className="exhibition-details__tabs">
                        <TabContent label="Описание">Описание</TabContent>
                        <TabContent label="Расписание">Расписание</TabContent>
                        <TabContent label="Судьи">Судьи</TabContent>
                        <TabContent label="Участники">Участники</TabContent>
                        <TabContent label="Конкурсы">Конкурсы</TabContent>
                    </Tabs>
                    <div className="exhibition-details__description">
                        bla bla bla
                    </div>
                    <div className="exhibition-details__prices">
                        <h2>Цены</h2>
                        bla bla bla
                    </div>
                    <div className="exhibition-details__contests">
                        <h2>Конкурсы</h2>
                        bla bla bla
                    </div>
                </DetailsContent>
                <DetailsAside>
                    <div className="exhibition-details__dates">Суббота, 25.05.2019 - 25.05.2019<br/>
                        <a href="#">Добавить
                            в календарь</a></div>
                    <div className="exhibition-details__time">Начало в 12:00 по МСК</div>
                    <div className="exhibition-details__place">г. Красногорск, Крокус экспо - Международный выставочный
                        центр
                    </div>
                    <table className="exhibition-details__attrs-table">
                        <tbody>
                        <tr>
                            <td>Стандарт:</td>
                            <td>FCI</td>
                        </tr>
                        <tr>
                            <td>Ранг:</td>
                            <td>CACIB</td>
                        </tr>
                        <tr>
                            <td>Породы:</td>
                            <td>Все породы</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="">
                        <Button className="btn-primary">Участвовать</Button>
                        <Button className="btn-secondary">В избранное</Button>
                        <Button className="btn-secondary">Поделиться</Button>
                    </div>
                </DetailsAside>
            </div>
    }
    </ExhibitionsPathContext.Consumer>;


export default DetailsLayout;