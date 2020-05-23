import { buildClient } from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log('LandingPage -> currentUser', currentUser);

  return currentUser ? <h1>Signed in</h1> : <h1>Signed out</h1>;
};

export default LandingPage;
