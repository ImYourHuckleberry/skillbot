
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { VictoryBar, VictoryChart, VictoryPie } from "victory";

import CardstackView from "./CardstackView.js"

class PieChart extends Component {

  render() {
    const { skillData } = this.props;

    return (
      
      
          <svg viewBox="-100 0 400 400">
          <div>USER SKILL PIE CHART</div>
            <VictoryPie
              standalone={false}
              colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
              style={{
                margin: "20px",
                labels: { fontSize: 2, fill: "white" }
              }}
              height={200}
              width={200}
              data={skillData}
              x="name"
              y={skillData => skillData.skills.length}
            />
          </svg>
          
      
    );
  }
}

const mapStatetoProps = state => ({
  skillData: state.data,
});

export default connect(mapStatetoProps)(PieChart);
