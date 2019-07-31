export const normalizeDictList = data => {
    const options = [];
    const dictionary = {};
    const dictIndex = [];
    data.forEach(element => {
        const {id, name} = element;
        dictIndex.push(id);
        options.push({label: name, value: id});
        dictionary[String(id)] = name
    });
    return {
        options,
        dictionary,
        dictIndex,
    }
};