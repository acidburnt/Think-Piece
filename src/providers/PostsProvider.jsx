import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utils';

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection('posts')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectIdsAndDocs);
        setPosts(posts);
      });

    return () => {
      unsubscribeFromFirestore();
    };
  }, []);

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};

export default PostsProvider;
