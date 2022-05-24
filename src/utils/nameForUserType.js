export function nameForUserType(userType) {
    switch (userType) {
        case 0:
        case 1:
            return '';
        case 3:
            return 'Клуб';
        case 4:
            return 'Питомник';
        case 5:
            return 'Федерация';
        case 7:
            return 'НКП';
        default:
            break;
    }
}