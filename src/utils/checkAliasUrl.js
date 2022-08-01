export function checkAliasUrl(pathname, alias) {

    const exceptionUrl =
        pathname === ''
        || pathname === '/'
        || pathname === '/about'
        || pathname === '/auth/login'
        || pathname === '/auth/registration'
        || pathname === '/auth/registration/activate'
        || pathname === '/base-search'
        || pathname === '/confirm-password-failed'
        || pathname === '/confirm-password-success'
        || pathname === '/exhibitions'
        || pathname === '/not-confirmed'
        || pathname === '/organizations'
        || pathname === '/recovery'
        || pathname === '/search'
        || pathname === '/specialists'
        || pathname === '/uploaded-documents';

    if (exceptionUrl) {
        return alias && !exceptionUrl ? pathname : null;
    } else if (pathname.search('kennel') === 1 || pathname.search('user') === 1 || pathname.search('club') === 1 || pathname.search('nbc')) {
        return pathname.split('/')[2];
    } else {
        return pathname.split('/')[1];
    }
}