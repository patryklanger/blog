import React, { Component } from "react";
import "./FullPost.css";
import axios from "axios";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  deletePostHandler = () => {
    axios
      .delete("/posts/" + this.props.postId)
      .then((response) => console.log(response));
  };

  fetchDataHandler = () => {
    if (Number.parseInt(this.props.match.params.id) > 0) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !==
            Number.parseInt(this.props.match.params.id))
      ) {
        axios
          .get("/posts/" + Number.parseInt(this.props.match.params.id))
          .then((response) => this.setState({ loadedPost: response.data }));
      }
    }
  };

  componentDidUpdate() {
    console.log("componentDidUpdate");
    this.fetchDataHandler();
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.fetchDataHandler();
  }

  render() {
    let post = <p>Please select a Post!</p>;
    if (Number.parseInt(this.props.match.params.id) > 0) <p>Loading...</p>;
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}
export default FullPost;
