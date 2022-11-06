/**
 * to-do reducer
 * 
 * @param {*} state
 * @param {object} action
 * @returns {Array}
 */
const todo = (state: any, action: {[k: string]: any}): Array<{[k: string]: any}> => {
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
