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

// const receiveRequestPosition = (requestPositionResponse) =>{
//   return {
//     type: "RECEIVE_REQUEST_POSITION",
//     positionMap:requestPositionResponse.positionMap,
//     success:requestPositionResponse.success
//   }
// }

export const registerPlayer = (playerId) =>{
    return (dispatch) =>{
        dispatch({type:"SEND_REGISTER_PLAYER", playerId:playerId});
        return fetch("/registerPlayer",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({playerId})
        })
        .then((response) => response.json())
        .then((success)=>{
          return success;
        });
    }
}

export const requestPosition = (playerId,positionUniq) =>{
    return (dispatch) =>{
        dispatch({type:"SEND_REQUEST_POSITION", playerId:playerId, positionUniq:positionUniq});
        return fetch("/requestPosition",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({playerId,positionUniq})
        })
        .then((response) => response.json())
        .then((success)=>{
          return success;
          // dispatch(receiveRequestPosition(requestPositionResponse));
        });
    }
}

export const getPositionMappingLong = (playerId) =>{
  return (dispatch) =>{
      dispatch({type:"SEND_GET_POSITION_MAPPING_LONG", playerId:playerId});
      return fetch("/getPositionMappingLong",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({playerId})
      })
      .then((response) => response.json())
      .then((positionMapping)=>{
        dispatch(receivePositionMapping(positionMapping));
        return true;
      });
  }
}


const receivePositionMapping = (positionMapping) =>{
  return {
    type:"RECEIVE_GET_POSITION_MAPPING",
    positionMapping:positionMapping,
  }
}

export const getPositionMapping = (long=false)=>{
    return (dispatch) => {
      dispatch({type:"SEND_GET_POSITION_MAPPING"});
      return fetch("/getPositionMapping")
      .then((response)=>response.json())
      .then((positionMapping) =>{
        dispatch(receivePositionMapping(positionMapping));
      });
    }
}

const receivePositions = (positions) =>{
  return {
    type:"RECEIVE_GET_POSITIONS",
    positions: positions,
  };
};

export const getPositions = ()=>{
    return (dispatch) => {
      dispatch({type:"SEND_GET_POSITIONS"});
      return fetch("/getPositions")
      .then((response)=>response.json())
      .then((positions) =>{
        dispatch(receivePositions(positions));
      });
    }
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
  const {x,y,new_tile}=subMoveResponse;
  return{
    type:"RECEIVE_MOVE_SUB",
    subLoc: {x,y},
    newTile:new_tile,
  }
}

export const moveSub = (direction) =>{
  return (dispatch) => {
    dispatch({type: "SEND_MOVE_SUB", direction:direction});
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
