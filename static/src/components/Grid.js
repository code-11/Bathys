import React, { Component } from "react";
import {render} from 'react-dom'
import {moveSub} from '../actions/index';
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const { board } = state;
  return {board};
}

class Grid extends Component {
  constructor(props) {
    super(props);
    // this.updateDimensions = this.updateDimensions.bind(this);
    this.tileOnClick = this.tileOnClick.bind(this);
  };

  getXTiles(board){
    return Object.keys(board).length;
  }

  getYTiles(board){
    return Object.keys(board[0]).length;
  }

  // componentDidMount() {
  //   this.updateDimensions();
  //   window.addEventListener('resize', this.updateDimensions);
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateDimensions);
  // }

  updateDimensions() {
    // const height = this.divElement.clientHeight;
    // const width = this.divElement.clientWidth;
    // this.setState({ screenWidth:width, screenHeight:height });
  }

  tileOnClick(){
    this.props.dispatch(moveSub("DOWN"));
  }

  render() {
    // return <h1>TEST</h1>;
    const {board, bufferRatio} = this.props;
    if(board==undefined){
      return null;
    }
    const xTiles = this.getXTiles(board);
    const yTiles = this.getYTiles(board);
    // const {screenWidth, screenHeight} = this.state;

    const auWidth  = 1000;
    const auHeight = 1000;


    const fatTileWidth = auWidth/xTiles;
    const bufferWidth =bufferRatio * fatTileWidth/2;
    const tileWidth = ((1-bufferRatio) * fatTileWidth)-1;

    const fatTileHeight = auHeight/yTiles;
    const bufferHeight =bufferRatio * fatTileHeight/2;
    const tileHeight = ((1-bufferRatio) * fatTileHeight)-1;

    const tileWidthPerc = (tileWidth /auWidth)*100;
    const tileHeightPerc= (tileHeight/auHeight)*100;

    const grid=[];
    for(let i=0;i<xTiles;i+=1){
      for(let j=0;j<yTiles;j+=1){
        const xPos = ((i)/(xTiles));
        const yPos = ((j)/(yTiles));
        grid.push(<div key={i+"-"+j} onClick={this.tileOnClick} style={{left:(xPos*100)+"%", top:(yPos*100)+"%", width:(tileWidthPerc)+"%", height:(tileHeightPerc)+"%",backgroundColor:"red", position:"absolute"}}></div>);
      }
    }
    return (
      <div style={{width:"100%", height:"100%"}}> {grid} </div>
    );
  }
}

export default connect(mapStateToProps)(Grid)
