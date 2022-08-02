export function checkAliasUrl(pathname) {

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
        return false;
    } else if (pathname.search('kennel')
            || pathname.search('user')
            || pathname.search('club')
            || pathname.search('nbc')) {
        return pathname.split('/')[2];
    } else {
        return pathname.split('/')[1];
    }
}
