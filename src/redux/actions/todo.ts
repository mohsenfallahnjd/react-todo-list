
import { v4 as uuid } from 'uuid';

/**
 * Add todo
 * 
 * @param {string} text - Text of task
 */
export const add = (text: string) => ({
    type: 'ADD',
    id  : uuid(),
    text,
});

