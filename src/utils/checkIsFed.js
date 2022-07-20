export const checkIsFed = (alias) => {
    if (alias === 'rkf' || alias === 'rfss' || alias === 'rfls' || alias === 'rfos' || alias === 'oankoo') {
        return true;
    }
    return false;
}