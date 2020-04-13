import React, { Component } from "react";
import {render} from 'react-dom'
import {moveSub} from '../actions/index';
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const { board,subLoc } = state;
  const subLocX=subLoc!=undefined ? subLoc.x : 0;
  const subLocY=subLoc!=undefined ? subLoc.y : 0;
  return {board,subLocX,subLocY};
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
  }

  getColor(tile){
      if(!tile.explored){
        return "grey";
      }else{
        return tile.color
      }
  }

  render() {
    // return <h1>TEST</h1>;
    const {className,style,subLocX,subLocY,board, bufferRatio} = this.props;
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
        const tile = board[i][j];
        grid.push(<div key={i+"-"+j} onClick={this.tileOnClick} style={{left:(xPos*100)+"%", top:(yPos*100)+"%", width:(tileWidthPerc)+"%", height:(tileHeightPerc)+"%",backgroundColor:this.getColor(tile), position:"absolute"}}></div>);

        if(subLocX==i && subLocY==j){
          grid.push(<div key="sub" style={{left:(xPos*100)+(tileWidthPerc/3)+"%", top:(yPos*100)+(tileHeightPerc/3)+"%", width:(tileWidthPerc/3)+"%", height:(tileHeightPerc/3)+"%",backgroundColor:"black", position:"absolute"}}></div>);
        }
      }
    }
    return (
      <div className={className} style={style}> {grid} </div>
    );
  }
}

export default connect(mapStateToProps)(Grid)
