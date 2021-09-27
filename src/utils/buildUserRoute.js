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
        || pathname === '/auth/registration';


    if (exceptionUrl) {
        return alias ? alias ? !exceptionUrl : pathname : null;
    } else if (pathname.search('kennel') === 1 || pathname.search('user') === 1 || pathname.search('club') === 1) {
        return pathname.split('/')[2];
    } else {
        return pathname.split('/')[1];
    }

}
export function buildUserRoute(userType) {
    switch (userType) {
        case 1:
            console.log('Route user')
            break;
        case 3:
            console.log('Route club')
            break;
    case 4:
        console.log('Route Питомник')
        break;
    case 5:
        console.log('Route Федерация')
        break;

    }
}


// export default function buildUserRoute(alias, userType) {
//     console.log("userType", userType)
//     switch (userType) {
//         case 1:
//             console.log('user')
//             break;
//         case 3:
//             console.log('club')
//             break;
//     case 4:
//         console.log('Питомник')
//         break;
//     case 5:
//         console.log('Федерация')
//         break;
//
//     }
// }
//
// 'User' :   user_type === 1
// 'Клуб': user_type === 3
// 'Питомник' : user_type === 4
// 'Федерация':  user_type === 5

