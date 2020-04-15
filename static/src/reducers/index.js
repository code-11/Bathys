const initialState = {}

const mainReducer = (state=initialState, action) => {
	switch(action.type){
		case "RECEIVE_GET_BOARD":
			return { ...state, board: action.board};
		case "SEND_GET_BOARD":
			return {...state};
		case "RECEIVE_MOVE_SUB":
			state.board[action.subLoc.x][action.subLoc.y]=action.newTile;
			return { ...state, subLoc:action.subLoc};
		case "SEND_MOVE_SUB":
			return {...state};
		case "RECEIVE_GET_SUB_LOC":
			return { ...state, subLoc:action.subLoc};
		case "SEND_GET_SUB_LOC":
			return {...state};
		case "RECEIVE_GET_POSITIONS":
			return {...state, positions:action.positions};
		case "SEND_GET_POSITIONS":
			return {...state};
		case "SEND_REQUEST_POSITION":
			return {...state};
		case "RECEIVE_REQUEST_POSITION":
			return {...state};
		default:
			console.error(action);
			return {...state};
	}
}

export default mainReducer
