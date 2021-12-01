const profileTypes = {
    mainNews: {
        profileId: 'article_id',
        methodToAdd: '/api/article/add_like_to_article/',
        methodToRemove: '/api/article/remove_like_from_article/',
        additionalMethod: 'api/Article/public_all_v2',
    },
    news: {
        profileId: 'article_id',
        methodToAdd: '/api/article/add_like_to_article/',
        methodToRemove: '/api/article/remove_like_from_article/',
    },
    organizations: {
        federationsAndClubs : {
            profileId: 'liked_profile_id',
            methodToAdd: '/api/club/add_like_to_club',
            methodToRemove: '/api/club/remove_like_from_club',
        },
        kennels : {
            profileId: 'liked_profile_id',
            methodToAdd: '/api/nurseries/nursery/add_like_to_kennel',
            methodToRemove: '/api/nurseries/nursery/remove_like_from_kennel',
        },
        nbc : {
            profileId: 'nbc_id',
            methodToAdd: '/api/nationalbreedclub/add_like_to_nbc',
            methodToRemove: '/api/nationalbreedclub/remove_like_from_nbc',
        },
    }
};

export default profileTypes;