const initialState = {
    cloudURL: '',
    theme: true
}


export default function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_CLOUD_URL':
            return{
                ...state,
                cloudURL: action.payload
            }
        case 'GET_CLOUD_URL':
            return{
                ...state,
                cloudURL: ''
            }
        case 'CHANGE_THEME':
            return{
                ...state,
                theme: !state.theme
            }
        default: return state
    }
}