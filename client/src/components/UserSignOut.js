//Signs out authenticated user an redirects the user to the default route
// Adapted from previous Treehouse project

import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
  context.actions.signOut();

  return (
    <Redirect to="/" />
  );
}
