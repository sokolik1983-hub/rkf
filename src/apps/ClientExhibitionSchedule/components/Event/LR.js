import React, {useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Button from 'components/Button'
import {FormFormikEnhanced} from 'components/Form'
import {BtnDelete, BtnEdit} from 'components/Svg'
import ScheduleEvent from './index'
import RenderFields from './RederFields'
import {scheduleScheduleEventForm} from 'apps/ClientExhibitionSchedule/config'
import {
    updateScheduleEventSuccess,
    deleteScheduleEvent
} from 'apps/ClientExhibitionSchedule/actions'

export default function ScheduleEventEditable  ({id}) {
    const dispatch = useDispatch();

    const item = useSelector(state => state.items.find(item => item.id === id))

    const [isFormVisible, setIsFormVisible] = useState(false);

    const updateEvent = useCallback(data => {
        const {id} = data
        dispatch(updateScheduleEventSuccess(id, {...data}))
        setIsFormVisible(false)
    }, [])

    const deleteEvent = useCallback(() => {
        dispatch(deleteScheduleEvent(id))
    }, [id])

    if (isFormVisible) {
        return (
            <FormFormikEnhanced
                onSuccess={updateEvent}
                {...scheduleScheduleEventForm}
                formInitials={item}
                isUpdate
            >
                <RenderFields fields={scheduleScheduleEventForm.fields} isUpdate/>
            </FormFormikEnhanced>
        )
    }

    return (
        <div className="flex-row">
            <ScheduleEvent {...item} />
            <Button
                style={{marginLeft: 'auto'}}
                className="btn-z"
                onClick={() => setIsFormVisible(true)}
                leftIcon={<BtnEdit/>}
            >
                Изменить
            </Button>
            <Button className="btn-z" onClick={deleteEvent} leftIcon={<BtnDelete/>}>
                Удалить
            </Button>
        </div>
    )
}