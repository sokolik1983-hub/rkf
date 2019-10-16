import React, {PureComponent} from 'react'
import {transformDate} from "utils/datetime";
import Button from 'components/Button'
import {BtnPus} from 'components/Svg'
import {FormFormikEnhanced} from "components/Form";
import RenderFields from './RenderFields'
import {scheduleScheduleDateForm} from "apps/ClientExhibitionSchedule/config";
import ScheduleDate from "./index";
import {connectScheduleDateList} from "apps/ClientExhibitionSchedule/connectors";

class ScheduleDateList extends PureComponent {
    state = {
        formVisible: false
    };

    toggleScheduleDateForm = () => this.setState(prevState => ({formVisible: !prevState.formVisible}));

    transformValues = ({date}) => {
        const {exhibitionId} = this.props;
        return {exhibition_id: parseInt(exhibitionId, 10), ...transformDate(date)};
    };

    onAddSuccess = (data) => this.props.addDateSuccess(data);

    render() {
        const {dateIds} = this.props;

        return (
            <div className="schedule-days">
                {!!dateIds.length && dateIds.map((id, index) =>
                    <ScheduleDate index={index} key={id} dayId={id}/>
                )}
                {this.state.formVisible &&
                    <FormFormikEnhanced
                        onSuccess={this.onAddSuccess}
                        transformValues={this.transformValues}
                        {...scheduleScheduleDateForm}
                    >
                        <RenderFields
                            fields={scheduleScheduleDateForm.fields}
                        />
                    </FormFormikEnhanced>
                }
                <div className="schedule-day__controls">
                    <Button
                        onClick={this.toggleScheduleDateForm}
                        className="btn btn-icon btn-simple"
                        leftIcon={<BtnPus/>}
                    >
                        {this.state.formVisible ? 'Cкрыть форму' : 'Добавить день'}
                    </Button>
                </div>
            </div>)
    }
}

export default connectScheduleDateList(ScheduleDateList)