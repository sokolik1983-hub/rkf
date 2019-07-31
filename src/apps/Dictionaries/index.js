import {useDictionary} from "./hooks";

const getDictElement = (dict, elementId) => dict.loaded ? dict.dictionary[String(elementId)] : null;

export {
    getDictElement,
    useDictionary,
}