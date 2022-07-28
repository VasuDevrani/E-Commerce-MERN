const reducer = (state, action) => {
    switch(action.type){
        case 'CREATE_REQ':
            return {...state, loading: true}
        case 'CREATE_SUCCESS':
            return {...state, loading: false}
        case 'CREATE_FAIL':
            return {...state, loading: false}
        default:
            return state;
    }
}

export default reducer;