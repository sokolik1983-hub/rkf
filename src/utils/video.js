export const getYoutubeVideoId = link => {
    let videoId = '';
    const linkArr = link.split('/');
    const params = linkArr[linkArr.length - 1].replace('watch?', '').split('&');

    if(params.length === 1) {
        videoId = params[0].replace('v=', '');
    } else {
        videoId = params.filter(param => /v=/.test(param))[0].replace('v=', '');
    }

    return videoId;
};