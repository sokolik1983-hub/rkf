import React from "react";

export default function buildUserRoute(alias, userType) {
    console.log("userType", userType)
    switch (userType) {
        case 1:
            console.log('user')
            break;
        case 3:
            console.log('club')
            break;
    case 4:
        console.log('Питомник')
        break;
    case 5:
        console.log('Федерация')
        break;

    }
}
//
// 'User' :   user_type === 1
// 'Клуб': user_type === 3
// 'Питомник' : user_type === 4
// 'Федерация':  user_type === 5

