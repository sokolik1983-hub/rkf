import {varIsObject} from './index'


const formatLeadingZero = (number, leadingZero = true) => number < 10 && leadingZero ? '0' + number : number;

export const formatDateCommon = (datetime, leadingZero = true) => {
    const date = new Date(datetime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${formatLeadingZero(day, leadingZero)}.${formatLeadingZero(month, leadingZero)}.${year}`
};

export const getTimeFromDate = (datetime, leadingZeroToHours = true) => {
    const date = new Date(datetime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${formatLeadingZero(hours, leadingZeroToHours)}:${formatLeadingZero(minutes, leadingZeroToHours)}`
};

export const getDateTime = (datetime, leadingZeroToHours = true) => {
    const date = new Date(datetime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${formatLeadingZero(day, leadingZeroToHours)}/${formatLeadingZero(month, leadingZeroToHours)} ${formatLeadingZero(hours)}:${formatLeadingZero(minutes)}`
};


export const getStartDayOfWeek = (date) => {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
};

export const getCurrentWeekDays = () => {
    const dt = new Date();
    const monday = getStartDayOfWeek(dt);
    return [0, 1, 2, 3, 4, 5, 6].map(index => new Date(dt.setDate(monday.getDate() + index)));
};

export const getLocalizedMonth = (date, locale = 'ru') => {
    try {
        return date.toLocaleString(locale, {
            month: 'long',
            day: 'numeric'
        }).split(' ')[1];
    } catch (e) {
        return e
    }
};


export const months = {
    "0": 'январь',
    "1": 'февраль',
    "2": 'март',
    "3": 'апрель',
    "4": 'май',
    "5": 'инюнь',
    "6": 'июль',
    "7": 'август',
    "8": 'сентябрь',
    "9": 'октябрь',
    "10": 'ноябрь',
    "11": 'декабрь',
};

export const weekDays = {
    "0": 'Воскресенье',
    "1": 'Понедельник',
    "2": 'Вторник',
    "3": 'Среда',
    "4": 'Четверг',
    "5": 'Пятница',
    "6": 'Суббота',
};


export const transformDate = (date) => {
    if (
        varIsObject(date) &&
        date.day &&
        date.month &&
        date.year) {
        return new Date(`${date.month}.${date.day}.${date.year}`);
    }
    const dateObj = new Date(date);
    return {
        day: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear()
    }
};