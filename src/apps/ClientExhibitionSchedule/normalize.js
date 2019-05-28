import {normalize, schema} from 'normalizr';

const item = new schema.Entity('items');
const day = new schema.Entity('days', {
    items: [item]
});

const daysListSchema = new schema.Array(day);


export const normalizeSchedule = data => normalize(data, daysListSchema)