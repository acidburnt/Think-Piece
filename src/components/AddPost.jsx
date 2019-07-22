import React, { useState, useContext } from 'react';
import { firestore } from '../firebase';
import { UserContext } from '../providers/UserProvider';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user = useContext(UserContext);

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  const handleChangeContent = e => {
    setContent(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { uid, displayName, email, photoURL } = user || {};

    console.log(displayName);
    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date()
    };

    firestore.collection('posts').add(post);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="AddPost">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={handleChangeTitle}
      />
      <input
        type="text"
        name="content"
        placeholder="Body"
        value={content}
        onChange={handleChangeContent}
      />
      <input className="create" type="submit" value="Create Post" />
    </form>
  );
};

export default AddPost;
