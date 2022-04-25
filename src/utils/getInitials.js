export const getInitials = (name) => {
    return name.split(' ')[1] + ' ' + name.split(' ')[0];
};