export const projectCreationLanguageSelectReducer = (state = '', action) => {
    switch(action.type) {
        case 'SELECT_LANGUAGE':
            return action.payload;
        case 'DESELECT_LANGUAGE':
            return '';
        default:
            return state;
    }
}

export const projectCreationBookSelectReducer = (state = '', action) => {
    switch(action.type) {
        case 'SELECT_BOOK':
            return action.payload;
        case 'DESELECT_BOOK':
            return '';
        default:
            return state;
    }
}