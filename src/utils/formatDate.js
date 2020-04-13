const formatDate = (dateArg, locale = 'ru') => {
    let d = new Date(dateArg),
        dd = d.getDate(),
        mm = d.getMonth() + 1,
        yyyy = d.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    if (!dateArg) return null;
    if (locale === 'en') return yyyy + '-' + mm + '-' + dd;
    if (locale === 'ru') return dd + '.' + mm + '.' + yyyy;
};

export default formatDate;