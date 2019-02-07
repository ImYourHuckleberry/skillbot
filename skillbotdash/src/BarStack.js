import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { VictoryBar, VictoryTheme, VictoryChart, VictoryPie,VictoryAxis,VictoryStack  } from "victory";

import CardstackView from "./CardstackView.js";

class BarStack extends Component {
  render() {
    const { skillData,dispatch } = this.props;
    
    let skillArray=[]
    let skillArrayIntermediate=[]
    let skillArrayExpert=[]
    
    const getAllSkills = skillData.map(data=>(data.skills.map(skills=>(skillArray.push(skills.skills)))))
    
    const howManySkills=skillData.map(skills=>skills.skills.map(skill=>skill.skills).length)


    let counted = []
    let countedIntermediate=[]
    let countedExpert=[]

    for (let c of skillArray) {
      const alreadyCounted = counted.map(c => c.name)
      if (alreadyCounted.includes(c)) {
        counted[alreadyCounted.indexOf(c)].count += 1
      } else {
        counted.push({ 'name': c, 'count': 1})
      }
    }

    for (let c of skillArray) {
      const alreadyCounted = counted.map(c => c.name)
      if (alreadyCounted.includes(c)) {
        counted[alreadyCounted.indexOf(c)].count += 1
      } else {
        counted.push({ 'name': c, 'count': 1})
      }
    }

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
// console.log(getAllSkills)
//     console.log(skillArray)
//     console.log(counted)
    console.log(howManySkills)
    return (
      <div>
      

      <div style={{ display: "flex", flexWrap: "wrap"}}>
      SKILL FREQUENCY
     
      <VictoryChart
      width={1000} 
      height={1000}
   
      domainPadding={20}
      padding={{  top: 30, bottom: 30,left: 200, right: 100 }}
      
      >
      
      <VictoryBar
       
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 }
        }}
        style={{ data: { fill: "#c43a31" } }}
        labels={(d) => `Frequency: ${d.count}`}
          data={counted}
          
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

export default connect(mapStatetoProps)(BarStack);
