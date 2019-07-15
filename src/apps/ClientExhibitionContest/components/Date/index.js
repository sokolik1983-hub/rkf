import React, {useState} from 'react'
import {formatDateWithLocaleString, transformDate} from "utils/datetime";
import DateEvents from "../Event/List";
import {connectContestDate} from 'apps/ClientExhibitionContest/connectors'
import {scheduleContestDateForm} from "../../config";
import RenderFields from "./RenderFields";
import {FormFormikEnhanced} from "components/Form";


function ContestDate({dayId, day, index, updateDateSuccess}) {
    const [formVisible, setFormVisibility] = useState(false);
    const date = transformDate(day);
    const transformValues = (values) => {
        const {date} = values;
        return {id: day.id, ...transformDate(date)}
    };

    const onUpdate = values => {
        updateDateSuccess(values.id, values)
    };

    return (
        <div id={'day' + dayId} className="day">
            <div className="day__date">
                <div className="day__date">
                    <span onClick={() => setFormVisibility(!formVisible)} className="day__span">{index + 1} день</span>
                    <br/>
                    {formatDateWithLocaleString(date)}
                </div>
            </div>
            {
                formVisible ?
                    <FormFormikEnhanced
                        onSuccess={onUpdate}
                        {...scheduleContestDateForm}
                        formInitials={date}
                        transformValues={transformValues}
                        isUpdate
                    >
                        <RenderFields
                            fields={scheduleContestDateForm.fields}
                        />
                    </FormFormikEnhanced>
                    : null
            }
            <DateEvents day={dayId} items={day.items}/>
        </div>
    )
}

export default connectContestDate(ContestDate)