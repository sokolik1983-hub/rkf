import moment from "moment";

const flatten = ob => {
    let toReturn = {};
    for (let i in ob) {

        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null && !(ob[i] instanceof File) && !(ob[i] instanceof Date) && !(Array.isArray(ob[i]) && ob[i][0] instanceof File)) {
            //пропускает файл и массив файлов
            let flatObject = flatten(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                let si = isNaN(i) ? i : `[${i}]`;
                let sx = x[0] !== '[' ? `.${x}` : x;
                if (!isNaN(x)) {sx = `[${x}]`};
                toReturn[`${si}${sx}`] = flatObject[x];
            }
        } else {
            if (ob[i] instanceof Date) {
                toReturn[i] = moment(ob[i]).format("YYYY-MM-DD");
            } else {
                toReturn[i] = ob[i];
            }
        }
    }
    return toReturn;
}

export default flatten;