import {moveSub, getBoard, getSubLoc, getPositions, getPositionMapping, requestPosition} from '../actions/index';
import { v4 as uuidv4 } from 'uuid'
import React, { Component } from "react";
import { connect } from 'react-redux'
import Grid from "./Grid"

function mapStateToProps(state) {
  const { board,positions, positionMapping } = state;
  return {board,positions, positionMapping};
}

class App extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getBoard());
    this.props.dispatch(getSubLoc());
    this.props.dispatch(getPositions());
    this.props.dispatch(getPositionMapping());
    this.moveSubUp = this.moveSubUp.bind(this);
    this.moveSubDown = this.moveSubDown.bind(this);
    this.moveSubLeft = this.moveSubLeft.bind(this);
    this.moveSubRight = this.moveSubRight.bind(this);
    this.requestPosition = this.requestPosition.bind(this);

    this.uuid=uuidv4();
    this.state={requestingPosition:false, position:null}
  };

  moveSubUp(){
    this.props.dispatch(moveSub("UP"))
  }

  moveSubDown(){
    this.props.dispatch(moveSub("DOWN"))
  }

  moveSubLeft(){
    this.props.dispatch(moveSub("LEFT"))
  }

  moveSubRight(){
    this.props.dispatch(moveSub("RIGHT"))
  }

  requestPosition(playerId,position){
    this.setState({requestingPosition:true});
    this.props.dispatch(requestPosition(playerId,position))
    .then((response) =>{
      if(response){
        this.setState({requestingPosition:false,position});
      }else{
        this.setState({requestingPosition:false});
        alert("This position is taken.");
      }
    });
  }

  renderMainView(){
    return(
      <div id="app-root">
        <Grid className="tile-view" board={this.props.board} bufferRatio={.07}/>
        <div className="control-view">
          <div onClick={this.moveSubUp} style={{margin:"0% 33.3333% 0% 33.3333%", width:"33.3333%", height:"33.3333%", backgroundColor:"red"}}/>
          <div onClick={this.moveSubLeft} style={{margin:"0% 33.3333% 0% 0%", width:"33.3333%", height:"33.3333%", display:"inline-block", backgroundColor:"red"}}/>
          <div onClick={this.moveSubRight} style={{margin:"0px", width:"33.3333%", height:"33.3333%", display:"inline-block", backgroundColor:"red"}}/>
          <div onClick={this.moveSubDown} style={{margin:"0% 33.3333% 0% 33.3333%", width:"33.3333%", height:"33.3333%",display:"inline-block", backgroundColor:"red"}}/>
        </div>
      </div>);
  }

  renderPositionSelection(){
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

  render() {
    const view = this.state.position == undefined ? this.renderPositionSelection() : this.renderMainView();
  	return view;
  }
}

export default connect(mapStateToProps)(App)
