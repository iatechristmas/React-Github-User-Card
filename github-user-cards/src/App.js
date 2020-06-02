import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Card from "./Card";

class App extends Component {
  state = {
    friends: [],
  };

  componentDidMount() {
    axios
      .get("https://api.github.com/users/iatechristmas/followers")
      .then((res) => {
        this.setState({
          friends: res.data,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Github pals</h1>
          {/* <button onClick={this.getFriends}>Get my friends</button> */}
          <div>
            {/* {console.log("friends outside map", this.state.friends)} */}
            {this.state.friends.map((friend) => (
              <div>
                <Card friend={friend} />
                {/* {console.log("friend inside map", friend)} */}
              </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
