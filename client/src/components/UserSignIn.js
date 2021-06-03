import React, {Component} from 'react';
import {Link} from 'react-router-dom;'
import Form from './Form';

export default class UserSignIn extends Component{
    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    render(){
        const {emailAddress, password, errors} = this.state;

        return(
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitText="Sign In"
                    elements={() => {
                        <React.Fragment>
                            <label for="emailAddress">Email Address</label>
                            <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={this.change} />
                            <label for="password">Password</label>
                            <input id="password" name="password" type="password" value={password} onChange={this.change} />
                        </React.Fragment>
                    }}

                />
            </div>
        )
    }
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }

    submit = () => {
        const {context} = this.props;
        const {emailAddress, password} = this.state;
        context.actions.signIn(emailAddress, password)
        .then(user => {
          if (user === null){
            this.setState(() => {
              return{errors: ['Sign-in was unsuccessful']}
            });
          }
          else{
            //navigate user to the authenticated route
            this.props.history.push('/');
            console.log(`SUCCESS! ${emailAddress} is now signed in!`)
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    }

    cancel = () => {
        this.props.history.push('/');
      }
}