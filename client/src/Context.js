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
        };

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>  
        );
    }

    //sign in - signIn user and set cookie
    //sign out - sign out user and delete cookie
    signIn = () => {};
    signOut = () => {};
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

  