
import './App.css';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

//import components
import Header from './components/Header'
import Courses from './components/Courses'

//imports
import withContext from './Context';



class App extends Component{

  render ()
  {
    const CoursesWithContext = withContext(Courses);
    console.log();
    return (
      <BrowserRouter>
        <div>
          <Header />
          
        
        <Switch>
          <Route path='/index.html' component={CoursesWithContext} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
