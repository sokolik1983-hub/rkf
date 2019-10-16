import React, {PureComponent} from "react";
import Button from "components/Button";
import {FormFormikEnhanced} from "components/Form";
import {BtnDelete, BtnEdit} from "components/Svg";
import ScheduleEvent from './index'
import RenderFields from "./RederFields";
import {scheduleScheduleEventForm} from "apps/ClientExhibitionSchedule/config";
import {connectScheduleEditableEvent} from 'apps/ClientExhibitionSchedule/connectors'


 class ScheduleEventEditable extends PureComponent {
    state = {
        formVisible: false,
    };

    hideForm = () => this.setState({formVisible: false});
    showFrom = () => this.setState({formVisible: true});

    updateEvent = (data) => {
        const {id} = data;
        const {updateScheduleEventSuccess} = this.props;
        updateScheduleEventSuccess(id, {...data});
        this.hideForm()
    };

    deleteEvent = () => {
        const {deleteScheduleEvent, item, day} = this.props;
        deleteScheduleEvent(item.id, day);
    };

    render() {
        const {item} = this.props;
        return this.state.formVisible ?
            (
                <FormFormikEnhanced
                    onSuccess={this.updateEvent}
                    {...scheduleScheduleEventForm}
                    formInitials={item}
                    isUpdate
                >
                    <RenderFields
                        fields={scheduleScheduleEventForm.fields}
                        isUpdate
                    />
                </FormFormikEnhanced>
            )
            :
            (
                <div className="day__item flex-row">
                    <ScheduleEvent {...item}/>
                    <Button
                        style={{marginLeft: 'auto'}}
                        className="btn-z"
                        onClick={this.showFrom}
                        leftIcon={<BtnEdit/>}
                    >
                        Изменить
                    </Button>
                    <Button
                        className="btn-z"
                        onClick={this.deleteEvent}
                        leftIcon={<BtnDelete/>}
                    >
                        Удалить
                    </Button>
                </div>
            )
    }
}

export default connectScheduleEditableEvent(ScheduleEventEditable)