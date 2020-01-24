import { defaultReduxKey } from "./config";

export const getState = state => state[defaultReduxKey];


export const selectClubRoute = state => {
    const { club } = getState(state);
    return { route: club.route }
};

export const selectExhibitions = state => {
    const { exhibitions } = getState(state);
    const { route } = selectClubRoute(state);
    return {
        route,
        ...exhibitions
    }
};

export const selectExhibition = (state, props) => {
    const { listCollection } = selectExhibitions(state);
    return {
        ...listCollection[String(props.id)]
    }
};


export const selectNews = (state, props) => {
    //console.log(props)
    // const { route } = selectClubRoute(state);
    const news = state.news;
    return {
        news
    }
};

export const selectClubHeader = state => {
    const { common } = getState(state).club;
    const { logo_link, headliner_link, name, id } = common;
    const { authentication } = state;
    return {
        clubLogo: logo_link,
        clubHeaderImg: headliner_link,
        clubName: name,
        clubId: id,
        profileId: authentication.profile_id
    }
};

export const selectNewsStory = (state, props) => {

    if (props.id) {
        const { listCollection } = selectNews(state);
        return {
            ...listCollection[String(props.id)]
        }
    }

    return null
};

export const selectFeaturedExhibitionsList = state => {
    const { exhibitions } = getState(state);
    // const {listIds} = exhibitions;
    const { route } = selectClubRoute(state);
    return { route, exhibitions: exhibitions.list }
};

export const selectClubCommon = state => {
    const { common } = getState(state).club;
    return {
        clubCommon: common,
    }
};
export const selectClubDescription = state => {
    const { common } = getState(state).club;
    const { description } = common;
    return {
        description
    }
};


export const selectClubAddress = state => {
    const { common } = getState(state).club;
    const { address, city } = common;
    return { address, city }
};

export const selectClubContacts = state => {
    const { contacts } = getState(state).club;
    return { contacts }
};

export const selectClubOwnerName = state => {
    const { common } = getState(state).club;
    const { owner_name } = common;
    return {
        clubOwner: owner_name
    }
};

export const selectClubWorkingHours = state => {
    const { common } = getState(state).club;
    const { work_time_from, work_time_to } = common;
    return {
        workTimeFrom: work_time_from,
        workTimeTo: work_time_to
    }
};

export const selectClubDocuments = state => {
    const { documents } = getState(state).club;
    return { documents }
};

