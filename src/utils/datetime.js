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