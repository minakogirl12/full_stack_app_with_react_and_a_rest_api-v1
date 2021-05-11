//Displays the top menu bar for the application and included buttons for signing in and signing up
// or the user's name and a button for signing out

import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
    render(){

        return(
            <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                    <ul className="header--signedout">
                        <li><a href="sign-up.html">Sign Up</a></li>
                        <li><a href="sign-in.html">Sign In</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        )
    }
}