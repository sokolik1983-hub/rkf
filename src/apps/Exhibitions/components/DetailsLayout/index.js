import React from 'react'
import {Link} from "react-router-dom";
import Breadcrumbs from 'components/Breadcrumbs'
import DetailsContent from '../DetailsContent'
import DetailsAside from '../DetailsAside'
import DetailImage from '../DetailsImage'
import PriceTable from '../DetailPriceTable'
import ContestTable from '../DetailContestTable'
import Schedule from '../DetailSchedule'
import Button from 'components/Button'
import Tabs from "components/Tabs";
import {TabContent} from "components/Tabs";

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'

import './index.scss'

const DetailsLayout = ({exhibitionDetails}) =>
    <ExhibitionsPathContext.Consumer>{
        ({path}) =>
            <div className="exhibition-details">
                <div className="exhibition-details__head">
                    <Breadcrumbs>
                        <Link className="breadcrumbs__link" to={path}>Выставки</Link>
                        <Link className="breadcrumbs__link" to={'/'}>Интернациональная выставка собак 2019</Link>
                    </Breadcrumbs>
                    <h1>{exhibitionDetails.title}</h1>
                    <div className="exhibition-details__signature--top">
                        <div>Организатор: {exhibitionDetails.owner.name}</div>
                        {exhibitionDetails.owner.site ?
                            <div><a href="//www.rkf.org.ru">{exhibitionDetails.owner.site}</a></div> : null}
                    </div>
                </div>
                <DetailsContent>
                    {
                        exhibitionDetails.images.length > 0 ?
                            exhibitionDetails.images.map(image => <DetailImage key={image.url} url={image.url}/>)
                            : null
                    }

                    <Tabs className="exhibition-details__tabs">
                        {
                            exhibitionDetails.description ?
                                <TabContent label="Описание">
                                    <div dangerouslySetInnerHTML={{__html: exhibitionDetails.description}}/>
                                </TabContent>
                                : null
                        }

                        {
                            exhibitionDetails.schedule.length ?
                                <TabContent label="Расписание">
                                    <Schedule schedule={exhibitionDetails.schedule}/>
                                    <p>Расписание может изменяться. Для того, тчобы быть в курсе включите оповещения в личном кабинете или просматривайте обновления расписания.</p>
                                </TabContent>
                                : null
                        }

                        <TabContent label="Судьи">Судьи</TabContent>
                        <TabContent label="Участники">Участники</TabContent>
                        <TabContent label="Конкурсы">Конкурсы</TabContent>
                    </Tabs>

                </DetailsContent>
                <DetailsAside>
                    <div className="exhibition-details__aside_holder">
                        <div
                            className="exhibition-details__dates-icon">{exhibitionDetails.date.start} {exhibitionDetails.date.end}<br/>
                            <a href="#">Добавить в календарь</a>
                        </div>
                        <div className="exhibition-details__time-icon">Начало {exhibitionDetails.date.start}</div>
                        <div
                            className="exhibition-details__place-icon">{exhibitionDetails.place.city} {exhibitionDetails.place.place}</div>
                    </div>
                    <table className="exhibition-details__attrs-table">
                        <tbody>
                        <tr>
                            <td>Стандарт:</td>
                            <td>{exhibitionDetails.standard}</td>
                        </tr>
                        <tr>
                            <td>Ранг:</td>
                            <td>{exhibitionDetails.rang}</td>
                        </tr>
                        <tr>
                            <td>Породы:</td>
                            <td>{exhibitionDetails.dog_breed}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="">
                        <Button className="btn-primary">Участвовать</Button>
                        <Button className="btn-secondary">В избранное</Button>
                        <Button className="btn-secondary">Поделиться</Button>
                    </div>
                </DetailsAside>
                <div className="exhibition-details__prices">
                    <h2>Цены</h2>
                    <PriceTable categories={exhibitionDetails.prices.prices}/>
                    <ContestTable categories={exhibitionDetails.prices.contests}/>
                </div>
            </div>
    }
    </ExhibitionsPathContext.Consumer>;


export default DetailsLayout;