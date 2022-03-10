import React from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import "moment/locale/ru";
import {MOMENT_LOCALE_DEFINITION} from "../../../appConfig";
import "./index.scss";

moment.updateLocale('ru', MOMENT_LOCALE_DEFINITION);

//https://material-ui-pickers.dev/api/DatePicker
//value, minDate, maxDate - должны быть строкой в формате "YYYY-MM-DD"
export const DateInput = (fieldRenderProps) => {
    const {id, name, className, label, maxDate, minDate, value, onChange, editable} = fieldRenderProps;

    const min = moment(minDate || '1900-01-01', 'YYYY-MM-DD');
    const max = moment(maxDate || '2100-01-01', 'YYYY-MM-DD');

    return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="ru">
            <DatePicker
                id={id}
                name={name}
                label={label}
                className={`date-input${className ? ' ' + className : ''}`}
                minDate={min}
                maxDate={max}
                value={value ? moment(value, 'YYYY-MM-DD') : null}
                onChange={date => onChange(moment(date).format('YYYY-MM-DD'))}
                animateYearScrolling
                autoOk
                format="DD.MM.YYYY"
                inputVariant="outlined"
                size="small"
                cancelLabel="Отмена"
                okLabel="Ок"
                invalidDateMessage="Неверный формат даты"
                invalidLabel="Неверная дата"
                minDateMessage={`Дата не может быть раньше ${moment(min, 'DD.MM.YYYY')}`}
                maxDateMessage={`Дата не может быть позже ${moment(max, 'DD.MM.YYYY')}`}
                disabled={editable}
            />
        </MuiPickersUtilsProvider>
    )
};