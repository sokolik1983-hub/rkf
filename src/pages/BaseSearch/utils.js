const parseLocationSearch = (url) => {
    let result = []
    if (url.indexOf('?') === 0) { 
        url = url.substr(1)
    }
    url.split('&').forEach((item) => {
        result.push(item.split('='))
    })
    return result
};

export {
    parseLocationSearch,
}