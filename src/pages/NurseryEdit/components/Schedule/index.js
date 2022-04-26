import React from 'react';
import { connect, FieldArray } from 'formik';
import Card from '../../../../components/Card';
import { FormField, FormGroup } from '../../../../components/Form';
import SubmitButton from '../../../../components/Form/SubmitButton';
import {days} from '../../config';

import './styles.scss';


const Schedule = ({ work_time }) => {

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

    return <Card className="Nursery-Schedule">
        <h3>График работы</h3>
        <FieldArray
            name="work_time"
            render={arrayHelpers => (
                <div>
                    <ul className="Nursery-Schedule__days">
                        {days.map(day => (
                            <li className="Nursery-Schedule__days-item" key={day.id}>
                                <button
                                    type="button"
                                    className={`Nursery-Schedule__days-btn${work_time.find(i => i.week_day_id === day.id) ? " _active" : ""}`}
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
                                <span className="Nursery-Schedule__days-form-day">
                                    {days.find(d => d.id === day.week_day_id).fullName}
                                </span>
                                <FormField
                                    label="Время работы с"
                                    name={`work_time[${index}].time_from`}
                                    type="time"
                                />
                                <FormField
                                    label="до"
                                    name={`work_time[${index}].time_to`}
                                    type="time"
                                />
                            </FormGroup>
                        ))}
                </div>
            )}
        />
        <SubmitButton>Сохранить</SubmitButton>
    </Card>
};

export default connect(Schedule);