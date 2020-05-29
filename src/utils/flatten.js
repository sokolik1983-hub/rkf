import moment from "moment";

const flatten = ob => {
    let toReturn = {};
    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null && !(ob[i] instanceof File) && !(ob[i] instanceof Date)) {
            let flatObject = flatten(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                let si = isNaN(i) ? i : `[${i}]`;
                let sx = x[0] !== '[' ? `.${x}` : x;
                if (!isNaN(x)) {sx = `[${x}]`};
                toReturn[`${si}${sx}`] = flatObject[x];
                console.log(toReturn);
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
