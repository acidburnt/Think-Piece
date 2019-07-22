import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import { collectIdsAndDocs } from '../utils';

const PostPage = props => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const user = useContext(UserContext);

  const postId = props.match.params.id;
  const postRef = firestore.doc(`posts/${postId}`);
  const commentsRef = postRef.collection('comments');

  const createComment = comment => {
    commentsRef.add({ ...comment, user });
  };

  useEffect(() => {
    const unsubscribeFromComments = commentsRef.onSnapshot(snap => {
      const comments = snap.docs.map(collectIdsAndDocs);
      setComments(comments);
    });
    const unsubscribeFromPost = postRef.onSnapshot(snap => {
      const post = collectIdsAndDocs(snap);
      setPost(post);
    });

    return () => {
      unsubscribeFromComments();
      unsubscribeFromPost();
    };
  }, []);

  return (
    <section>
      {post && <Post {...post} />}
      <Comments comments={comments} onCreate={createComment} />
    </section>
  );
};

export default withRouter(PostPage);
