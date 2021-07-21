import React, { Component } from "react";

export default class TestWrapper extends Component{
  constructor(props){
    super(props);
    this.state={
      result:null,
    }
    // this.run=this.run.bind(this);
  }

  run(){
    this.props.runFunc().then((res)=>{
      this.setState({result:res});
    })
  }

  render(){
    const {name} = this.props;
    const {result}= this.state;
    return <div>
      <h2> {name} </h2>
      <p> {result==null?"Unrun":(new Boolean(result)).toString()}</p>
      </div>

  }
}
