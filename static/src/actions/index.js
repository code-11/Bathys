const receiveBoard = (board) =>{

    const restructuredBoard={};
    for (let [key, value] of Object.entries(board)) {
        const xy=key.split(",");
        const x=xy[0];
        const y=xy[1];

        if(!(x in restructuredBoard)){
          restructuredBoard[x]={}
        }
        const yMap=restructuredBoard[x];
        yMap[y]=value;
    }

    return {
        type:"RECEIVE_GET_BOARD",
        board: restructuredBoard,
    }
}

export const getBoard = () =>{
    return (dispatch) =>{
        dispatch({type:"SEND_GET_BOARD"});
        return fetch("/board")
        .then((response)=>response.json())
        .then((board)=>{
            dispatch(receiveBoard(board));
        });
    };
}

const receiveSubLoc = (subLocReponse) => {
  return{
    type:"RECEIVE_GET_SUB_LOC",
    subLoc: subLocReponse
  }
}

export const getSubLoc = () =>{
    return (dispatch) =>{
        dispatch({type:"SEND_GET_SUB_LOC"});
        return fetch("/getSubLoc")
        .then((response)=>response.json())
        .then((subLoc)=>{
            dispatch(receiveSubLoc(subLoc));
        });
    };
}

const receiveSubMove = (subMoveResponse) => {
  return{
    type:"RECEIVE_MOVE_SUB",
    subLoc: subMoveResponse,
  }
}

export const moveSub = (direction) =>{
  return (dispatch) => {
    dispatch({type: "SEND_MOVE_SUB"});
    return fetch("/moveSub",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({direction})
    })
    .then((response)=>response.json())
    .then((subMoveResponse) =>{
      dispatch(receiveSubMove(subMoveResponse))
    });
  }
}
