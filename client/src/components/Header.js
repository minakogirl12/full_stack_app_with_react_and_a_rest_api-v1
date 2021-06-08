//Displays the top menu bar for the application and included buttons for signing in and signing up
// or the user's name and a button for signing out

import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent  {
   
   
    render(){
    const {context} = this.props;
    const authUser = context.authenticatedUser;

    console.log(authUser);
    
        return(
            <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                <nav>
                { authUser ? 
                    <ul className="header--signedin">
                        <span>Welcome, {authUser.firstName} {authUser.lastName}! </span>
                        <Link to="/signout">Sign Out</Link>
                   </ul>
                :
                <ul className="header--signedout">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                </ul>
                }  
                </nav>
            </div>
        </header>
        )
    }
}