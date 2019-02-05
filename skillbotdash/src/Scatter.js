
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { VictoryTheme, VictoryChart, VictoryScatter } from "victory";

import CardstackView from "./CardstackView.js"

class Scatter extends Component {

  render() {
    const { skillData, skillCountArray } = this.props;

    return (
      
      
        <VictoryChart
        theme={VictoryTheme.material}
        // domain={{ x: [0, 5], y: [0, 7] }}
      >
        <VictoryScatter
          style={{ data: { fill: "#c43a31" } }}
          size={7}
          data={skillData}

          x={skillCountArray => skillCountArray.name}
          y="name"
        />
      </VictoryChart>
          
      
    );
  }
}

const mapStatetoProps = state => ({
  skillData: state.data,
  skillCountArray:state.skillCountArray,
});

export default connect(mapStatetoProps)(Scatter);
