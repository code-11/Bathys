import React, { Component } from "react";
import {render} from 'react-dom'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { screenWidth: 0, screenHeight: 0 };
    this.updateDimensions = this.updateDimensions.bind(this);
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    // const height = this.divElement.clientHeight;
    // const width = this.divElement.clientWidth;
    // this.setState({ screenWidth:width, screenHeight:height });
  }

  render() {
    return <h1>TEST</h1>;
    // const {xTiles, yTiles, bufferRatio} = this.props;
    // const {screenWidth, screenHeight} = this.state;
    //
    // const fatTileWidth = screenWidth/xTiles;
    // const bufferWidth =Math.round(bufferRatio * fatTileWidth/2);
    // const tileWidth = Math.round(((1-bufferRatio) * fatTileWidth)-1);
    //
    // const fatTileHeight = screenHeight/yTiles;
    // const bufferHeight =Math.round(bufferRatio * fatTileHeight/2);
    // const tileHeight = Math.round(((1-bufferRatio) * fatTileHeight)-1);
    //
    // const marginStr = bufferHeight+"px "+bufferWidth+"px "+bufferHeight+"px "+bufferWidth+"px";
    //
    // const grid=[];
    // for(let i=0;i<xTiles;i+=1){
    //   const line=[];
    //   for(let j=0;j<yTiles;j+=1){
    //     line.push(<div key={j} style={{width:tileWidth, height:tileHeight,backgroundColor:"red", margin:marginStr}}></div>);
    //   }
    //   grid.push(<div key={i}>{line}</div>)
    // }
    // return (
    //   <div ref={ (divElement) => { this.divElement = divElement } } style={{display: "flex"}}> {grid} </div>
    // );
  }
}
