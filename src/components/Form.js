import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class EventForm extends Component {
  constructor(){
    super();
    this.state = {
      eventJSON:{},
      
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // handleSubmit(event){
  // // handle submit, ie api post
  // }

  handle


  render(){
    <form>
      <table>
        <tr>
          <td>Organizer</td>
          <td><input type="text" id="eventOrganizer" name="eventOrganizer"</td>
        </tr>
        <tr>
          <td>Venue</td>
          <td><input type="text" id="eventVenue" name="eventVenue"</td>
        </tr>
        <tr>
          <td>Date</td>
          <td><input type="date" id="eventDate" name="eventDate"></td>
        </tr>
      </table>
    </form>
  }
}
