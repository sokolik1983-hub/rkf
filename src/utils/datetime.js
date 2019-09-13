import { varIsObject } from './index';

export const capitalizeFirstLetter = str =>
    str.charAt(0).toUpperCase() + str.substring(1);
const formatLeadingZero = (number, leadingZero = true) =>
    number < 10 && leadingZero ? '0' + number : number;

export const formatDateCommon = (datetime, leadingZero = true) => {
    const date = new Date(datetime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${formatLeadingZero(day, leadingZero)}.${formatLeadingZero(
        month,
        leadingZero
    )}.${year}`;
};

export const getTimeFromDate = (datetime, leadingZeroToHours = true) => {
    const date = new Date(datetime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${formatLeadingZero(hours, leadingZeroToHours)}:${formatLeadingZero(
        minutes,
        leadingZeroToHours
    )}`;
};

export const getDateTime = (datetime, leadingZeroToHours = true) => {
    const date = new Date(datetime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${formatLeadingZero(day, leadingZeroToHours)}/${formatLeadingZero(
        month,
        leadingZeroToHours
    )} ${formatLeadingZero(hours)}:${formatLeadingZero(minutes)}`;
};

export const getStartDayOfWeek = date => {
    const diff =
        date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
};

export const getCurrentWeekDays = () => {
    const dt = new Date();
    const monday = getStartDayOfWeek(dt);
    return [0, 1, 2, 3, 4, 5, 6].map(
        index => new Date(dt.setDate(monday.getDate() + index))
    );
};

export const getLocalizedMonth = (date, locale = 'ru') => {
    try {
        return date
            .toLocaleString(locale, {
                month: 'long',
                day: 'numeric'
            })
            .split(' ')[1];
    } catch (e) {
        return e;
    }
};

export const getLocalizedWeekDay = (date, locale = 'ru') => {
    try {
        return date.toLocaleString(locale, {
            weekday: 'long'
        });
    } catch (e) {
        return e;
    }
};

export const formatDateWithLocaleString = (date, locale = 'ru') => {
    const day = date.getDate();
    const month = getLocalizedMonth(date);
    const weekDay = getLocalizedWeekDay(date);
    return `${weekDay}, ${day} ${month}`;
};

export const formatDateTime = datetime => {
    const date = new Date(datetime);
    return `${formatDateWithLocaleStringFull(date)} в ${formatLeadingZero(
        date.getHours()
    )}:${formatLeadingZero(date.getMinutes())}`;
};

export const formatDateWithLocaleStringFull = (date, locale = 'ru') => {
    const day = date.getDate();
    const month = getLocalizedMonth(date);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

export const months = {
    '0': 'январь',
    '1': 'февраль',
    '2': 'март',
    '3': 'апрель',
    '4': 'май',
    '5': 'инюнь',
    '6': 'июль',
    '7': 'август',
    '8': 'сентябрь',
    '9': 'октябрь',
    '10': 'ноябрь',
    '11': 'декабрь'
};

export const weekDays = {
    '0': 'Воскресенье',
    '1': 'Понедельник',
    '2': 'Вторник',
    '3': 'Среда',
    '4': 'Четверг',
    '5': 'Пятница',
    '6': 'Суббота'
};

export const transformDate = date => {
    if (varIsObject(date)) {
        //TODO Refactor this
        if (date.day === 0 || date.month === 0 || date.year === 0) {
            return new Date('01-01-1970');
        }
        //return new Date(`${date.month}.${date.day}.${date.year}`);
        return new Date(`${date.year}-${date.month}-${date.day}`);
    }
    const dateObj = new Date(date);
    return {
        day: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear()
    };
};

export const timeSecondsCutter = time => {
    const timeSplit = time.split(':');
    return timeSplit.length > 2 ? timeSplit[0] + ':' + timeSplit[1] : time;
};

export const formatDateToString = date => {
    return `${date.getFullYear()}-${formatLeadingZero(
        date.getMonth() + 1
    )}-${formatLeadingZero(date.getDate())}`;
};

export const getEndOfWeek = date => {
    const dateClone = new Date(date.getTime());
    const lastDay = dateClone.getDate() - (dateClone.getDay() - 1) + 7;
    return new Date(dateClone.setDate(lastDay));
};

export const getEndOfMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0);
};

export const getEndOfYear = date => new Date(date.getFullYear(), 11, 31);
