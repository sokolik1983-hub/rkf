import React, { useState } from "react";
import { connect, FieldArray } from "formik";
import { FormField, FormGroup } from "components/Form";
import Button from "components/Button";
import Card from "components/Card";
import "./styles.scss";

const Schedule = ({ work_time }) => {
    const days = [{
        id: 1,
        name: 'Пн'
    },
    {
        id: 2,
        name: 'Вт'
    },
    {
        id: 3,
        name: 'Ср'
    },
    {
        id: 4,
        name: 'Чт'
    },
    {
        id: 5,
        name: 'Пт'
    },
    {
        id: 6,
        name: 'Сб'
    },
    {
        id: 7,
        name: 'Вс'
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

    return <Card className="Schedule">
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
                                <div className="Schedule__day-name">{days.find(d => d.id === day.week_day_id).name}</div>
                                <FormField
                                    label={'Время работы с'}
                                    name={`work_time[${index}].time_from`}
                                    type="time"
                                />
                                <FormField
                                    label={'Время работы до'}
                                    name={`work_time[${index}].time_to`}
                                    type="time"
                                />
                                <Button className="btn Schedule__button-delete" onClick={() => arrayHelpers.remove(index)}>Удалить</Button>
                            </FormGroup>
                        ))}
                </div>
            )}
        />
    </Card>
};

export default connect(Schedule);