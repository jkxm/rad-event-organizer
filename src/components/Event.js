import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EventForm from './Form';

class EventTable extends Component {
  constructor(){
    super();
    this.state = {
      error:null,
      isLoaded:false,
      selectedEventId:null,
      // eventToForm:{}
    };

    this.updateSelectedEvent = this.updateSelectedEvent.bind(this);
    this.deleteSelectedEvent = this.deleteSelectedEvent.bind(this);
  }

  updateSelectedEvent(eventId){
    // let eventItems = this.props.eventItems;
    // eventItems.forEach((item) => {
    //   if(item.id === eventId){
        this.setState({
          selectedEventId:eventId,
          // eventToForm:item,
        });
      // }
    // });

  }

  async deleteSelectedEvent(){
    let data = this.state;
    let options = {
      method:'DELETE',
      mode:'cors',
      body:JSON.stringify(data)
    };

    const response = await fetch('https://4jkbhwdpoi.execute-api.us-east-1.amazonaws.com/events', options);
    let responseJson = await response.json();
    console.log(responseJson)
    const status = await response.status;

    if(status == 200){
      this.props.refreshEvents();
      console.log('deleted');
    }
    this.setState({
      selectedEventId:null
    })

  }


  render(){
    // console.log(this.state)
    const {error, isLoaded, selectedEventId} = this.state;
    const eventItems = this.props.eventItems;

    let delButton;
    if(selectedEventId){
      delButton = <button onClick={this.deleteSelectedEvent}> Delete Event </button>;
    }
    return <div className="eventTable">
      <table >
        <tr>
          <th>Organizer</th>
          <th>Venue</th>
          <th>Date</th>
        </tr>

        {eventItems.map(event=>{
          if(event.id === selectedEventId){
            return <Event event={event} updateSelectedEvent={this.updateSelectedEvent} componentClass='selected'/>
          }
          return <Event event={event} updateSelectedEvent={this.updateSelectedEvent} componentClass=''/>
        })}

      </table>
      <br></br>
      <button onClick={this.props.refreshEvents}>Refresh / Read</button>
      {delButton}

      <EventForm refreshEvents={this.props.refreshEvents} radEventId={selectedEventId} />
    </div>
  }
}


class Event extends Component {
  handleClick = () =>{
    let eventId = this.props.event.id;
    this.props.updateSelectedEvent(eventId)
  }
  render(){

    return <tr key={this.props.event.id} onClick={this.handleClick} className={this.props.componentClass}>
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
