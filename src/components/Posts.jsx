import React, { useContext } from 'react';
import Post from './Post';
import AddPost from './AddPost';
import { PostsContext } from '../providers/PostsProvider';
import { UserContext } from '../providers/UserProvider';

const Posts = () => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);

  const sortedPosts = posts.sort(
    (a, b) => a.createdAt.seconds > b.createdAt.seconds && -1
  );
  return (
    <section className="Posts">
      {user && <AddPost />}
      {sortedPosts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;
