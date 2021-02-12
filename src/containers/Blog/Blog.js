import React, { Component, Suspense } from "react";
import "./Blog.css";
import Posts from "./Posts/Posts";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import asyncComponent from "../../hoc/asyncComponent";

// const AsyncNewPost = React.lazy(() => import("./NewPost/NewPost"));
const AsyncNewPost = asyncComponent(() => import("./NewPost/NewPost"));
class Blog extends Component {
  state = {
    auth: true,
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" exact component={AsyncNewPost} />
          ) : null}

          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts" />
        </Switch>
        {/* </Suspense> */}
      </div>
    );
  }
}

export default Blog;
