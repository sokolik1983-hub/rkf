import React, {PureComponent} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ScheduleDayItem from './index'
import ScheduleItemForm from "apps/ClientExhibitionSchedule/components/ItemForm";
import Button from 'components/Button'

import {
    addDayItem,
    updateDayItem,
    deleteDayItem,
} from 'apps/ClientExhibitionSchedule/actions'
import {defaultReduxKey} from "../../config";


class ScheduleDayItems extends PureComponent {
    static defaultProps = {
        items: []
    };

    state = {
        formVisible: false,
        editItemId: null,
        editItem: null,
    };

    toggleForm = () => this.setState(prevState => ({formVisible: !prevState.formVisible}));

    onItemSubmit = (values) => {
        const {day, addDayItem} = this.props;
        addDayItem({day_id: day, ...values})
    };

    onItemUpdate = (values) => {
        const {id} = values;
        const {updateDayItem} = this.props;
        updateDayItem(id, {...values})
    };

    editItem = itemId => {
        const {dayItems} = this.props;
        this.setState({editItemId: itemId, editItem: dayItems[itemId]})
    };
    onItemDelete = (id) => {
        const {deleteDayItem} = this.props;
        console.log('onItemDelete', id)
        deleteDayItem(id)
    };

    render() {
        const {items, loading} = this.props;
        return (
            <div className="day-items">
                {
                    items.length > 0 ?
                        items.map(item =>
                            this.state.editItemId === item ?
                                <ScheduleItemForm
                                    key={"form" + item}
                                    formInitials={this.state.editItem}
                                    loading={loading}
                                    formSubmit={this.onItemUpdate}
                                />
                                :
                                <div key={item} className="flex-row">
                                    <ScheduleDayItem itemId={item}/>
                                    <Button
                                        className="btn-secondary"
                                        onClick={() => this.editItem(item)}>
                                        изменить
                                    </Button>
                                    <Button
                                        className="btn-secondary"
                                        onClick={() => this.onItemDelete(item)}>
                                        удалить
                                    </Button>
                                </div>
                        )
                        : null
                }
                {
                    this.state.formVisible ?
                        <ScheduleItemForm
                            loading={loading}
                            formSubmit={this.onItemSubmit}
                        />
                        : null
                }
                <div className="day-items__controls">
                    <Button
                        style={{color: '#3366FF'}}
                        onClick={this.toggleForm}
                        className="btn btn-simple"
                    >{this.state.formVisible ? 'Скрыть' : '+ Добавить пункт'}</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state[defaultReduxKey].loading,
    dayItems: state[defaultReduxKey].items
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        addDayItem,
        updateDayItem,
        deleteDayItem,
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDayItems)