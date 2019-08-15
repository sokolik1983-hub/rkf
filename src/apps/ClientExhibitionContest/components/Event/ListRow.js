import React, {PureComponent} from "react";
import Button from "components/Button";
import {FormFormikEnhanced} from "components/Form";
import {BtnDelete, BtnEdit} from "components/Svg";
import ContestEvent from './index'
import RenderFields from "./RederFields";
import {scheduleContestEventForm} from "apps/ClientExhibitionContest/config";

import {connectContestEditableEvent} from 'apps/ClientExhibitionContest/connectors'
 class ContestEventEditable extends PureComponent {
    state = {
        formVisible: false,
    };

    hideForm = () => this.setState({formVisible: false});
    showFrom = () => this.setState({formVisible: true});

    updateEvent = (data) => {
        const {id} = data;
        const {updateContestEventSuccess} = this.props;
        updateContestEventSuccess(id, {...data});
        this.hideForm()
    };

    deleteEvent = () => {
        const {deleteContestEvent, item, day} = this.props;
        deleteContestEvent(item.id, day)
    };

    render() {
        const {item} = this.props;
        return this.state.formVisible ?
            (
                <FormFormikEnhanced
                    onSuccess={this.updateEvent}
                    {...scheduleContestEventForm}
                    formInitials={item}
                    isUpdate
                >
                    <RenderFields
                        fields={scheduleContestEventForm.fields}
                        isUpdate
                    />
                </FormFormikEnhanced>
            )
            :
            (
                <div className="flex-row">

                    <ContestEvent {...item}/>

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

export default connectContestEditableEvent(ContestEventEditable)