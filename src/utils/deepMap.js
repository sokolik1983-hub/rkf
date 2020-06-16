const _deepMap = (o, f) => {
    if (o === null || typeof(o) !== 'object') return f(o);
    let x = Object.keys(o);
    if (!x.length) return f(o);
    x.forEach(k => {
        o[k] = _deepMap(o[k], f);
    });
    return o;
}

const deepMap = (o, f) => _deepMap({...o}, f);

export default deepMap

