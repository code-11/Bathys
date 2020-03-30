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
