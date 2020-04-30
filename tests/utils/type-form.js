import typeText from './type-text';
import flatten from '../../src/utils/flatten';

const TypeForm = async (page, config) => { 
    let fd = flatten(config);
    for (let k in fd) {
        await typeText(page, `input[name="${k}"]`, fd[k]);
    }
}

export default TypeForm;
