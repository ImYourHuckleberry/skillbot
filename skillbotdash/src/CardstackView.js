import React, { Component } from "react";
import CardStack from "react-cardstack/dist/CardStack";
import Card from "react-cardstack/dist/Card";
import { connect } from "react-redux";
import { Tooltip } from "react-tippy";

class CardstackView extends Component {
  state = {
    hasBeenClicked: []
  };
  compare = (a, b) => {
    if (a.toUpperCase() < b.toUpperCase()) return -1;
    if (a.toUpperCase() > b.toUpperCase()) return 1;
    return 0;
  };

  handleClick = n => {
    console.log("Value of n during handleClick:", n);
    const foundVal = this.state.hasBeenClicked.find(val => val === n);
    if (foundVal !== undefined) {
      this.setState({
        hasBeenClicked: this.state.hasBeenClicked.filter(
          val => val !== foundVal
        )
      });
    } else {
      this.setState({ hasBeenClicked: this.state.hasBeenClicked.concat(n) });
    }
    console.log(n);
    console.log(this.state.hasBeenClicked);
  };

  render() {
    const { skillData, isFetching, filtered , skill_filter} = this.props;

    const skillDataSorted = skillData.sort(
      (first, second) => first.name.localeCompare(second.name)
     );

    const skillFilter = skillData.filter(data=>data.skills.map(skill=>skill.skills).toString().includes(filtered)||data.name.includes(filtered))

 //   const skillFilter = skillData.filter(data=>data.skills.toString().includes(filtered)||data.name.includes(filtered))
     
    return (
      <div>SKILL BREAKDOWN BY USER



{filtered.length>0||skill_filter.length>0 ?  


<div className="user-breakdown" style={{margin:"20px"}}>
{skillFilter.map((data, index) => (
  <div
    key={data.name}
    style={{
      color: "#93a1a1",

      display: "flex",
      flexDirection: "column"
    }}
  >
    <div
      key={data.name}
      style={{
        color: "#93a1a1",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        textAlign: "justify"
      }}
    >
      <div
        onClick={() => this.handleClick(index)}
        style={{ marginRight: "40px", minWidth: "70px" }}
      >
        {data.name}
      </div>

      <div>
        <div
          style={{
            color: "#cb4b16",
            paddingLeft: "20px"
          }}
        >
          {data.skills.length}
        </div>
      </div>
    </div>
    {this.state.hasBeenClicked.includes(index) ? (
      <div
        key={index}
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          key={data.name}
          style={{
            color: "#cb4b16",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "15px",
            padding: "0",
            fontWeight: "500",
            textAlign:"left"
          }}
        >
         {data.skills.map(skills => (
                      <div className="cardStackSkillProf"><div>{skills.skills}</div><div>{skills.proficiency[0].proficiency}</div></div>
                    ))}
        </div>
      </div>
    ) : (
      ""
    )}
  </div>
))}
</div>:
        <div className="user-breakdown">
          {skillData.map((data, index) => (
            <div
              key={data.name}
              style={{
                color: "#93a1a1",

                display: "flex",
                flexDirection: "column"
              }}
            >
              <div
                key={data.name}
                style={{
                  color: "#93a1a1",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  textAlign: "justify"
                }}
              >
                <div
                  onClick={() => this.handleClick(index)}
                  style={{ marginRight: "40px", minWidth: "70px" }}
                >
                  {data.name}
                </div>

                <div>
                  <div
                    style={{
                      color: "#cb4b16",
                      paddingLeft: "20px"
                    }}
                  >
                    {data.skills.length}
                  </div>
                </div>
              </div>
              {this.state.hasBeenClicked.includes(index) ? (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div
                    key={data.name}
                    style={{
                      color: "#cb4b16",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      fontSize: "15px",
                      padding: "0",
                      fontWeight: "500",
                      textAlign:"left"
                    }}
                  >
                    {data.skills.map(skills => (
                      <div className="cardStackSkillProf"><div>{skills.skills}</div><div>{skills.proficiency[0].proficiency}</div></div>
                    ))}
                    
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  skillData: state.reducer.data,
  isFetching: state.reducer.isFetching,
  filtered:state.reducer.filtered,
  skill_filter:state.reducer.skill_filtered
});
export default connect(mapStateToProps)(CardstackView);
