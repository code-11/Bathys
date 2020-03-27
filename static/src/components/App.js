import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const size=5;
    const line=[];
    for(let i=0;i<size;i+=1){
      line.push(<div key={i} style={{width:"200px", height:"200px",backgroundColor:"red", margin:"0px 25px 0px 25px"}}></div>);
    }
  	return (
      <div style={{display: "flex"}}> {line} </div>
  	);
  }
}
