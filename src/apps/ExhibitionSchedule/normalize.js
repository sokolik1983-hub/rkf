import {normalize, schema} from 'normalizr';

const event = new schema.Entity('events');
const date = new schema.Entity('dates', {
    events: [event]
});

const datesListSchema = new schema.Array(date);


export const normalizeSchedule = data => normalize(data, datesListSchema)