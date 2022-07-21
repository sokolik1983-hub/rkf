export function checkAliasUrl(pathname, alias) {

    const exceptionUrl =
        pathname === '/organizations'
        || pathname === '/exhibitions'
        || pathname === '/search'
        || pathname === '/base-search'
        || pathname === ''
        || pathname === '/'
        || pathname === '/about'
        || pathname === '/uploaded-documents'
        || pathname === '/auth/login'
        || pathname === '/auth/registration'
        || pathname === '/specialists';

    if (exceptionUrl) {
        return alias ? alias ? !exceptionUrl : pathname : null;
    } else if (pathname.search('kennel') === 1 || pathname.search('user') === 1 || pathname.search('club') === 1 || pathname.search('nbc')) {
        return pathname.split('/')[2];
    } else {
        return pathname.split('/')[1];
    }
}