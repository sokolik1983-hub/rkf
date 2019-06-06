import React, {PureComponent} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ScheduleDayItem from './index'
import ScheduleItemForm from "apps/ClientExhibitionSchedule/components/ItemForm";
import Button from 'components/Button'

import {
    addDayItem
} from 'apps/ClientExhibitionSchedule/actions'
import {defaultReduxKey} from "../../config";


class ScheduleDayItems extends PureComponent {
    static defaultProps = {
        items: []
    };

    state = {
        formVisible: false,
    };

    toggleForm = () => this.setState(prevState => ({formVisible: !prevState.formVisible}));

    onItemSubmit = (values) => {
        const {day, addDayItem} = this.props;
        addDayItem({day_id: day, ...values})
    };

    render() {
        const {items, loading} = this.props;
        return (
            <div className="day-items">
                {
                    items.length > 0 ?
                        items.map(item =>
                            <ScheduleDayItem key={item} itemId={item}/>
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
const mapStateToProps=state=>({
    loading: state[defaultReduxKey].loading
})

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        addDayItem,
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDayItems)