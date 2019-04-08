import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
import Breadcrumbs from 'components/Breadcrumbs'
import {ExhibitionsPathContext} from 'apps/Exhibitions/context'

export default class ExhibitionDetails extends PureComponent {
    state = {
        currentTab: "description",
    };

    onTabClick = (tab) => {
        this.setState({currentTab: tab})
    };

    render() {
        return <ExhibitionsPathContext.Consumer>{
            ({path}) =>
                <div className="exhibition-details">
                    <Breadcrumbs>
                        <Link className="breadcrumbs__link" to={path}>Выставки</Link>
                        <Link className="breadcrumbs__link" to={'/'}>Интернациональная выставка собак 2019</Link>
                    </Breadcrumbs>
                    <h1>Интернациональная выставка собак «мемориал А. П. Мазовера 2019»</h1>
                    <div className="exhibition-details__signature--top">
                        <div>Организатор</div>
                        <div><a href="//www.rkf.org.ru">www.rkf.org.ru</a></div>
                    </div>
                    <div className="exhibition-details__content">
                        <div className="exhibition-details__photo">
                            <img src="/ыф" alt=""/>
                        </div>
                        <div className="exhibition-details__tabs">
                            <button className="tab">Описание</button>
                            <button className="tab">Расписание</button>
                            <button className="tab">Участники</button>
                            <button className="tab">Конкурсы</button>
                        </div>
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
                    </div>
                </div>
        }
        </ExhibitionsPathContext.Consumer>

    }
}