import {moveSub, getBoard, getSubLoc, getPositions, requestPosition} from '../actions/index';
import { v4 as uuidv4 } from 'uuid'
import React, { Component } from "react";
import { connect } from 'react-redux'
import Grid from "./Grid"

function mapStateToProps(state) {
  const { board,positions } = state;
  return {board,positions};
}

class App extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getBoard());
    this.props.dispatch(getSubLoc());
    this.props.dispatch(getPositions());
    this.moveSubUp = this.moveSubUp.bind(this);
    this.moveSubDown = this.moveSubDown.bind(this);
    this.moveSubLeft = this.moveSubLeft.bind(this);
    this.moveSubRight = this.moveSubRight.bind(this);
    this.requestPosition = this.requestPosition.bind(this);

    this.uuid=uuidv4();
    this.state={position:null}
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
    this.props.dispatch(requestPosition(playerId,position))
    .then((response) =>{
      console.log(response);
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
    const positions = this.props.positions;
    if(positions!=undefined){
      const positionBtns = positions.map((el, i)=> <div className={"opening-menu-item"} key={i} onClick={()=>this.requestPosition(this.uuid,el.uniq)}> {el.name} </div>);
      return <div> {positionBtns} </div>;
    }else{
      return null;
    }
  }

  render() {
    const view = this.state.position == undefined ? this.renderPositionSelection() : this.renderMainView();
  	return view;
  }
}

export default connect(mapStateToProps)(App)
