export function blockContent(block) {
    if(block) {
        document.querySelector('body').classList.add('hidden-content');
        document.querySelector('.header').classList.add('hidden-content');
        document.querySelector('html').classList.add('hidden-content');
    } else {
        document.querySelector('body').classList.remove('hidden-content');
        document.querySelector('.header').classList.remove('hidden-content');
        document.querySelector('html').classList.remove('hidden-content');
    }
}