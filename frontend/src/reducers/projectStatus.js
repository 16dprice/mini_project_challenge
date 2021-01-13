const projectStatusReducer = (state = "all", action) => {
    switch(action.type) {
        case 'ALL':
            return 'all';
        case 'COMPLETED':
            return 'completed';
        case 'UNCOMPLETED':
            return 'uncompleted';
        default:
            return state;
    }
}

export default projectStatusReducer;
