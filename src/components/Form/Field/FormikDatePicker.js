import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import { connect, getIn } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

function FormikDatePicker({ name, formik, disabled, readOnly, dateFormat = 'dd.MM.yyyy', placeholderText = 'дд.мм.гггг' }) {
    const value = getIn(formik.values, name);
    const onChange = date => formik.setFieldValue(name, date);

    return <DatePicker
        selected={value && new Date(value)}
        onChange={date => onChange(date)}
        placeholderText={placeholderText}
        className={'FormInput__input'}
        dateFormat={dateFormat}
        disabled={!!disabled}
        readOnly={!!readOnly}
        showYearDropdown
        locale='ru'
        required
    />
};

export default connect(FormikDatePicker);