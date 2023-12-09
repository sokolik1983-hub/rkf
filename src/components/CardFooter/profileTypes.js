const profileTypes = {
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
    },
    exhibitions: {
        profileId: 'exhibition_id',
        methodToAdd: '/api/exhibitions/exhibition/add_like_to_exhibition',
        methodToRemove: '/api/exhibitions/exhibition/remove_like_from_exhibition',
    },
    judges: {
        byBreed: {
            profileId: 'judge_id',
            methodToAdd: '/api/exteriorjudge/add_like_to_exterior_judge',
            methodToRemove: '/api/exteriorjudge/remove_like_from_exterior_judge',
        },
        onWorkingQualities: {
            profileId: 'judge_id',
            methodToAdd: '/api/workreferee/add_like_to_work_judge',
            methodToRemove: '/api/workreferee/remove_like_from_work_judge',
        },
    }
};

export default profileTypes;