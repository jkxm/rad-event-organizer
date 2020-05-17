import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
class EventForm extends Component {
  constructor(){
    super();
    this.state = {
      eventJSON:{
        eventOrganizer:'',
        eventVenue:'',
        eventDate:''
      },

    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event){
  // handle submit, ie api post
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    let options = {
      method:'POST',
      // headers:{
      //   'Access-Control-Allow-Origin':'*',
      //   'Accept':'application/json',
      //   'Content-Type': 'application/json'},
      body:JSON.stringify(this.state.eventJSON)
    };

    // let response = await fetch('https://4jkbhwdpoi.execute-api.us-east-1.amazonaws.com/events', options)
    // console.log(await response.json());
    const request = new Request('https://4jkbhwdpoi.execute-api.us-east-1.amazonaws.com/events', options);
    const response = await fetch(request);
    const status = await response.status;

    if(status == 200){
      // refresh the list of events if possibel
      console.log('fetched');
    }


    // axios.post('https://4jkbhwdpoi.execute-api.us-east-1.amazonaws.com/events', this.state.eventJSON)
    //   .then(response =>{
    //     console.log(response);
    //   })
    //   .catch(error =>{
    //     console.log(error);
    //   })
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

    return <div>

      <form>
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

        <button onClick={this.handleSubmit}>Add New Event</button>
      </div>

  }
}

export default EventForm;
