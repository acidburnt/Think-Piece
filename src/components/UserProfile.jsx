import React from 'react';
import { auth, firestore } from '../firebase';

export default class UserProfile extends React.Component {
  state = { displayName: '' };
  imageInput = null;

  componentDidMount() {}

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { displayName } = this.state;

    if (displayName) {
      this.userRef.update({ displayName });
    }
  };

  render() {
    const { displayName } = this.state;
    return (
      <section className="UserProfile">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={displayName}
            name="displayName"
            onChange={this.handleChange}
            placeholder="Display name"
          />
          <input type="file" ref={ref => (this.imageInput = ref)} />
          <input type="submit" className="update" />
        </form>
      </section>
    );
  }
}
