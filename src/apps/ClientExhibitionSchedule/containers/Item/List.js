import React, {PureComponent} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Button from 'components/Button'
import {FormFormikEnhanced} from "components/Form";
import ItemRow from './ListRow'
import RenderFields from 'apps/ClientExhibitionSchedule/components/ItemForm/RederFields'

import {scheduleDayItemForm} from 'apps/ClientExhibitionSchedule/config'
import {getDayItems} from 'apps/ClientExhibitionSchedule/selectors'

import {
    addDayItemSuccess,
    deleteDayItem,
    updateDayItemSuccess
} from 'apps/ClientExhibitionSchedule/actions'


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

    transformValues = (values) => ({day_id: this.props.day, ...values});

    createItem = (values) => {
        addDayItemSuccess(values)
    };

    updateItem = (values) => {
        const {id} = values;
        const {updateDayItemSuccess} = this.props;
        updateDayItemSuccess(id, {...values})
    };

    editItem = itemId => {
        const {dayItems} = this.props;
        this.setState({editItemId: itemId, editItem: dayItems[itemId]})
    };

    deleteItem = (id) => {
        const {deleteDayItem} = this.props;
        deleteDayItem(id)
    };

    render() {
        const {items} = this.props;
        return (
            <div className="day-items">
                {
                    items.length > 0 ?
                        items.map(item =>
                            this.state.editItemId === item ?
                                // Form for Update item
                                <FormFormikEnhanced
                                    onSuccess={this.updateItem}
                                    {...scheduleDayItemForm}
                                    formInitials={this.state.editItem}
                                    isUpdate
                                >
                                    <RenderFields
                                        fields={scheduleDayItemForm.fields}
                                        isUpdate
                                    />
                                </FormFormikEnhanced>

                                :
                                <ItemRow
                                    key={item}
                                    item={item}
                                    onEdit={this.editItem}
                                    onDelete={this.deleteItem}
                                />
                        )
                        : null
                }
                {
                    this.state.formVisible ?
                        // Form for creating item
                        <FormFormikEnhanced
                            onSuccess={this.createItem}
                            transformValues={this.transformValues}
                            {...scheduleDayItemForm}
                        >
                            <RenderFields
                                fields={scheduleDayItemForm.fields}
                            />
                        </FormFormikEnhanced>
                        : null
                }
                <div className="day-items__controls">
                    <Button
                        style={{color: '#3366FF'}}
                        onClick={this.toggleForm}
                        className="btn btn-simple"
                    >
                        {this.state.formVisible ? 'Скрыть' : '+ Добавить пункт'}
                    </Button>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => bindActionCreators(
    {
        addDayItemSuccess,
        updateDayItemSuccess,
        deleteDayItem,
    }, dispatch);
export default connect(getDayItems, mapDispatchToProps)(ScheduleDayItems)