import {getBoard} from '../actions/index';
import React, { Component } from "react";
import { connect } from 'react-redux'
import Grid from "./Grid"

function mapStateToProps(state) {
  return {}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getBoard()).then( board=>{
      const y=0;
    });
  };

  render() {
  	return (
      <Grid xTiles={20} yTiles={10} bufferRatio={.07}/>
  	);
  }
}

export default connect(mapStateToProps)(App)
