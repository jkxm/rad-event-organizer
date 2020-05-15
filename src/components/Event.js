import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class EventTable extends Component {
  constructor(){
    super();
    this.state = {
      error:null,
      isLoaded:false,
      eventItems:[],
      selectedEvent:null,
    };
  }

  // componentDidMount(){
  // //api get here
  // }

  render(){
    return <div>
      <table>
        <th>Organizer</th>
        <th>Venue</th>
        <th>Date</th>

        // event component here
      </table>


    eventtable

    </div>
  }
}


class Event extends Component {
  constructor(){
    super();
  }

  render(){
    return <tr>
      <td>
        event details
      </td>
    </tr>
  }
}

export default EventTable;
