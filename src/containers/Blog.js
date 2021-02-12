import React, { Component } from "react";
import FullPost from "../components/FullPost/FullPost";
import Post from "../components/Post/Post";
import "./Blog.css";
import NewPost from "../components/NewPost/NewPost";
import axios from "axios";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: -1,
    error: false,
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max",
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((error) => this.setState({ error: true }));
  }
  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p>Something went wrong buddy!</p>;
    if (this.state.error === false)
      posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });

    return (
      <div>
        <section className="Posts">{posts}</section>
        <FullPost postId={this.state.selectedPostId} />
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
