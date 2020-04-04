import {getBoard} from '../actions/index';
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
  };

  render() {
  	return (
      <Grid board={this.props.board} xSize={1250} ySize={500} bufferRatio={.07}/>
  	);
  }
}

export default connect(mapStateToProps)(App)
