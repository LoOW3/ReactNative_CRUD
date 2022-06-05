
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
