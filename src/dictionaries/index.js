import {useDictionary} from "./hooks";

const getDictElement = (dict, elementId) => dict.loaded ? dict.dictionary[String(elementId)] : null;

const getDictElementsArray = (dict, elementsIdsArray) => dict.loaded ? (elementsIdsArray.map(id=>dict.dictionary[String(id)])) : [];

export {
    getDictElement,
    getDictElementsArray,
    useDictionary
};