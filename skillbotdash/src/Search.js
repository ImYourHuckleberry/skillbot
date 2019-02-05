import React, { Component } from "react";

import "./App.css";
import { connect } from "react-redux";


class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSkillChange = this.handleSkillChange.bind(this);
    }
   

    handleChange(e) {
        const{dispatch}=this.props
        console.log("fired")
        dispatch({
            type:"FILTER",
            payload:e.target.value
        })
        
    }
    handleSkillChange(e) {
        const{dispatch}=this.props
        console.log("fired")
        dispatch({
            type:"SKILL_FILTER",
            payload:e.target.value
        })
        
    }

    
  render() {
    const { skillData, filtered } = this.props;

    return (
        <div>
      <div>
        <input
          onChange={this.handleChange}
          type="text"
          className="input"
          placeholder="Search People or Skill..."
        />
      </div>
       {/* <div>
       <input
         onChange={this.handleSkillChange}
         type="text"
         className="input"
         placeholder="Search Skills..."
       />
     </div> */}
     </div>
    );
  }
}

const mapStatetoProps = state => ({
  skillData: state.data,
  filtered: state.filtered
});
export default connect(mapStatetoProps)(Search);
