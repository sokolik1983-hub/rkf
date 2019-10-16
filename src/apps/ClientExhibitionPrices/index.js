import React, {Component} from "react";
import {compose} from "redux";
import Card from 'components/Card';
import {defaultReduxKey} from './config'
import ExhibitionPriceForm from './containers/ExhibitionPrice'
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";
import ExhibitionPriceTable from './components/List/Table'
import injectSaga from "utils/injectSaga";
import saga from "./saga";


class ClientExhibitionScheduleProxy extends Component {

    render() {
        const {match} = this.props;
        const exhibitionId = parseInt(match.params.id, 10)
        return (
            <>
                <Card lg>
                    <h3 className="text-upper">Цена за выставку</h3>
                    <ExhibitionPriceTable exhibitionId={exhibitionId}/>
                    <ExhibitionPriceForm exhibitionId={exhibitionId}/>
                </Card>
                {/*<Card lg>*/}
                {/*    <h3 className="text-upper">Цена за конкурсы</h3>*/}
                {/*    <ContestPriceForm/>*/}
                {/*</Card>*/}
            </>
        );
    }
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
const withSaga = injectSaga({key: defaultReduxKey, saga});


export default compose(
    withReducer,
    withSaga)(ClientExhibitionScheduleProxy)