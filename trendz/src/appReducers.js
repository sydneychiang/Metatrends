const initalState = {
    TWEET: true,
    REDDIT: true,
    MOVIE: true,
    TV: true,
    SPOTIFY: true,
    YOUTUBE: true,
    TWITCH: true,
    date: new Date(),
    searchData: [{time: "search", data: []}],
    searchLength: 0,
    time: new Date(),
}

export default function appReducers(state = initalState, action) {
    switch (action.type) {
        case 'SET_TWEET':
            return { ...state, TWEET:action.payload }
        case 'SET_REDDIT':
            return { ...state, REDDIT:action.payload }
        case 'SET_MOVIE':
            return { ...state, MOVIE:action.payload }
        case 'SET_TV':
            return { ...state, TV:action.payload }
        case 'SET_SPOTIFY':
            return { ...state, SPOTIFY:action.payload }
        case 'SET_YOUTUBE':
            return { ...state, YOUTUBE:action.payload }
        case 'SET_TWITCH':
            return { ...state, TWITCH:action.payload }
        case 'SET_DATE':
            return { ...state, date:action.payload }
        case 'SET_SEARCH_DATA':
            return { ...state, searchData:[action.payload] }
        case 'SET_SEARCH_LENGTH':
            return { ...state, searchLength:action.payload }
        case 'SET_TIME':
            return { ...state, time:action.payload }
        default:
            return { ...state }
    }

}