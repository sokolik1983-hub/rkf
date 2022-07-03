export function linkForUserType(userType, alias) {
    switch (userType) {
        case 0:
            if (alias === 'rkf-online') {
                return `/club/${alias}`;
            } else {
                return `/${alias}`;
            }
        case 1:
            return `/user/${alias}`;
        case 3:
            if(alias !== 'rkf') {
                return `/club/${alias}`
            } else {
                return '/rkf';
            }
        case 4:
            return `/kennel/${alias}`;
        case 5:
            return `/${alias}`;
        case 7:
            return `/nbc/${alias}`;
        default:
            break;
    }
}