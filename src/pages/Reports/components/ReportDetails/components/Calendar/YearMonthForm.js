import React from "react";
import { MONTHS } from 'appConfig';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear - 30, 0);
const toMonth = new Date();

const YearMonthForm = ({ date, onChange }) => {
    const months = MONTHS;

    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i ++) {
        years.push(i);
    }

    const handleChange = function handleChange(e) {
        const { year, month } = e.target.form;
        onChange(new Date(year.value, month.value));
    };

    return (
        <form className="DayPicker-Caption">
            <select name="month" onChange={handleChange} value={date.getMonth()}>
                {months.map((month, i) => (
                    <option key={month} value={i}>
                        {month}
                    </option>
                ))}
            </select>
            <select name="year" onChange={handleChange} value={date.getFullYear()}>
                {years.map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default YearMonthForm;