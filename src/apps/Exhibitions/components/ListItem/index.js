import React, {PureComponent} from 'react'
import {Link} from "react-router-dom";
import {getTimeFromDate} from 'utils/datetime'
import Button from 'components/Button'
import './index.scss'

import {ExhibitionsPathContext} from 'apps/Exhibitions/context'

export default class ListItem extends PureComponent {
    render() {
        const {id, title, start_datetime, end_datetime, city, participants_count, cities} = this.props;
        return <ExhibitionsPathContext.Consumer>{
            ({path}) =>
                (
                    <div id={'exhibitionsListItem_' + id} className="exhibition-list-item">
                        <div className="exhibition-list-item__header">
                            <div className="exhibition-list-item__city">
                                {/*<Link to={`${path}/${id}/details`}>{cities[city.toString()].title}</Link>*/}
                                {cities[city.toString()].title}
                            </div>
                            <div
                                className="exhibition-list-item__datetime">
                                {getTimeFromDate(start_datetime)} - {getTimeFromDate(end_datetime)}
                            </div>
                        </div>
                        <div className="exhibition-list-item__title">{title}</div>
                        <div className="exhibition-list-item__participants-count">Количество
                            участников: <span>{participants_count}</span></div>
                        <div className="exhibition-list-item__controls">
                            <Link to={`${path}/${id}/details`} className="btn btn-primary">Смотреть</Link><Button className="btn-secondary">В
                            изранное</Button>
                        </div>
                    </div>
                )
        }
        </ExhibitionsPathContext.Consumer>
    }
};