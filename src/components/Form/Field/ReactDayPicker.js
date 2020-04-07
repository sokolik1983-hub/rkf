import React, { useRef } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'components/WidgetCalendar/index.scss';
import { connect, getIn } from "formik";
import formatDate from 'utils/formatDate';
const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

function ReactDayPicker({ name, formik, disabled, readOnly }) {
    const value = getIn(formik.values, name);
    const ref = useRef();
    const onChange = date => {
        formik.setFieldValue(name, date);
    };

    return (
        <DayPickerInput
            value={value ? formatDate(value) : ''}
            inputProps={{
                className: 'FormInput__input',
                name: name || 'date',
                ref: ref,
                disabled: !!disabled,
                readOnly: !!readOnly,
                style: {
                    width: '100%',
                }
            }}
            dayPickerProps={{
                showOutsideDays: true,
                months: MONTHS,
                weekdaysShort: WEEKDAYS_SHORT,
                locale: 'ru',
                firstDayOfWeek: 1
            }}
            onDayChange={onChange}
            onBlur={formik.handleBlur}
            placeholder="ДД.ММ.ГГГГ"
        />
    )
}

export default connect(ReactDayPicker);
