export function blockContent(block) {
    if(block) {
        document.querySelector('body').classList.add('hidden-content');
    } else {
        document.querySelector('body').classList.remove('hidden-content');
    }
}