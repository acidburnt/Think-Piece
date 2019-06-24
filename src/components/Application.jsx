import React, { useState, useEffect } from 'react';
import Authentication from './Authentication';
import { firestore, auth } from '../firebase';
import { collectIdsAndDocs } from '../utils';

import Posts from './Posts';

const Application = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection('posts')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectIdsAndDocs);
        setPosts(posts);
      });

    const unsubscribeFromAuth = auth.onAuthStateChanged(user => setUser(user));

    return () => {
      unsubscribeFromFirestore();
      unsubscribeFromAuth();
    };
  }, [posts, user]);

  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Authentication user={user} />
      <Posts posts={posts} />
    </main>
  );
};

export default Application;
