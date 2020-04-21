const removeNulls = o => {
    Object.keys(o).forEach(k => {
        if (o[k] === null) o[k] = '';
        if (typeof(o[k]) === 'object') removeNulls(o[k]);
    });
    return o;
}

export default removeNulls
