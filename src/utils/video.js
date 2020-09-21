/*getYoutubeVideoId вытаскивает id из ссылок, оканчивающихся на:
    /{id}
    /v={id}
    /watch?v={id}
    /watch?v={id}&feature=related
    /watch?feature=player_embedded&v={id}
    /watch?v={id}&feature=share&a=9QlmP1yvjcllp0h3l0NwuA
    /watch?v={id}&feature=em-uploademail
*/

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