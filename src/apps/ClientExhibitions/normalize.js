import {normalize, schema} from 'normalizr';

const exhibition = new schema.Entity('exhibitions');

const exhibitionListSchema = new schema.Array(exhibition);


export const normalizeExhibitionList = data => normalize(data, exhibitionListSchema);