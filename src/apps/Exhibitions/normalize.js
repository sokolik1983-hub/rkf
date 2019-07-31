import {normalize, schema} from 'normalizr';

const exhibition = new schema.Entity('exhibitions');

const exhibitionsListSchema = new schema.Array(exhibition);


export const normalizeExhibitionsList = data => normalize(data, exhibitionsListSchema)