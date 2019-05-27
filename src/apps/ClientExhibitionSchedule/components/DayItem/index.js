import React, {PureComponent} from 'react'
import './styles.scss'

export const Items = ({items = []}) => items.length > 0 ?
    items.map(item => <ScheduleDayItem key={item.id} {...item}/>)
    : null;

export default class ScheduleDayItem extends PureComponent {

    render() {
        const {start, end, title} = this.props;
        return (
            <div className="schedule-item">
                <div className="schedule-item__start">{start}</div>
                <div className="schedule-item__title">{title}</div>
            </div>
        )
    }
}