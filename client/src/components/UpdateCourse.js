// renders a form that allows a user to update one of their existing courses
import React, {Component} from 'react';
import Form from './Form';

export default class UpdateCourse extends Component{
    state = {
        user: {},
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }
    componentDidMount(){
         this.course();
    }
    render(){
        const user = this.state.user;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;
        return(
            <div className="wrap">
            

            <Form 
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitText="Update Course"
                elements={() => (
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" value={title} onChange={this.change}  />

                            <p>By {user.firstName} {user.lastName}</p>

                            <label htmlFor="description">Course Description</label>
                            <textarea id="dDescription" name="description" value={description} onChange={this.change} ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={this.change} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" placeholder="Please separate items by comma..." value={materialsNeeded} onChange={this.change} ></textarea>
                        </div>
                    </div>
                )}
            />
       
        </div>
        )

    }

    course = () => {
        // use the prop to get the courses
       // console.log(this.props.match.params.id);
        this.props.context.data.getCourse(this.props.match.params.id)
        .then((data) => {
            //if data not exist redirect to notfound route
            //console.log(data);

                this.setState({
                    user: data[0].user,
                    title: data[0].title,
                    description: data[0].description,
                    estimatedTime: data[0].estimatedTime,
                    materialsNeeded: data[0].materialsNeeded,
                });
                   
        })
        .catch(err =>
            {
                //if not data redirect to not found
                console.log(err);
                this.props.history.push('/notfound');
            }
            );
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

      submit = () => {
        //access context and authenticated user information
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const id = this.props.match.params.id;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;
        const course = {title, description, estimatedTime, materialsNeeded, id};
        
       
        context.data.updateCourse(authUser.emailAddress, authUser.password, course)
        .then((errors)=>{
            //if there are errors from creating the user send errors to state
                //no errors mean user was created successfully
                if(errors.length){
                    this.setState({errors});
                }
                else{
                    console.log(`Course update!`);
                    this.props.history.push(`/courses/${id}`);
                }

        })
        .catch( () => {
            //handle rejected promises
            //navigate to the error route using the history object
            this.props.history.push('/error'); // push to history stack
        });
       
    }

      cancel = () => {
          const id = this.props.match.params.id;
            this.props.history.push(`/courses/${id}`);
    }
}