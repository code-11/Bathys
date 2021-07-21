import React, { Component } from "react";

import DevelopmentTest from './developmentTest';
import TestWrapper from "./TestWrapper";

export default class TestApp extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const allTests=[
      <TestWrapper key="devTest" ref="devTest" name="Development Test" runFunc={(new DevelopmentTest()).run}/>,
    ];

    const runAllTests=()=>{
      this.refs.devTest.run();
    }

    return <div>
              <h1> Test </h1>
              <button onClick={runAllTests}>Click Me!</button>
              {allTests}
            </div>
  }
}
