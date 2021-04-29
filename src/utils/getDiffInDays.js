export const getDiffInDays = (targetDay) => {

    //format date from 'dd.mm.yy' to [yyyy, mm, dd]
    let targetDayArr = targetDay.split('.').reverse();

    //format year from '21' to '2021'
    targetDayArr[0] = String(+targetDayArr[0] + 2000);

    //get date in 'ms'
    let targetDate = new Date(targetDayArr).getTime();
    let currentDate = new Date().getTime();

    //return diff in days
    return Math.round((currentDate - targetDate) / 86400000);
};

export const DAYS_BEFORE_ARCHIVING = 60;
