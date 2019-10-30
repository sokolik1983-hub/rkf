import React, { PureComponent } from 'react'
import { transformDate } from "utils/datetime";
import Button from 'components/Button'
import { BtnPus } from 'components/Svg'
import { FormFormikEnhanced } from "components/Form";
import RenderFields from './RenderFields'
import { scheduleContestDateForm } from "apps/ClientExhibitionContest/config";
import ContestDate from "./index";
import { connectContestDateList } from "apps/ClientExhibitionContest/connectors";

class ContestDateList extends PureComponent {
    state = {
        formVisible: false
    };

    onAddSuccess = (data) => this.props.addDateSuccess(data);

    transformValues = (values) => {
        const { exhibitionId } = this.props;
        const { date } = values;
        return { exhibition_id: parseInt(exhibitionId, 10), ...transformDate(date) }
    };
    toggleContestDateForm = () => this.setState(prevState => ({ formVisible: !prevState.formVisible }));

    handleDeleteContestDate = (id) => {
        this.props.deleteContestDate(id);
    }

    render() {
        const { dateIds } = this.props;
        return (
            <div className="schedule-days">
                {dateIds.map((id, index) =>
                    <ContestDate index={index} key={id} dayId={id} deleteContestDate={this.handleDeleteContestDate} />
                )}
                {this.state.formVisible &&
                    <FormFormikEnhanced
                        onSuccess={this.onAddSuccess}
                        transformValues={this.transformValues}
                        {...scheduleContestDateForm}
                    >
                        <RenderFields
                            fields={scheduleContestDateForm.fields}
                        />
                    </FormFormikEnhanced>
                }
                <div className="schedule-day__controls">
                    <Button
                        onClick={this.toggleContestDateForm}
                        className="btn btn-icon btn-simple"
                        leftIcon={<BtnPus />}
                    >
                        {this.state.formVisible ? 'Cкрыть форму' : 'Добавить день'}
                    </Button>
                </div>
            </div>)
    }
}

export default connectContestDateList(ContestDateList)