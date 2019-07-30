import React, {useEffect} from "react";
import {compose} from "redux";
import Card from 'components/Card';
import ScheduleDateList from './components/Date/List'
import {defaultReduxKey} from './config'
import {createDefaultInjectors} from 'utils/createInjectors'
import reducer from "./reducer";
import saga from "./saga";
import {connectExhibitionScheduleProxy} from './connectors'


function ExhibitionScheduleProxy({exhibitionId = null, getSchedule}) {


    useEffect(() => {
        if (exhibitionId !== null) {
            getSchedule(exhibitionId)
        }
    }, [exhibitionId]);


    return (
        <Card lg>
            <h3 className="text-upper">Расписание выставки</h3>
            <ScheduleDateList
                exhibitionId={exhibitionId}
            />
        </Card>
    );

}


const {withReducer, withSaga} = createDefaultInjectors({defaultReduxKey, reducer, saga});

export default compose(
    withReducer,
    withSaga,
    connectExhibitionScheduleProxy)(ExhibitionScheduleProxy)