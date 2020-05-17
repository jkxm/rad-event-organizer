import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class EventTable extends Component {
  constructor(){
    super();
    this.state = {
      error:null,
      isLoaded:false,
      // eventItems:[],
      selectedEvent:null,
    };

    // this.refreshEvents = this.refreshEvents.bind(this);
  }



  // async componentDidMount() {
  //   this.refreshEvents();
  // }
  //
  //
  // async refreshEvents(){
  //   try {
  //     const response = await fetch('https://4jkbhwdpoi.execute-api.us-east-1.amazonaws.com/events');
  //     let responseJson = await response.json();
  //     console.log(responseJson);
  //     this.setState(
  //       {
  //         isLoading: false,
  //         eventItems: responseJson
  //       },
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }



  render(){
    const {error, isLoaded} = this.state;
    const eventItems = this.props.eventItems;
    return <div className="eventTable">
      <table >
        <tr>
          <th>Organizer</th>
          <th>Venue</th>
          <th>Date</th>
        </tr>

        {eventItems.map(event=>{
          return <Event event={event}/>
        })}
      </table>
      <br></br>
      <button onClick={this.props.refreshEvents}>Refresh / Read</button>
    </div>
  }
}


class Event extends Component {
  constructor(){
    super();
  }

  render(){
    return <tr key={this.props.event.id}>
      <td>
        {this.props.event.organizer}
      </td>

      <td>
        {this.props.event.venue}
      </td>

      <td>
        {this.props.event.date}
      </td>
    </tr>
  }
}

export default EventTable;
