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

        //Set place holder text for empty fields
       let estimatedTime = 'TBD';
        if(data.estimatedTime){
            estimatedTime = data.estimatedTime;
        }

        //if materials exist split into an array otherwise put TBD
        let materials = [];
        if(data.materials){
            materials = data.materials.split(',');
        }
        else{
            materials = ['TBD or no materials needed'];
        }
        
        return(
            <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`/courses/${data.id}/update`}>Update Course</a>
                    <button className="button" onClick={this.delete}>Delete Course</button>
                    <a className="button button-secondary" href="/">Return to List</a>
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
           if(false){
                //delete course and redirect main page, pop up course deleted if successful
            }
           //else redirect to forbidden
           else{
            this.props.history.push('/forbidden');
           }
           console.log('So you want to delete this file!');
       }
    }
}