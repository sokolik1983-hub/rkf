const nameInMobileMenu = (user_type,url,clubInfo, setNameInMenu, userInfo, setMenuBackground) => {
    switch (user_type) {
        case 1:
            switch (url) {
                case 'club':
                    clubInfo && setNameInMenu(clubInfo.short_name);
                    break;
                case 'kennel':
                    clubInfo && setNameInMenu(clubInfo.name);
                    break;
                default:
                    userInfo && setMenuBackground(userInfo.headliner_link);
                    userInfo && setNameInMenu(`${userInfo.personal_information.first_name} ${userInfo.personal_information.last_name}`);
                    break;
            }
            break;
        case 3:
            switch (url) {
                case 'club':
                    clubInfo && setNameInMenu(clubInfo.short_name);
                    break;
                case 'kennel':
                    clubInfo && setNameInMenu(clubInfo.name);
                    break;
                default:
                    clubInfo && setMenuBackground(clubInfo.headliner_link);
                    clubInfo && setNameInMenu(clubInfo.short_name);
                    break;
            }
            break;
        case 4:
            switch (url) {
                case 'club':
                    clubInfo && setNameInMenu(clubInfo.short_name);
                    break;
                case 'kennel':
                    clubInfo && setNameInMenu(clubInfo.name);
                    break;
                default:
                    clubInfo && setMenuBackground(clubInfo.headliner_link);
                    clubInfo && setNameInMenu(clubInfo.name);
                    break;
            }
            break;
        case 5:
            switch (url) {
                case 'club':
                    clubInfo && setNameInMenu(clubInfo.short_name);
                    break;
                case 'kennel':
                    clubInfo && setNameInMenu(clubInfo.name);
                    break;
                default:
                    break;
            }
            break;
        default:
            switch (url) {
                case 'club':
                    clubInfo && setNameInMenu(clubInfo.short_name);
                    break;
                case 'kennel':
                    clubInfo && setNameInMenu(clubInfo.name);
                    break;
                default:
                    break;
            }
            break;
    }
    clubInfo && setMenuBackground(clubInfo.headliner_link);
}

export default nameInMobileMenu;