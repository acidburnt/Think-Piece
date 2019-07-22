import React, { useState, useRef } from 'react';
import { auth, firestore, storage } from '../firebase';

const UserProfile = () => {
  const [displayName, setDisplayName] = useState('');
  let imageInput = useRef(null);

  const handleChange = event => {
    const { value } = event.target;
    setDisplayName(value);
  };

  const handleSubmit = event => {
    const uid = auth.currentUser && auth.currentUser.uid;
    const userRef = firestore.doc(`users/${uid}`);
    const file = imageInput.current && imageInput.current.files[0];
    event.preventDefault();
    if (displayName) {
      userRef.update({ displayName });
    }
    if (file) {
      storage
        .ref()
        .child('user-profiles')
        .child(uid)
        .child(file.name)
        .put(file)
        .then(response => response.ref.getDownloadURL())
        .then(photoURL => userRef.update({ photoURL }));
    }
  };

  return (
    <section className="UserProfile">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={displayName}
          name="displayName"
          onChange={handleChange}
          placeholder="Display name"
        />
        <input type="file" ref={ref => (imageInput.current = ref)} />
        <input type="submit" className="update" />
      </form>
    </section>
  );
};

export default UserProfile;
