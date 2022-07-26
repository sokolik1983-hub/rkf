import React from 'react';
import { connect, FieldArray } from 'formik';
import Card from '../../../../components/Card';
import { FormField, FormGroup } from '../../../../components/Form';
import SubmitButton from '../../../../components/Form/SubmitButton';
import {days} from '../../config';

import './styles.scss';

const Schedule = ({ work_time }) => {

    const handleDayClick = (id, arrayHelpers) => {
        let index = work_time.findIndex(item => item.week_day_id === id);
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
    };

    return <Card className="nursery-schedule">
        <h3>График работы</h3>
        <FieldArray
            name="work_time"
            render={arrayHelpers => (
                <div>
                    <ul className="nursery-schedule__days">
                        {days.map(day => (
                            <li className="nursery-schedule__days-item" key={day.id}>
                                <button
                                    type="button"
                                    className={`nursery-schedule__days-btn${work_time.find(item => item.week_day_id === day.id) ? " _active" : ""}`}
                                    onClick={() => handleDayClick(day.id, arrayHelpers)}>
                                    {day.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {work_time &&
                        work_time.sort((a, b) => a.week_day_id - b.week_day_id)
                        .map((day, index) => (
                            <FormGroup inline key={index}>
                                <span className="nursery-schedule__days-form-day">
                                    {days.find(item => item.id === day.week_day_id).fullName}
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