import {normalize, schema} from 'normalizr';

const newsStory = new schema.Entity('news');

const newsListSchema = new schema.Array(newsStory);


export const normalizeNewList = data => normalize(data, newsListSchema)