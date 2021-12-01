const profileTypes = {
    mainNews: {
        profile_id: 'news',
        methodToAdd: '/api/article/remove_like_from_article/',
        methodToRemove: '/api/article/add_like_to_article/',
        additionalMethod: 'api/Article/public_all_v2',
    },
    news: {
        profile_id: 'news',
        methodToAdd: '/api/article/remove_like_from_article/',
        methodToRemove: '/api/article/add_like_to_article/',
    },
};

export default profileTypes;