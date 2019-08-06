import {normalize, schema} from 'normalizr';

const listEntry = new schema.Entity('listCollection');

const listSchema = new schema.Array(listEntry);


export const normalizeList = data => normalize(data, listSchema);