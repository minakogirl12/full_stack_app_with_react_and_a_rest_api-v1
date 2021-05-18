
import './App.css';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

//import components
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'

//imports
import withContext from './Context';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail)

class App extends Component{

  render ()
  {
   
    console.log();
    return (
      <BrowserRouter>
        <div>
          <Header />
          
        
        <Switch>
          <Route path='/index' component={CoursesWithContext} />
          <Route path='/courses/:id' component={CourseDetailWithContext} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
