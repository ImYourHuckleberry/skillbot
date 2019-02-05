import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { VictoryBar, VictoryTheme, VictoryChart, VictoryPie } from "victory";

import CardstackView from "./CardstackView.js";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Search from "./Search"
import Scatter from "./Scatter"
class App extends Component {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { dispatch } = this.props;
    const url = "/notes/";
    dispatch({
      type: "FETCH_DATA"
    });
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        dispatch({
          type: "LOAD_DATA",
          payload: data
        });
      });
  };

  render() {
    const { skillData } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          {/* <div>USER SKILL PIE CHART</div>
          <PieChart /> */}
          {/* <Scatter/> */}
          <BarChart />
          <div>
          <Search />
          <CardstackView />
          </div>
        </header>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  skillData: state.data
});

export default connect(mapStatetoProps)(App);
