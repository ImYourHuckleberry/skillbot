import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { VictoryBar, VictoryTheme, VictoryChart, VictoryPie,VictoryAxis,VictoryStack  } from "victory";

import CardstackView from "./CardstackView.js";

class BarChart extends Component {
  render() {
    const { skillData,dispatch } = this.props;
    let skillArray=[]
    
    const getAllSkills = skillData.map(data=>(data.skills.map(skills=>(skillArray.push(skills)))))
    
    let counted = []
    for (let c of skillArray) {
      const alreadyCounted = counted.map(c => c.name)
      if (alreadyCounted.includes(c)) {
        counted[alreadyCounted.indexOf(c)].count += 1
      } else {
        counted.push({ 'name': c, 'count': 1})
      }
    }
    dispatch({
      type:"LOAD_SKILL_COUNT_ARRAY",
      payload: counted
    })

    console.log(skillArray)
    console.log(counted)
    
    return (
      <div>
      <div style={{ display: "flex", flexWrap: "wrap", width:"1500px"}}>
      USER SKILL BAR GRAPH
      <VictoryChart
      width={1000} 
      height={500}
      
      domainPadding={20}
      padding={{  top: 30, bottom: 30,left: 200, right: 100 }}
      
      >
      
        <VictoryBar
        horizontal
        style={{ data: { fill: "#c43a31" } }}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
          data={skillData}
          sortKey="y"
          x="name"
          labels={(skillData) => `Skill Count: ${skillData.skills.length}`}
          y={skillData => skillData.skills.length}
        />
        
      </VictoryChart>
      </div>









      <div style={{ display: "flex", flexWrap: "wrap"}}>
      SKILL FREQUENCY
      <VictoryChart
      width={1000} 
      height={1000}
   
      domainPadding={20}
      padding={{  top: 30, bottom: 30,left: 200, right: 100 }}
      
      >
      
      <VictoryBar
        horizontal
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        style={{ data: { fill: "#c43a31" } }}
        labels={(d) => `Frequency: ${d.count}`}
          data={counted}
          sortKey="y"
          x="name"
          y="count"
        />
        
      </VictoryChart>
      </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  skillData: state.reducer.data
});

export default connect(mapStatetoProps)(BarChart);
