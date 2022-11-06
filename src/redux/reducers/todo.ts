/**
 * to-do reducer
 * 
 * @param {Array} state
 * @param {object} action
 * @returns {Array}
 */
const todo = (state: [], action: {[k: string]: any}): Array<{[k: string]: any}> => {
    switch (action.type) {
    case 'ADD':
        return [
            ...state,
            {
                id  : action.id,
                text: action.text,
            },
        ];
    default:
        return state;
    }
};
export default todo;
