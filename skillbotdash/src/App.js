import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";

import MyForm from "./MyForm"
import CardstackView from "./CardstackView.js";

import BarChart from "./BarChart";
import Search from "./Search"

import { VictoryStack } from "victory";
import BarStack from "./BarStack";


class App extends Component {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { dispatch } = this.props;
    const url = "/notes";
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
          <BarStack/>
          <BarChart />
          <div style={{margin:"5%"}}>
          <Search />
          <CardstackView />
          
          
          </div>
          
        </header>
        <div><MyForm/></div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  skillData: state.data
});

export default connect(mapStatetoProps)(App);
