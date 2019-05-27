import React, {PureComponent} from 'react'
import {Items} from '../DayItem'
import ItemForm from '../ItemForm'
import './styles.scss'

export default class ScheduleDay extends PureComponent {
    state = {
        edit: false,
        addItemFormVisible: false,
        items: []

    };
    onItemSubmit = (values) => {
        this.setState({items: [...this.state.items, values]})
    };

    toggleItemForm = () => this.setState(prevState => ({addItemFormVisible: !prevState.addItemFormVisible}));

    render() {
        const {id, day, month, year, items, index} = this.props;
        const {edit, addItemFormVisible} = this.state;
        const date = new Date(`${month}.${day}.${year}`);
        return (

            <div id={'day' + id} className="day">
                <div className="day__date">День {index + 1} {date.toDateString()}</div>
                <div className="day__items">
                    <Items items={items}/>
                    <Items items={this.state.items}/>
                </div>
                <div onClick={this.toggleItemForm} className="btn btn-primary">Добавить пункт</div>
                {
                    addItemFormVisible ?
                        <ItemForm formSubmit={this.onItemSubmit}/>
                        : null
                }
            </div>
        )
    }
}