import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';

class EventForm extends Component {
  constructor(){
    super();
    this.state = {
        eventOrganizer:'',
        eventVenue:'',
        eventDate:'',
        valid:false,
        error:null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSelectedEvent = this.updateSelectedEvent.bind(this);
    this.checkFormState = this.checkFormState.bind(this);
  }

  async handleSubmit(){
    await this.checkFormState();
    if(!this.state.valid){
      this.setState({
        error:"Please fill in all fields."
      })

      return
    }

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

  async updateSelectedEvent(){
    await this.checkFormState();
    if(!this.state.valid){
      this.setState({
        error:"Please fill in all fields."
      })

      return
    }

    let data = this.state;
    data.eventId = this.props.radEventId;
    let options = {
      method:'PUT',
      mode:'cors',
      body:JSON.stringify(data)
    };

    const response = await fetch('https://4jkbhwdpoi.execute-api.us-east-1.amazonaws.com/events', options);
    let responseJson = await response.json();
    console.log(responseJson)
    const status = await response.status;

    if(status == 200){
      this.props.refreshEvents();
      console.log('updated');
    }
  }

  async checkFormState(){
    let eventOrganizer = this.state.eventOrganizer;
    let eventVenue = this.state.eventVenue;
    let eventDate = this.state.eventDate;

    if(eventOrganizer && eventVenue && eventDate){
      await this.setState({
        valid:true,
        error:null
      });
    }
    else{
      await this.setState({
        valid:false
      })
    }
  }

  formChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
        [nam]:val
    });

    console.log(this.state);
  }

  render(){
    let updateBtn;
    let error;
    let today = new Date().toISOString().slice(0,10);
    console.log(today);
    if(this.state.error){
      error = this.state.error;
    }
    if(this.props.radEventId){
      updateBtn = <button onClick={this.updateSelectedEvent}>Update Event</button>
    }
    return <div className="eventForm">
      <br></br>
      <header>Add Event</header>
      <p>{error}</p>
      <form>

          <table>
            <tr>
              <td>Organizer</td>
              <td>
                <input type="text" id="eventOrganizer" name="eventOrganizer" onChange={this.formChangeHandler} required/>
              </td>
            </tr>
            <tr>
              <td>Venue</td>
              <td><input type="text" id="eventVenue" name="eventVenue" onChange={this.formChangeHandler} required/></td>
            </tr>
            <tr>
              <td>Date</td>
              <td><input type="date" id="eventDate" name="eventDate" onChange={this.formChangeHandler} min={today} required/></td>
            </tr>
          </table>
        </form>
        <br></br>
        <button onClick={this.handleSubmit}>Add New Event</button>
        {updateBtn}
      </div>

  }
}

export default EventForm;
