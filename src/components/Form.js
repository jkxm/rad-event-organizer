import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class EventForm extends Component {
  constructor(){
    super();
    this.state = {
        eventOrganizer:'',
        eventVenue:'',
        eventDate:''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(){
    let data = this.state;
    let options = {
      method:'POST',
      mode:'cors',
      dataType: "json",
      body:JSON.stringify(data)
    };

    const response = await fetch('https://4jkbhwdpoi.execute-api.us-east-1.amazonaws.com/events', options);
    let responseJson = await response.json();
    console.log(responseJson)
    const status = await response.status;

    if(status == 200){
      this.props.refreshEvents();
      console.log('fetched');
    }

  }

  // handle
  formChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
        [nam]:val
    });

    console.log(this.state);

  }


  render(){

    return <div className="eventForm">

      <form>
          <legend>Add Event</legend>
          <table>
            <tr>
              <td>Organizer</td>
              <td><input type="text" id="eventOrganizer" name="eventOrganizer" onChange={this.formChangeHandler} /></td>
            </tr>
            <tr>
              <td>Venue</td>
              <td><input type="text" id="eventVenue" name="eventVenue" onChange={this.formChangeHandler} /></td>
            </tr>
            <tr>
              <td>Date</td>
              <td><input type="date" id="eventDate" name="eventDate" onChange={this.formChangeHandler} /></td>
            </tr>
          </table>
        </form>
        <br></br>
        <button onClick={this.handleSubmit}>Add New Event</button>
      </div>

  }
}

export default EventForm;
