import {normalize, schema} from 'normalizr';

const dict = new schema.Entity('dict');

const dictSchema = new schema.Array(dict);


export const normalizeDictList = data => normalize(data, dictSchema);