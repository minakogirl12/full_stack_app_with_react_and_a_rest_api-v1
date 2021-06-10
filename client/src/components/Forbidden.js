//Displays a message letting the user know that they can't access the requested page
import React from 'react';
import { Link } from 'react-router-dom';

export default () =>
(
    <div className="wrap">
        <h2>Forbidden</h2>
        <p>Oh oh! You can't access this page.</p>
        <p>Please <Link to="/signin">log in</Link> or <Link to="/signup">create an account</Link></p>
    </div>
)