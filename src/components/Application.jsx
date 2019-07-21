import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Authentication from './Authentication';
import Posts from './Posts';
import UserProfile from './UserProfile';
import PostPage from './PostPage';

const Application = () => {
  return (
    <main className="Application">
      <Link to="/">
        <h1>Think Piece</h1>
      </Link>
      <Authentication />
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/posts/:id" component={PostPage} />
      </Switch>
    </main>
  );
};

export default Application;
