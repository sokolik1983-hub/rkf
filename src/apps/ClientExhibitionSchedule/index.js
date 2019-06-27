import React, {PureComponent} from "react";
import {compose} from "redux";
import Card from 'components/Card';
import ScheduleDateList from './components/Date/List'
import {defaultReduxKey} from './config'
import {createDefaultInjectors} from 'utils/createInjectors'
import reducer from "./reducer";
import saga from "./saga";
import {connectClientExhibitionScheduleProxy} from './connectors'


class ClientExhibitionScheduleProxy extends PureComponent {

    componentDidMount() {
        const {exhibitionId, getSchedule} = this.props;
        getSchedule(exhibitionId)
    }

    render() {
        return (
            <Card lg>
                <h3 className="text-upper">Расписание выставки</h3>
                <ScheduleDateList
                    exhibitionId={this.props.exhibitionId}
                />
            </Card>
        );
    }
}


const {withReducer, withSaga} = createDefaultInjectors({defaultReduxKey, reducer, saga});

export default compose(
    withReducer,
    withSaga,
    connectClientExhibitionScheduleProxy)(ClientExhibitionScheduleProxy)