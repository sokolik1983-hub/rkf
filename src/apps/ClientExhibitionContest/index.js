import React, {PureComponent} from "react";
import {compose} from "redux";
import Card from 'components/Card';
import ContestDateList from './components/Date/List'
import {defaultReduxKey} from './config'
import {createDefaultInjectors} from 'utils/createInjectors'
import reducer from "./reducer";
import saga from "./saga";
import {connectClientExhibitionContestProxy} from './connectors'


class ClientExhibitionContestProxy extends PureComponent {

    componentDidMount() {
        const {exhibitionId, getContest} = this.props;
        getContest(exhibitionId)
    }

    render() {
        return (
            <Card lg>
                <h3 className="text-upper">Расписание конкурсов</h3>
                <ContestDateList
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
    connectClientExhibitionContestProxy)(ClientExhibitionContestProxy)