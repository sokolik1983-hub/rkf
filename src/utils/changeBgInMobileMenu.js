import {endpointGetClubInfo} from "../pages/Club/config";
import {endpointGetUserInfo} from "../components/Layouts/UserLayout/config";

const changeBackground = (user_type, backgroundForPage, alias, orgAlias, url) => {
    switch (user_type) {
        case 3:
        case 4:
            switch (url) {
                case 'club':
                case 'kennel':
                    backgroundForPage(orgAlias, endpointGetClubInfo);
                    break;
                default:
                    backgroundForPage(alias, endpointGetClubInfo)
                    break;
            }
            break;
        case 1:
            switch (url) {
                case 'club':
                case 'kennel':
                    backgroundForPage(orgAlias, endpointGetClubInfo);
                    break;
                case 'user':
                    backgroundForPage(orgAlias, endpointGetUserInfo)
                    break;
                default:
                    backgroundForPage(alias, endpointGetUserInfo)
                    break;
            }
            break;
        case 5:
            switch (url) {
                case 'club':
                case 'kennel':
                    backgroundForPage(orgAlias, endpointGetClubInfo);
                    break;
                default:
                    backgroundForPage(alias, endpointGetUserInfo)
                    break;
            }
            break;
        default:
            switch (url) {
                case 'club':
                case 'kennel':
                    backgroundForPage(orgAlias, endpointGetClubInfo);
                    break;
                default:
                    break;
            }
            break;
    }
}
export default changeBackground;