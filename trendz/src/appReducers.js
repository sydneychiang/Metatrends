const initalState = {
    tweet: true,
    reddit: true,
    movie: true,
    tv: true,
    spotify: true,
    youtube: true,
    twitch: true,
}

export default function appReducers(state = initalState, action) {
    switch (action.type) {
        case 'SET_TWEET':
            return { ...state, tweet:action.payload }
        case 'SET_REDDIT':
            return { ...state, reddit:action.payload }
        case 'SET_MOVIE':
            return { ...state, movie:action.payload }
        case 'SET_TV':
            return { ...state, tv:action.payload }
        case 'SET_SPOTIFY':
            return { ...state, spotify:action.payload }
        case 'SET_YOUTUBE':
            return { ...state, youtube:action.payload }
        case 'SET_TWITCH':
            return { ...state, twitch:action.payload }

        default:
            return { ...state }
    }

}