// dispatch(requestPosts(subreddit))

const requestTime = () => {
    return {
        type:"SEND_GET_TIME",
    };
};

const receiveTime = (time) => {
    return {
        type:"RECEIVE_GET_TIME",
        time: time
    };
};

const receiveShapes = (shapes) =>{
    return {
        type:"RECEIVE_GET_SHAPES",
        shapes: shapes,
    }
}

export const getCountryShapes = () =>{
    return (dispatch) =>{
        dispatch({type:"SEND_GET_SHAPES"});
        return fetch("/getCountryShapes")
        .then((response)=>response.json())
        .then((shapes)=>{
            dispatch(receiveShapes(shapes));
        });
    };
}

export const getTime = () =>{
    return (dispatch) =>{
        dispatch({type:"SEND_GET_TIME"});
        return fetch("/time")
        .then((response)=>response.json())
        .then((time)=>{
            dispatch(receiveTime(time));
        });
    };
};

export const pauseTime = () =>{
    return (dispatch) =>{
        dispatch({type:"SEND_PAUSE_TIME"});
        return fetch("/pauseTime")
        .then((response)=>response.json())
        .then((success)=>{
            console.log("Stopped server clock");
            dispatch(()=>{type:"RECEIVE_PAUSE_TIME"});
        });
    };
};

export const startTime = () =>{
    return (dispatch) =>{
        dispatch({type:"SEND_START_TIME"});
        return fetch("/startTime")
        .then((response)=>response.json())
        .then((success)=>{
            console.log("Started server clock");
            dispatch(()=>{type:"RECEIVE_START_TIME"});
        });
    };
};
