const formatDate = dateArg => {
    let d = new Date(dateArg),
        dd = d.getDate(),
        mm = d.getMonth() + 1,
        yyyy = d.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '.' + mm + '.' + yyyy;
};

export default formatDate;