import {WEEKDAYS} from "../appConfig";


export const isDevEnv = () => process.env.NODE_ENV !== 'production';

export const formatText = text => JSON.parse(
    JSON.stringify(text)
        .replace('/(<([^>]+)>)/ig', '')
        .replace(/\\r/g, '')
        .replace(/\\n/g, ' <br> ')
).replace(/([^"]https?:\/\/[^\s]+)/g, l => ` <a class="link" target="_blank" href="${l}">${l}</a>`);

export const formatWorkTime = workTime => {
    let newWorkTime = [];
    workTime.forEach(day => {
        const period = newWorkTime.find(item => item.time_from === day.time_from && item.time_to === day.time_to);

        if(!period) {
            newWorkTime = [
                ...newWorkTime,
                {
                    days: [WEEKDAYS.find(item => item.id === day.week_day_id).short_name],
                    time_from: day.time_from,
                    time_to: day.time_to
                }
            ];
        } else {
            period.days.push(WEEKDAYS.find(item => item.id === day.week_day_id).short_name);
        }
    });

    return newWorkTime;
};

export const setOverflow = (isOpen) => {
    if (window.innerWidth <= 990) {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    } else if (window.innerWidth > 990 && isOpen) {
        document.body.style.overflow = '';
    }
};

export const makeActionCreator = (type, ...argNames) => {
    return function (...args) {
        let action = {type};

        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });

        return action
    }
};

export const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
};

export const scrollSmoothTop = () => window.scrollTo({
    top: 0,
    behavior: "smooth"
});

export const varIsObject = (variable) => Object.prototype.toString.call(variable) === "[object Object]";

export const objectNotEmpty = (obj) => varIsObject(obj) && Object.keys(obj).length > 0;

export const parseCookies = () => {
    let cookies = {};
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(function (c) {
            let m = c.trim().match(/(\w+)=(.*)/);
            if (m !== undefined) {
                cookies[m[1]] = decodeURIComponent(m[2]);
            }
        });
    }
    return cookies;
};

export const getFormData = data => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return formData;
};

export const sortBy = (array, key) => {
    return array.sort(function (a, b) {
        const x = a[key];
        const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};

export const generateSize = size => ({
    minWidth: size,
    minHeight: size,
    maxWidth: size,
    maxHeight: size,
});

export const scrollSmoothBottom = () => window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
});

export const varIsArray = (variable) => Object.prototype.toString.call(variable) === "[object Array]";

export const getRandomInt = (min = 1, max = 100) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const getPropsBySchema = (obj, schema) => {
    const result = {};
    Object.keys(schema).forEach(key => result[key] = obj[key]);
    return result
};

export function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export const getIdFromMatch = match => match.params.id;
export const getIdFromRouterParams = props => getIdFromMatch(props.match);
export const getPathFromRouterParams = props => props.match.path;