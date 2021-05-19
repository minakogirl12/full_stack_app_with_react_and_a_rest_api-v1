
import './App.css';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

//import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

//Error routes
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

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
          <Route exact path='/' component={CoursesWithContext} />
          <Route path='/courses/:id' component={CourseDetailWithContext} />
          <Route path='/notfound' component={NotFound} />
          <Route path='/forbidden' component={Forbidden} />
          <Route path='/error' component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
