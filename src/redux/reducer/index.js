const initialState = {
    cloudURL: '',
    theme: true,
    currentUser: '',
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
        case 'CURRENT_USER':
            return{
                ...state,
                currentUser: action.payload
            }
        case 'LOG_OUT':
            return{
                ...state,
                currentUser: ''
            }
        default: return state
    }
}