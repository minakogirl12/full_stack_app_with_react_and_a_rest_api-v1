import React, {Component} from 'react';
import Form from './Form'

export default class CreateCourse extends Component {
    
    
    render()
   { 
       
        return(
            <div className="wrap">
            <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value="" />

                            <p>By Joe Smith</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value=""/>

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                <Form />
            </div>
        )
    }
}