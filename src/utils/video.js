export const getYoutubeVideoId = string => {
    let videoId = ''
    const params = string.replace('watch?', '').split('&');

    if(params.length === 1) {
        videoId = params[0].replace('v=', '');
    } else {
        videoId = params.filter(param => /v=/.test(param))[0].replace('v=', '');
    }

    return videoId;
};