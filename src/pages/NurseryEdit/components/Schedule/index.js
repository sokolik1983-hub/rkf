import React from 'react';
import { connect, FieldArray } from 'formik';
import { FormField, FormGroup } from '../../../../components/Form';
import SubmitButton from '../../../../components/Form/SubmitButton';

import './styles.scss';


const Schedule = ({ work_time }) => {
    const days = [{
        id: 1,
        name: 'Пн',
        fullName: 'Понедельник'
    },
    {
        id: 2,
        name: 'Вт',
        fullName: 'Вторник'
    },
    {
        id: 3,
        name: 'Ср',
        fullName: 'Среда'
    },
    {
        id: 4,
        name: 'Чт',
        fullName: 'Четверг'
    },
    {
        id: 5,
        name: 'Пт',
        fullName: 'Пятница'
    },
    {
        id: 6,
        name: 'Сб',
        fullName: 'Суббота'
    },
    {
        id: 7,
        name: 'Вс',
        fullName: 'Воскресенье'
    }];

    const handleDayClick = (id, arrayHelpers) => {
        let index = work_time.findIndex(i => i.week_day_id === id);
        if (index !== -1) {
            arrayHelpers.remove(index);
        } else {
            arrayHelpers.push({
                id: null,
                week_day_id: id,
                time_from: '10:00:00',
                time_to: '18:00:00'
            });
        }
    }

    return <div className="Schedule">
        <h3>График работы</h3>
        <FieldArray
            name="work_time"
            render={arrayHelpers => (
                <div>
                    <ul className="Schedule__days">
                        {days.map(day => (
                            <li className="Schedule__days-item" key={day.id}>
                                <button
                                    type="button"
                                    className={`Schedule__days-btn${work_time.find(i => i.week_day_id === day.id) ? ' _active' : ''}`}
                                    onClick={() => handleDayClick(day.id, arrayHelpers)}>
                                    {day.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {work_time
                        .sort((a, b) => a.week_day_id - b.week_day_id)
                        .map((day, index) => (
                            <FormGroup inline key={index}>
                                <div className="Schedule__day-name">{days.find(d => d.id === day.week_day_id).fullName}</div>
                                <FormField
                                    label={'Время работы с'}
                                    name={`work_time[${index}].time_from`}
                                    type="time"
                                />
                                <FormField
                                    label={'до'}
                                    name={`work_time[${index}].time_to`}
                                    type="time"
                                />
                            </FormGroup>
                        ))}
                </div>
            )}
        />
        <SubmitButton>Сохранить</SubmitButton>
    </div>
};

export default connect(Schedule);