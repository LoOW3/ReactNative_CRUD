
export function getCloudURL(data){
    return async function(dispatch){
        return dispatch({
            type:'GET_CLOUD_URL',
            payload: data
        })
    }
} 
export function deleteCloudURL(){
    return async function(dispatch){
        return dispatch({
            type:'GET_CLOUD_URL'
        })
    }
} 
export function changeTheme(){
    return async function(dispatch){
        return dispatch({
            type:'CHANGE_THEME'
        })
    }
} 

export function currentUser(uid){
    return async function(dispatch){
        return dispatch({
            type:'CURRENT_USER',
            payload: uid
        })
    }
}
export function cleanCurrentUser(){
    return async function(dispatch){
        return dispatch({
            type:'LOG_OUT',
        })
    }
}
