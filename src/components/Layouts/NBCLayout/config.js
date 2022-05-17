import React from "react";

export const endpointGetNBCInfo = '/api/nationalbreedclub/full';

export const NBCNav = alias => [
    {
        id: 1,
        title: 'Мероприятия',
        to: `/exhibitions?Alias=${alias}`,
        exact: true,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99404 18.7406C9.60402 18.7406 9.28491 18.4215 9.28491 18.0315V13.6349C9.28491 13.2449 9.60402 12.9258 9.99404 12.9258C10.3841 12.9258 10.7032 13.2449 10.7032 13.6349V18.0315C10.7032 18.4333 10.3841 18.7406 9.99404 18.7406Z" fill="#8F989D"/>
            <path d="M13.2323 19.0003H6.76748C6.37746 19.0003 6.05835 18.6812 6.05835 18.2912C6.05835 17.9011 6.37746 17.582 6.76748 17.582H13.2323C13.6224 17.582 13.9415 17.9011 13.9415 18.2912C13.9415 18.6812 13.6224 19.0003 13.2323 19.0003Z" fill="#8F989D"/>
            <path d="M9.99408 14.3434C8.304 14.3434 6.89756 13.5161 6.03479 12.0151C4.58108 9.50952 3.76559 2.09915 3.73013 1.78004L3.6474 1H9.99408C10.3841 1 10.7032 1.31911 10.7032 1.70913C10.7032 2.09915 10.3841 2.41825 9.99408 2.41825H5.24294C5.55022 4.88838 6.30663 9.63953 7.26395 11.306C7.87852 12.3815 8.80039 12.9251 9.99408 12.9251C10.3841 12.9251 10.7032 13.2443 10.7032 13.6343C10.7032 14.0243 10.3841 14.3434 9.99408 14.3434Z" fill="#8F989D"/>
            <path d="M6.02298 11.3057C5.94025 11.3057 5.86934 11.2939 5.78661 11.2703C1 9.58017 1 3.26894 1 3.00893V2.2998H4.38017C4.77019 2.2998 5.0893 2.61891 5.0893 3.00893C5.0893 3.39895 4.78201 3.71806 4.39199 3.71806H2.45371C2.59554 5.2545 3.25739 8.87105 6.25936 9.92292C6.62574 10.0529 6.82666 10.4548 6.69665 10.833C6.59028 11.1284 6.31845 11.3057 6.02298 11.3057Z" fill="#8F989D"/>
            <path d="M9.9941 14.3434C9.60408 14.3434 9.28497 14.0243 9.28497 13.6343C9.28497 13.2443 9.60408 12.9251 9.9941 12.9251C11.1878 12.9251 12.1097 12.3815 12.7242 11.306C13.6934 9.63953 14.438 4.87656 14.7452 2.41825H9.9941C9.60408 2.41825 9.28497 2.09915 9.28497 1.70913C9.28497 1.31911 9.60408 1 9.9941 1H16.3408L16.2581 1.78004C16.2226 2.09915 15.4071 9.4977 13.9534 12.0151C13.0906 13.5161 11.6842 14.3434 9.9941 14.3434Z" fill="#8F989D"/>
            <path d="M13.9652 11.3057C13.6697 11.3057 13.3979 11.1284 13.2915 10.833C13.1615 10.4666 13.3506 10.0529 13.7288 9.92292C16.7308 8.85923 17.3927 5.2545 17.5345 3.71806H15.5962C15.2062 3.71806 14.8871 3.39895 14.8871 3.00893C14.8871 2.61891 15.2062 2.2998 15.5962 2.2998H18.9882V3.00893C18.9882 3.28076 18.9882 9.58017 14.2016 11.2703C14.1307 11.2939 14.0479 11.3057 13.9652 11.3057Z" fill="#8F989D"/>
        </svg>
    },
    {
        id: 2,
        title: 'Уведомления',
        to: `/nbc/${alias}/news-feed/`,
        exact: false,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.75049 9.70055C2.34549 9.70055 2.01549 9.38555 2.00049 8.98055C2.00049 8.80055 1.89549 4.70555 4.76049 2.36555C5.07549 2.09555 5.55549 2.15555 5.81049 2.47055C6.08049 2.78555 6.02049 3.26555 5.70549 3.52055C3.42549 5.39555 3.50049 8.90555 3.50049 8.93555C3.51549 9.35555 3.18549 9.70055 2.78049 9.70055C2.76549 9.70055 2.76549 9.70055 2.75049 9.70055Z" fill="#8F989D"/>
            <path d="M17.2855 9.70055C17.2705 9.70055 17.2705 9.70055 17.2555 9.70055C16.8505 9.70055 16.5205 9.35555 16.5355 8.93555C16.5355 8.90555 16.6105 5.39555 14.3305 3.52055C14.0155 3.25055 13.9705 2.78555 14.2255 2.47055C14.4805 2.15555 14.9605 2.09555 15.2755 2.36555C18.1255 4.70555 18.0355 8.81555 18.0355 8.98055C18.0205 9.38555 17.6905 9.70055 17.2855 9.70055Z" fill="#8F989D"/>
            <path d="M10.0255 4.975C9.60548 4.975 9.27548 4.645 9.27548 4.225V1.75C9.27548 1.33 9.60548 1 10.0255 1C10.4455 1 10.7755 1.33 10.7755 1.75V4.225C10.7755 4.645 10.4305 4.975 10.0255 4.975Z" fill="#8F989D"/>
            <path d="M17.0005 16.7356H3.03549V14.3956L3.26049 14.1706C4.29549 13.1356 4.85049 11.9506 4.85049 10.7656C4.85049 10.5406 4.83549 10.3006 4.83549 10.0756C4.79049 8.87559 4.71549 7.37559 5.84049 5.75559C6.86049 4.27059 8.30049 3.47559 10.0255 3.47559C11.7205 3.47559 13.2955 4.33059 14.2255 5.75559C15.3055 7.40559 15.2455 8.90559 15.2155 10.1056C15.2155 10.3306 15.2005 10.5406 15.2005 10.7656C15.2005 11.9656 15.7555 13.1356 16.7905 14.1856L17.0005 14.3956V16.7356ZM4.53549 15.2356H15.5005V15.0106C14.3155 13.7356 13.6855 12.2656 13.6855 10.7656C13.6855 10.5406 13.7005 10.3006 13.7005 10.0606C13.7455 8.92059 13.7755 7.84059 12.9655 6.59559C12.3055 5.57559 11.2105 4.97559 10.0255 4.97559C8.81049 4.97559 7.82049 5.51559 7.07049 6.59559C6.23049 7.79559 6.27549 8.87559 6.33549 10.0006C6.33549 10.2556 6.35049 10.5106 6.35049 10.7656C6.35049 12.2806 5.72049 13.7356 4.53549 15.0106V15.2356Z" fill="#8F989D"/>
            <path d="M10.0255 18.9993C8.48047 18.9993 7.22047 17.7393 7.22047 16.1943C7.22047 15.7743 7.55047 15.4443 7.97047 15.4443C8.39047 15.4443 8.72047 15.7743 8.72047 16.1943C8.72047 16.9143 9.30547 17.4993 10.0255 17.4993C10.7455 17.4993 11.3305 16.9143 11.3305 16.1943C11.3305 15.7743 11.6605 15.4443 12.0805 15.4443C12.5005 15.4443 12.8305 15.7743 12.8305 16.1943C12.8305 17.7393 11.5705 18.9993 10.0255 18.9993Z" fill="#8F989D"/>
        </svg>
    },
    {
        id: 4,
        title: 'Документы',
        disabled: true,
        to: `/nbc/${alias}/uploaded-documents/`,
        exact: false,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1666_818)">
                <path d="M15.7451 16.7308H6.19555C5.14368 16.7308 4.29272 15.8798 4.29272 14.828V2.90282C4.29272 1.85095 5.1555 1 6.19555 1H15.7451C16.797 1 17.6479 1.85095 17.6479 2.90282V14.8398C17.6479 15.8798 16.797 16.7308 15.7451 16.7308ZM6.19555 2.41825C5.92372 2.41825 5.71098 2.63099 5.71098 2.90282V14.8398C5.71098 15.1116 5.92372 15.3244 6.19555 15.3244H15.7451C16.017 15.3244 16.2297 15.1116 16.2297 14.8398V2.90282C16.2297 2.63099 16.017 2.41825 15.7451 2.41825H6.19555Z" fill="#8F989D"/>
                <path d="M13.4524 18.9999H3.90282C2.85095 18.9999 2 18.1372 2 17.0971V5.16015C2 4.10828 2.85095 3.25732 3.90282 3.25732H4.56468C4.95469 3.25732 5.2738 3.57643 5.2738 3.96645C5.2738 4.35647 4.95469 4.67558 4.56468 4.67558H3.90282C3.63099 4.67558 3.41825 4.90013 3.41825 5.16015V17.0853C3.41825 17.3571 3.63099 17.5699 3.90282 17.5699H13.4524C13.7242 17.5699 13.937 17.3571 13.937 17.0853V16.2816C13.937 15.8916 14.2561 15.5725 14.6461 15.5725C15.0361 15.5725 15.3552 15.8916 15.3552 16.2816V17.0853C15.3434 18.1372 14.4924 18.9999 13.4524 18.9999Z" fill="#8F989D"/>
                <path d="M13.9606 5.14823H7.8976C7.50758 5.14823 7.18848 4.82913 7.18848 4.43911C7.18848 4.04909 7.50758 3.72998 7.8976 3.72998H13.9725C14.3625 3.72998 14.6816 4.04909 14.6816 4.43911C14.6816 4.82913 14.3625 5.14823 13.9606 5.14823Z" fill="#8F989D"/>
                <path d="M13.9606 7.96122H7.8976C7.50758 7.96122 7.18848 7.64211 7.18848 7.2521C7.18848 6.86208 7.50758 6.54297 7.8976 6.54297H13.9725C14.3625 6.54297 14.6816 6.86208 14.6816 7.2521C14.6816 7.64211 14.3625 7.96122 13.9606 7.96122Z" fill="#8F989D"/>
                <path d="M10.9232 10.7742H7.8976C7.50758 10.7742 7.18848 10.4551 7.18848 10.0651C7.18848 9.67506 7.50758 9.35596 7.8976 9.35596H10.935C11.325 9.35596 11.6442 9.67506 11.6442 10.0651C11.6442 10.4551 11.325 10.7742 10.9232 10.7742Z" fill="#8F989D"/>
            </g>
            <defs>
                <clipPath id="clip0_1666_818">
                    <rect width="15.6481" height="18" fill="white" transform="translate(2 1)"/>
                </clipPath>
            </defs>
        </svg>
    },
    {
        id: 5,
        title: 'Фотогалерея',
        to: `/nbc/${alias}/gallery`,
        exact: false,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1672_2123)">
                <path d="M16.9231 17.9646H3.07692C1.92769 17.9646 1 17.1615 1 16.1646V7.30308C1 6.30615 1.92769 5.50308 3.07692 5.50308H5.04308V3.8C5.04308 2.78923 5.65231 2 6.44154 2H13.5585C14.3477 2 14.9569 2.78923 14.9569 3.8V5.50308H16.9231C18.0723 5.50308 19 6.30615 19 7.30308V16.1646C19 17.1615 18.0723 17.9646 16.9231 17.9646ZM3.07692 6.88769C2.67538 6.88769 2.38462 7.10923 2.38462 7.30308V16.1646C2.38462 16.3585 2.67538 16.58 3.07692 16.58H16.9231C17.3246 16.58 17.6154 16.3585 17.6154 16.1646V7.30308C17.6154 7.10923 17.3246 6.88769 16.9231 6.88769H13.5723V3.8C13.5723 3.55077 13.4892 3.38462 13.4477 3.35692L6.44154 3.38462C6.51077 3.38462 6.42769 3.55077 6.42769 3.8V6.88769H3.07692Z" fill="#8F989D"/>
                <path d="M10 15.5969C7.60466 15.5969 5.6385 13.6446 5.6385 11.2354C5.6385 8.82616 7.60466 6.8877 10 6.8877C12.3954 6.8877 14.3616 8.84 14.3616 11.2492C14.3616 13.6585 12.3954 15.5969 10 15.5969ZM10 8.27231C8.3662 8.27231 7.02312 9.60154 7.02312 11.2492C7.02312 12.8969 8.3662 14.2123 10 14.2123C11.6339 14.2123 12.977 12.8831 12.977 11.2354C12.977 9.5877 11.6339 8.27231 10 8.27231Z" fill="#8F989D"/>
            </g>
            <defs>
                <clipPath id="clip0_1672_2123">
                    <rect width="18" height="15.9646" fill="white" transform="translate(1 2)"/>
                </clipPath>
            </defs>
        </svg>
    },
    {
        id: 6,
        title: 'Видеозаписи',
        to: `/nbc/${alias}/video`,
        exact: true,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1672_2124)">
                <path d="M16.9231 17.2308H3.07692C1.92769 17.2308 1 16.3031 1 15.1538V4.07692C1 2.92769 1.92769 2 3.07692 2H16.9231C18.0723 2 19 2.92769 19 4.07692V15.1538C19 16.3031 18.0723 17.2308 16.9231 17.2308ZM3.07692 3.38462C2.68923 3.38462 2.38462 3.68923 2.38462 4.07692V15.1538C2.38462 15.5415 2.68923 15.8462 3.07692 15.8462H16.9231C17.3108 15.8462 17.6154 15.5415 17.6154 15.1538V4.07692C17.6154 3.68923 17.3108 3.38462 16.9231 3.38462H3.07692Z" fill="#8F989D"/>
                <path d="M7.54926 13.8388C7.24464 13.8388 6.95388 13.7557 6.6908 13.6034C6.22003 13.3265 5.92926 12.828 5.92926 12.3019V6.92955C5.92926 6.38955 6.22003 5.90494 6.6908 5.62801C7.20311 5.3234 7.85388 5.30955 8.36618 5.60032L13.2539 8.28647C13.7662 8.5634 14.0708 9.06186 14.0708 9.6157C14.0708 10.1696 13.7662 10.668 13.2677 10.9449L8.36618 13.6311C8.11695 13.7695 7.84003 13.8388 7.54926 13.8388ZM7.54926 6.7634C7.49388 6.7634 7.43849 6.77724 7.39695 6.80494L7.31388 12.3157C7.31388 12.3711 7.35541 12.3988 7.39695 12.4265C7.46618 12.468 7.5908 12.4957 7.70157 12.4265L12.5893 9.72647C12.6308 9.71263 12.6862 9.67109 12.6862 9.6157C12.6862 9.56032 12.6308 9.51878 12.5893 9.50493L7.70157 6.80494C7.64618 6.77724 7.60464 6.7634 7.54926 6.7634Z" fill="#8F989D"/>
            </g>
            <defs>
                <clipPath id="clip0_1672_2124">
                    <rect width="18" height="15.2308" fill="white" transform="translate(1 2)"/>
                </clipPath>
            </defs>
        </svg>
    },
    {
        id: 7,
        title: 'Cтраница НКП',
        to: `/nbc/${alias}`,
        exact: true,
        icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1669_1909)">
                <path d="M16.9231 18.6154H3.07692C1.92769 18.6154 1 17.6185 1 16.4V4.21538C1 2.99692 1.92769 2 3.07692 2H16.9231C18.0723 2 19 2.99692 19 4.21538V16.4C19 17.6185 18.0723 18.6154 16.9231 18.6154ZM3.07692 3.38462C2.68923 3.38462 2.38462 3.75846 2.38462 4.21538V16.4C2.38462 16.8569 2.68923 17.2308 3.07692 17.2308H16.9231C17.3108 17.2308 17.6154 16.8569 17.6154 16.4V4.21538C17.6154 3.75846 17.3108 3.38462 16.9231 3.38462H3.07692Z" fill="#8F989D"/>
                <path d="M18.3077 8.17563H1.69231C1.30462 8.17563 1 7.87102 1 7.48332C1 7.09563 1.30462 6.79102 1.69231 6.79102H18.3077C18.6954 6.79102 19 7.09563 19 7.48332C19 7.87102 18.6954 8.17563 18.3077 8.17563Z" fill="#8F989D"/>
                <path d="M15.4692 11.1112H4.33688C3.94919 11.1112 3.64458 10.8066 3.64458 10.4189C3.64458 10.0312 3.94919 9.72656 4.33688 9.72656H15.4692C15.8569 9.72656 16.1615 10.0312 16.1615 10.4189C16.1615 10.8066 15.8569 11.1112 15.4692 11.1112Z" fill="#8F989D"/>
                <path d="M15.4692 14.0877H4.33688C3.94919 14.0877 3.64458 13.7831 3.64458 13.3954C3.64458 13.0077 3.94919 12.7031 4.33688 12.7031H15.4692C15.8569 12.7031 16.1615 13.0077 16.1615 13.3954C16.1615 13.7831 15.8569 14.0877 15.4692 14.0877Z" fill="#8F989D"/>
                <path d="M15.843 5.794C16.2942 5.794 16.66 5.42825 16.66 4.97708C16.66 4.52591 16.2942 4.16016 15.843 4.16016C15.3919 4.16016 15.0261 4.52591 15.0261 4.97708C15.0261 5.42825 15.3919 5.794 15.843 5.794Z" fill="#8F989D"/>
                <path d="M13.3923 5.794C13.8435 5.794 14.2093 5.42825 14.2093 4.97708C14.2093 4.52591 13.8435 4.16016 13.3923 4.16016C12.9412 4.16016 12.5754 4.52591 12.5754 4.97708C12.5754 5.42825 12.9412 5.794 13.3923 5.794Z" fill="#8F989D"/>
                <path d="M10.9416 5.794C11.3927 5.794 11.7585 5.42825 11.7585 4.97708C11.7585 4.52591 11.3927 4.16016 10.9416 4.16016C10.4904 4.16016 10.1246 4.52591 10.1246 4.97708C10.1246 5.42825 10.4904 5.794 10.9416 5.794Z" fill="#8F989D"/>
            </g>
            <defs>
                <clipPath id="clip0_1669_1909">
                    <rect width="18" height="16.6154" fill="white" transform="translate(1 2)"/>
                </clipPath>
            </defs>
        </svg>
    }
];