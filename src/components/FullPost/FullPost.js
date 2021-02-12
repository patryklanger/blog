import React, { Component } from "react";
import "./FullPost.css";
import axios from "axios";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  deletePostHandler = () => {
    axios
      .delete("https://jsonplaceholder.typicode.com/posts/" + this.props.postId)
      .then((response) => console.log(response));
  };

  componentDidUpdate() {
    if (this.props.postId > 0) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== this.props.postId)
      ) {
        axios
          .get(
            "https://jsonplaceholder.typicode.com/posts/" + this.props.postId
          )
          .then((response) => this.setState({ loadedPost: response.data }));
      }
    }
  }
  render() {
    let post = <p>Please select a Post!</p>;
    if (this.props.postId > 0) <p>Loading...</p>;
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
