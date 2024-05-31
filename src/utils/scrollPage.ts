export const scrollPage = (position?: number, behavior?: ScrollBehavior) => {
    if (position) {
        return window.scrollTo({ top: position, behavior: behavior ?? 'auto' });
    }
    return window.scrollTo({
        top: 0,
        behavior: behavior ?? 'auto',
    });
};
