import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class EventForm extends Component {
  constructor(props){
    super(props);
    // console.log(props.radEvent)
    this.state = {
        eventOrganizer:'',
        eventVenue:'',
        eventDate:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSelectedEvent = this.updateSelectedEvent.bind(this);
  }

  // componentDidUpdate(){
  //   let radEvent = this.props.radEvent;
  //   // console.log(radEvent, this.state);
  //   if(Object.keys(radEvent).length!==0){
  //
  //   }
  //
  // }
  //
  // updateState(event){
  //   this.setState({
  //     eventOrganizer:radEvent.organizer,
  //     eventVenue:radEvent.venue,
  //     eventDate:radEvent.date
  //   });
  // }

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

  async updateSelectedEvent(){
    let data = this.state;
    data.eventId = this.props.radEventId;
    let options = {
      method:'PUT',
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
      console.log('updated');
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
    // let radEvent = this.props.radEvent;
    if(this.props.radEventId){
      updateBtn = <button onClick={this.updateSelectedEvent}>Update Event</button>
    }
    return <div className="eventForm">
      <br></br>
      <form>
          <legend>Add Event</legend>
          <table>
            <tr>
              <td>Organizer</td>
              <td><input type="text" id="eventOrganizer" name="eventOrganizer" onChange={this.formChangeHandler} required/></td>
            </tr>
            <tr>
              <td>Venue</td>
              <td><input type="text" id="eventVenue" name="eventVenue" onChange={this.formChangeHandler} required/></td>
            </tr>
            <tr>
              <td>Date</td>
              <td><input type="date" id="eventDate" name="eventDate" onChange={this.formChangeHandler} required/></td>
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
