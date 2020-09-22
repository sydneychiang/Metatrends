const initalState = {
    
}

export default function appReducers(state = initalState, action) {
    switch (action.type) {
        case 'SET_FILTER':
            return { ...state}
        
        default:
            return { ...state }
    }

}