import React, {PureComponent} from "react";
import ItemRow from "./ListRow";
import {FormFormikEnhanced} from "components/Form";
import {scheduleContestEventForm} from "apps/ClientExhibitionContest/config";
import RenderFields from "./RederFields";
import Button from "components/Button";
import {connectContestEventsList} from 'apps/ClientExhibitionContest/connectors'

class ContestDateEvents extends PureComponent {
    static defaultProps = {
        items: []
    };

    state = {
        formVisible: false,
    };

    toggleForm = () => this.setState(prevState => ({formVisible: !prevState.formVisible}));

    transformValues = (values) => ({day_id: this.props.day, ...values});

    createItem = (data) => {
        const {addContestEventSuccess, day} = this.props;
        addContestEventSuccess({day_id: day, ...data});
        this.setState({formVisible: false})
    };

    render() {
        const {items, day} = this.props;
        return (
            <div className="day-items">
                {
                    items.length > 0 ?
                        items.map(item =>
                            <ItemRow
                                day={day}
                                itemId={item}
                                key={item}
                            />
                        )
                        : null
                }
                {
                    this.state.formVisible ?
                        // Form for creating item
                        <FormFormikEnhanced
                            className="ContestEvent__form"
                            onSuccess={this.createItem}
                            transformValues={this.transformValues}
                            {...scheduleContestEventForm}
                        >
                            <RenderFields
                                fields={scheduleContestEventForm.fields}
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

export default connectContestEventsList(ContestDateEvents)