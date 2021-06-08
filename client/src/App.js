
import './App.css';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

//import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn'
import UserSignOut from './components/UserSignOut';

//Error routes
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

//imports
import withContext from './Context';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);


class App extends Component{

  render ()
  {
   
    console.log();
    return (
      <BrowserRouter>
        <div>
          <HeaderWithContext />
          
        
        <Switch>
          <Route exact path='/' component={CoursesWithContext} />
          <Route exact path='/courses/create' component={CreateCourse} />
          <Route path='/courses/:id' component={CourseDetailWithContext} />
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path='/signin' component={UserSignInWithContext} />
          <Route path='/signout' component={UserSignOutWithContext} />
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
