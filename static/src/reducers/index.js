const initialState = {}

const mainReducer = (state=initialState, action) => {
	switch(action.type){
		case "RECEIVE_GET_BOARD":
			return { ...state, board: action.board};
		case "SEND_GET_BOARD":
			return {...state};
		default:
			console.error(action);
			return {...state};
	}
}

export default mainReducer
