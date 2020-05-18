import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventTable from './components/Event';
import EventForm from './components/Form';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isLoading:true,
      eventItems:[],
      selectedEvent:null,
    }
    this.refreshEvents = this.refreshEvents.bind(this);
  }

  async componentDidMount() {
    this.refreshEvents();
  }

  async refreshEvents(){
    try {
      const response = await fetch('https://4jkbhwdpoi.execute-api.us-east-1.amazonaws.com/events');
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState(
        {
          isLoading: false,
          eventItems: responseJson
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  render(){
    return <div className="event">
        <header>
          Welcome to the Ride-and-Drive Event Database!
        </header>
        <EventTable refreshEvents={this.refreshEvents} eventItems={this.state.eventItems}/>

      </div>
  }
}

export default App;
