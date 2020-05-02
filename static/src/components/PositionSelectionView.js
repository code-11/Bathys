import {getPositions, getPositionMapping, getPositionMappingLong, requestPosition, registerPlayer} from '../actions/index';
import { v4 as uuidv4 } from 'uuid'
import React, { Component } from "react";
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const { positions, positionMapping } = state;
  return {positions, positionMapping};
}

class PositionSelectionView extends Component {
  constructor(props) {
    super(props);
    this.requestPosition = this.requestPosition.bind(this);

    this.positionSetter=this.props.positionSetter;
    this.uuid=this.props.uuid;

    this.state={requestingPosition:false}
  };

  positionMappingAsyncPoll(){
    this.props.dispatch(getPositionMappingLong(this.uuid)).then((response)=>{
      this.positionMappingAsyncPoll();
    });
  }

  componentDidMount(){
    this.props.dispatch(registerPlayer(this.uuid)).then((response)=>{
      this.props.dispatch(getPositions());
      this.props.dispatch(getPositionMapping());
      this.positionMappingAsyncPoll();
    });
  }

  requestPosition(playerId,position){
    this.setState({requestingPosition:true});
    this.props.dispatch(requestPosition(playerId,position))
    .then((response) =>{
      if(response){
        this.positionSetter(position);
        this.setState({requestingPosition:false});
      }else{
        this.setState({requestingPosition:false});
        alert("This position is taken.");
      }
    });
  }

  render(){
    const positionMapping = this.props.positionMapping;
    const positions = this.props.positions;
    if(this.state.requestingPosition){
      return <div> Requesting Position... </div>;
    }else{
      const positionBtns=[];
      if(positionMapping!=undefined && positions!=undefined){
        let i=0;
        for(let positionID in positionMapping){
          const position = positions.find(pos=>pos.uniq==positionID);
          const playerID=positionMapping[position.uniq];
          const playerString=playerID==undefined ? "Untaken" : playerID;
          const positionBtn=
            <div className={"opening-menu-item"}
                 key={i}
                 onClick={()=>{
                      if(playerID==undefined){this.requestPosition(this.uuid,position.uniq)}
                 }}>
                 {position.name+" : "+playerString}
            </div>;
          positionBtns.push(positionBtn);
          i+=1;
        }
        return <div> {positionBtns} </div>;
      }else{
        return null;
      }
    }
  }
}
export default connect(mapStateToProps)(PositionSelectionView);
