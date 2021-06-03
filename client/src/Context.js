import React, { Component } from "react";
import Data from './Data';
import Cookies from 'js-cookie'

const Context = React.createContext();

/*
* returns Provider that provides application state and event handlers
*/
export class Provider extends Component{
    constructor(){
        super();
        this.data = new Data();
    }
    state = {
        authenticateUser: Cookies.getJSON('authenticatedUser') || null
    };

    render(){
        const {authenticatedUser} = this.state;

        // 'value' represents object containing the context to be shared
        const value = {
        authenticatedUser,
        data: this.data,
        actions: {
          signIn: this.signIn,
          signOut: this.signOut
        }
        };

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>  
        );
    }

    //Below functions adapted from previous Treehouse project
    //sign in - signIn user and set cookie
    signIn = async (emailAddress, password) => {
      const user = await this.data.getUser(emailAddress, password); //returns authenticated users name and username
      if(user !== null){
        this.setState(() => {
          return {
            authenticatedUser: user,
          }
        });
        //Set cookie
        Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1}); //creat cookie that stores the authenticated users data
        //in above: 1st argument is name of cookie, 2nd argument specifies value to store in cookie, 3rd arugument is for options
      }
      return user;
    };

    //sign out - sign out user and delete cookie
    signOut = () => {
      this.setState({authenticatedUser: null}); //removes the name and username properties from state
    Cookies.remove('authenticatedUser');
    };
}

export const Consumer = Context.Consumer;

//Below copied from previous code
/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

 export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }
  
  //with Context auto connects the component passed to it to all actions and context changes

  