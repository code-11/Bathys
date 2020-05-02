import {registerPlayer} from '../actions/index';
import { v4 as uuidv4 } from 'uuid'
import React, { Component } from "react";
import { connect } from 'react-redux'
import Grid from "./Grid"
import NavigatorView from "./NavigatorView";
import PositionSelectionView from "./PositionSelectionView"

function mapStateToProps(state) {
  const { positions, positionMapping } = state;
  return {positions, positionMapping};
}

class App extends Component {
  constructor(props) {
    super(props);
    this.uuid=uuidv4();
    this.state={position:null}
  };

  setPosition(position){
    this.setState({position})
  }

  render() {
    const view = this.state.position == undefined ? <PositionSelectionView positionSetter={(pos)=>{this.setPosition(pos)}} uuid={this.uuid}/> : <NavigatorView/>;
  	return view;
  }
}

export default connect(mapStateToProps)(App)
