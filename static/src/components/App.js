import {moveSub, getBoard, getSubLoc, getPositions} from '../actions/index';
import React, { Component } from "react";
import { connect } from 'react-redux'
import Grid from "./Grid"

function mapStateToProps(state) {
  const { board } = state;
  return {board};
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

  render() {
  	return (
      <div id="app-root">
        <Grid className="tile-view" board={this.props.board} bufferRatio={.07}/>
        <div className="control-view">
          <div onClick={this.moveSubUp} style={{margin:"0% 33.3333% 0% 33.3333%", width:"33.3333%", height:"33.3333%", backgroundColor:"red"}}/>
          <div onClick={this.moveSubLeft} style={{margin:"0% 33.3333% 0% 0%", width:"33.3333%", height:"33.3333%", display:"inline-block", backgroundColor:"red"}}/>
          <div onClick={this.moveSubRight} style={{margin:"0px", width:"33.3333%", height:"33.3333%", display:"inline-block", backgroundColor:"red"}}/>
          <div onClick={this.moveSubDown} style={{margin:"0% 33.3333% 0% 33.3333%", width:"33.3333%", height:"33.3333%",display:"inline-block", backgroundColor:"red"}}/>
        </div>
      </div>
  	);
  }
}

export default connect(mapStateToProps)(App)
