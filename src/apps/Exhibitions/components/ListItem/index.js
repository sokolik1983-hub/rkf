import React, {PureComponent} from 'react'
import {getTimeFromDate} from 'utils/datetime'
import Button from 'components/Button'
import './index.scss'

export default class ListItem extends PureComponent {
    render() {
        const {id, title, start_datetime, end_datetime, city, participants_count} = this.props;
        return (
            <div id={'exhibitionsListItem_'+id} className="exhibition-list-item">
                <div className="exhibition-list-item__header">
                    <div className="exhibition-list-item__city">{city}</div>
                    <div
                        className="exhibition-list-item__datetime">{getTimeFromDate(start_datetime)} - {getTimeFromDate(end_datetime)}</div>
                </div>
                <div className="exhibition-list-item__title">{title}</div>
                <div className="exhibition-list-item__participants-count">Количество участников: <span>{participants_count}</span></div>
                <div className="exhibition-list-item__controls">
                    <Button className="btn-primary">Смотреть</Button><Button className="btn-secondary">В изранное</Button>
                </div>
            </div>
        );
    }
};