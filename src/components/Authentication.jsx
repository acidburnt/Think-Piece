import React, { useContext } from 'react';
import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';
import { UserContext } from '../providers/UserProvider';

const Authentication = () => {
  const user = useContext(UserContext);
  console.log(user);
  return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;
