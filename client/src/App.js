
import './App.css';
import {Component} from 'react';

//import components
import Header from './components/Header'


class App extends Component{
//load initial data for testing
constructor(){
  super();
  this.state ={
    data: [],
  }
}
componentDidMount(){
  this.getData();
}

 getData(){
    fetch('http://localhost:5000/api/courses')
    .then(response => response.json()
    .then(data => {
      console.log(data);
      this.setState({data});
    }));
    
  }

  render ()
  {
    return (
      <div>
        <Header />
        <ul>
          {
            this.state.data.map(photo => <li key={photo.id}>{photo.title}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default App;
