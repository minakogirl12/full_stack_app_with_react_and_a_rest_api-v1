import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmedPassword: '',
        errors: [],
    }
    render(){
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmedPassword,
            errors
        } = this.state;

        return(
            <div className="form--centered">
                    <h2>Sign Up</h2>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <label for="firstName">First Name</label>
                                <input id="firstName" name="firstName" type="text" value={firstName} onChange={this.change} />
                                <label for="lastName">Last Name</label>
                                <input id="lastName" name="lastName" type="text" value={lastName} onChange={this.change} />
                                <label for="emailAddress">Email Address</label>
                                <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={this.change} />
                                <label for="password">Password</label>
                                <input id="password" name="password" type="password" value={password} onChange={this.change} />
                                <label for="confirmPassword">Confirm Password</label>
                                <input id="confirmPassword" name="confirmPassword" type="password" value={confirmedPassword} onChange={this.change} />
                            </React.Fragment>
                        )}
                    />
                    <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
                </div>
        )
    }

    //below adapted for previous Treehouse project
    change = (event) => {
        //keeps track of all changes to data entered into the form
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }

    //Handle form submittal
    submit = () => {
        const {context} = this.props;
        const {
            firstName, lastName, emailAddress, password, confirmedPassword
        } = this.state;
        
        const user = {firstName, lastName, emailAddress, password, confirmedPassword};
        //add if else to push error if passwords don't match
        if(password === confirmedPassword){
            //create a new user
            context.data.creatUser(user)
            .then(errors => {
                //if there are errors from creating the user send errors to state
                //no errors mean user was created successfully
                if(errors.length){
                    this.setState({errors});
                }
                else{
                    console.log(`${emailAddress} is successfully signed up!`);
                    context.actions.signIn(emailAddress, password) //signs in the user after signup
                    .then(() => {
                        this.props.history.push('/'); //redirects to home page
                    });
                }
            })
            .catch( () => {
                //handle rejected promises
                //navigate to the error route using the history object
                this.props.history.push('/error'); // push to history stack
            });
        }
        else{
            this.setState({errors: ['Passwords must match']})
        }
        
    }
    cancel = () => {
        this.props.history.push('/'); //redirects to home route
      }
}