import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Card from "./Card";
import styled from "styled-components";

const ChildCards = styled.div`
  background-color: white;
  padding: 2%;
  width: 60%;
  margin-bottom: 5%;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 1);
  border-radius: 5px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
`;

const ParentCards = styled.div`
  background-color: white;
  padding: 2%;
  width: 60%;
  margin-bottom: 5%;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 1);
  border-radius: 5px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      parentUser: "iatechristmas",
      parentData: [],
      followers: [],
    };
  }

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/${this.state.parentUser}/followers`)
      .then((res) => {
        this.setState({
          followers: res.data,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Github pals</h1>
          {console.log("parent data", this.state.parentData)}
          {console.log("follower data", this.state.followers)}
          {/* <ParentCards>
            <Card parentData={this.state.parentData} />
          </ParentCards> */}

          <ChildCards>
            {/* {console.log("friends outside map", this.state.friends)} */}
            {this.state.followers.map((follower) => (
              <div>
                <Card user={follower} />
                {/* {console.log("friend inside map", friend)} */}
              </div>
            ))}
          </ChildCards>

          {/* <button onClick={this.getFriends}>Get my friends</button> */}
        </header>
      </div>
    );
  }
}

export default App;
