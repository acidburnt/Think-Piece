import React, { useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Authentication from './Authentication';
import Posts from './Posts';
import UserProfile from './UserProfile';
import PostPage from './PostPage';
import { UserContext } from '../providers/UserProvider';

const Application = () => {
  const user = useContext(UserContext);
  return (
    <main className="Application">
      <nav className="Nav">
        <Link to="/">
          <h1>Think Piece</h1>
        </Link>
        <div>
          {user && (
            <>
              <Link to="/profile">Profile</Link>
              <span>&nbsp;|&nbsp;</span>
            </>
          )}
          <Link to="/login">Login / Logout</Link>
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/posts/:id" component={PostPage} />
        <Route path="/login" component={Authentication} />
      </Switch>
    </main>
  );
};

export default Application;
