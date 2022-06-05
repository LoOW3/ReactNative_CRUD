const initialState = {
    cloudURL: ''
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
        default: return state
    }
}