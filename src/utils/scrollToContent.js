export const scrollFunc = (scrollRef) => {
    if (!!scrollRef && window.scrollY > scrollRef.current.getBoundingClientRect().top + window.scrollY) {
        window.scrollTo(0, scrollRef.current.getBoundingClientRect().top + window.scrollY)
    };
};