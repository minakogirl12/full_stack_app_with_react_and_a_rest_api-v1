import React, {Component} from 'react';

export default class CourseDetail extends Component{
    state = {
        course: {},
        user: {}
    }
    componentDidMount(){
         this.course();
    }
    render(){
        
        const data = this.state.course;
        const user = this.state.user;
        //console.log(data.length);

        //user information to determine whether or not to render Update Course and Delete Course buttons
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        console.log(authUser);

        //Set place holder text for empty fields
       let estimatedTime = 'TBD';
        if(data.estimatedTime){
            estimatedTime = data.estimatedTime;
        }

        //if materials exist split into an array otherwise put TBD
        let materials = [];
        if(data.materialsNeeded){
            materials = data.materialsNeeded.split(',');
        }
        else{
            materials = ['TBD or no materials needed'];
        }
        
        return(
            <main>
            <div className="actions--bar">
            <div className="wrap">
                {
                    authUser ?
                    this.CourseOptions(authUser, user.id, data.id)
                    :
                    <a className="button button-secondary" href="/">Return to List</a>  
                } 
             </div>
            </div>
            <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{data.title}</h4>
                        <p>{`${user.firstName} ${user.lastName}`}</p>

                        <p>{data.description}</p>
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ul className="course--detail--list">
                        {materials.map((item, index) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                         })}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
        </main>
        )

    }

    CourseOptions = (authUser, userId, courseId) => {
            if(authUser.id === userId){
                return(
                    <div>
                         <a className="button" href={`/courses/${courseId}/update`}>Update Course</a>
                        <button className="button" onClick={this.delete}>Delete Course</button>
                        <a className="button button-secondary" href="/">Return to List</a>
                    </div>
                )
            }
            else{
                return(<a className="button button-secondary" href="/">Return to List</a>);
            }
        }
     

    course = () => {
        // use the prop to get the courses
       // console.log(this.props.match.params.id);
        this.props.context.data.getCourse(this.props.match.params.id)
        .then((data) => {
            //if data not exist redirect to notfound route
            //console.log(data);

                this.setState({course: data[0], user: data[0].user});
                   
        })
        .catch(err =>
            {
                //if not data redirect to not found
                console.log(err);
                this.props.history.push('/notfound');
            }
            );
    }

    delete = () => {
        //confirm deletion
       if(window.confirm("Are you sure you want to delete this course?"))
       {
           //verify user can delete data
           const {context} = this.props;
           const authUser = context.authenticatedUser;
           const id = this.props.match.params.id;
            if(authUser){
                context.data.deleteCourse(id, authUser.emailAddress, authUser.password)
                .then(() => {
                
                    //redirect to home on successful deletion
                    this.props.history.push('/');
        
                })
                .catch(() => {
               //handle rejected promises
                //navigate to the error route using the history object
                this.props.history.push('/error'); // push to history stack
                });
            }
            else{
                this.props.history.push('/forbidden');
            }
           
          
       }
    }
}