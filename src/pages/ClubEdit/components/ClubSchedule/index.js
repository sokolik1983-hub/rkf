import React, {useEffect, useState} from 'react';
import {Request} from '../../../../utils/request';
import {connectClubScheduleForm} from '../../connectors';
import {Form, FormField, FormGroup} from '../../../../components/Form';

import './style.scss';


const ClubSchedule = ({bindSubmitForm, work_time, club_id}) => {
    const [days, setDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        (() => Request({ url: '/api/clubs/WorkTime/list' },
            data => setDays(data)
        ))();
    }, []);

    useEffect(() => {
        if (days.length) {
            let values = {};

            days.forEach(day => {
                const dayObject = work_time.find(item => item.week_day_id === day.id);

                values = {
                    ...values,
                    [`time_from_${day.id}`]: dayObject ? dayObject.time_from.slice(0, 5) : '',
                    [`time_to_${day.id}`]: dayObject ? dayObject.time_to.slice(0, 5) : ''
                };
            });

            setInitialValues(values);
        }

        if (work_time.length) {
            setSelectedDays(work_time.reduce((acc, curr) => [...acc, curr.week_day_id], []));
        }
    }, [work_time, days]);

    const handleDayClick = id => {
        let newSelectedDays;

        if (selectedDays.includes(id)) {
            newSelectedDays = selectedDays.filter(day => day !== id);
        } else {
            newSelectedDays = [...selectedDays, id];
        }

        setSelectedDays(newSelectedDays.sort());
    };

    const handleValidate = value => {
        let error;
        if (!value) {
            error = 'Поле не может быть пустым';
        }
        return error;
    };

    const transformValues = values => {
        let work_time = [];

        Object.keys(values).forEach(key => {
            if (values[key]) {
                const id = +key.slice(-1);

                if (selectedDays.includes(id)) {
                    let dayObject = work_time.find(item => item.week_day_id === id);

                    if (dayObject) {
                        dayObject[key.slice(0, key.length - 2)] = values[key];
                    } else {
                        dayObject = {
                            week_day_id: id,
                            [key.slice(0, key.length - 2)]: values[key]
                        };
                        work_time = [...work_time, dayObject];
                    }
                }
            }
        });

        return {club_id, work_time};
    };


    return (
        <div className="Schedule__card">
            <h3>График работы</h3>
            {!!days.length &&
                <ul className="club-schedule__controls">
                    {days.map(day => (
                        <li className="club-schedule__controls-item" key={day.id}>
                            <button
                                className={`club-schedule__controls-btn${selectedDays.includes(day.id) ? " _active" : ""}`}
                                onClick={() => handleDayClick(day.id)}>
                                {day.short_name}
                            </button>
                        </li>
                    ))}
                </ul>
            }
            {!!days.length && initialValues &&
                <Form
                    method="POST"
                    action="/api/clubs/WorkTime"
                    className="club-schedule__form"
                    initialValues={initialValues}
                    onSuccess={() => null}
                    transformValues={transformValues}
                    bindSubmitForm={bindSubmitForm}
                >
                    {selectedDays.map(id => (
                        <FormGroup inline key={id}>
                            <span className="club-schedule__form-day">
                                {days.find(day => day.id === id).name}
                            </span>
                            <FormField
                                name={`time_from_${id}`}
                                label="Время работы с"
                                type="time"
                                validate={handleValidate}
                            />
                            <FormField
                                name={`time_to_${id}`}
                                label="до"
                                type="time"
                                validate={handleValidate}
                            />
                        </FormGroup>
                    ))}
                </Form>
            }
        </div>
    )
};

export default connectClubScheduleForm(React.memo(ClubSchedule));