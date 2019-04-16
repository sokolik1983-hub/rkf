const formatLeadingZero = (number, leadingZeroToHours = true) => number < 10 && leadingZeroToHours ? '0' + number : number;

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