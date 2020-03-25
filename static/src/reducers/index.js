const initialState={
	time:"",
	timeRate:"PAUSED",
	countryShapes:{},
}

const mainReducer = (state=initialState, action) => {
	switch(action.type){
		case "RECEIVE_GET_TIME":
			return { ...state, time: action.time};
		case "RECEIVE_PAUSE_TIME":
			return { ...state, timeRate: "PAUSED"};
		case "RECEIVE_START_TIME":
			return { ...state, timeRate: "PLAY"};
		case "RECEIVE_GET_SHAPES":
			return { ...state, countryShapes: action.shapes};
		case "SEND_GET_SHAPES":
		case "SEND_START_TIME":
		case "SEND_GET_TIME":
		case "SEND_PAUSE_TIME":
			return {...state};
		default:
			console.error(action);
			return {...state};
	}
}

export default mainReducer
