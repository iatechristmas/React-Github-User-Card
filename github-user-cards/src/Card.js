import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components";
import axios from "axios";

const animatedCss = css`
  opacity: 1;
  transform: translateY(0);
`;

const primaryCss = css`
  background-color: #008bf8;
  color: #fff;
`;

const StyledCard = styled.div`
  width: ${(props) => (props.big ? "450px" : "300px")};
  padding: 15px;
  background-color: lightblue;
  opacity: 0;
  transform: translateY(50px);
  transition: 500ms all ease-in-out;
  margin: ${(props) => (props.noMargin ? 0 : "15px")};
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 1);
  border-radius: 5px;
  ${(props) => props.animated && animatedCss}
  ${(props) => props.primary && primaryCss}

  img {
    width: 200px;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 1);
    border-radius: 5px;
    margin: 10%;
  }

  .link {
    text-decoration: none;
    font-size: 1.2rem;
  }
`;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animated: false,
      userFollowers: [],
    };
  }

  componentDidMount() {
    axios.get(`${this.props.user.followers_url}`).then((res) => {
      console.log("res data", res.data);
      this.setState({
        userFollowers: res.data,
      });
    });

    setTimeout(() => {
      this.setState(() => {
        return { animated: true };
      });
    }, this.props.delay);
  }

  render() {
    const {
      delay = 0,
      noAnimation,
      primary,
      noMargin,
      big,
      user,
      ...props
    } = this.props;
    console.log("friend inside card component", user);
    return (
      <StyledCard
        animated={this.state.animated}
        delay={delay}
        primary={primary}
        noAnimation={noAnimation}
        big={big}
        noMargin={noMargin}
        {...props}
      >
        <img src={user.avatar_url} alt="" />
        <h4>{user.login}</h4>
        <p>{user.name}</p>
        {this.state.userFollowers.map((follower) => (
          <p>{follower.login}</p>
        ))}
        <a className="link" href={user.html_url}>
          {user.html_url}
        </a>
      </StyledCard>
    );
  }
}

export default Card;
