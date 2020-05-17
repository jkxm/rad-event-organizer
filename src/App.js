import React from 'react';
import logo from './logo.svg';
import './App.css';
import EventTable from './components/Event';
import EventForm from './components/Form';

function App() {
  return (
    <div>
      <header>
        RAD App
      </header>
      <EventTable/>
      <EventForm />
    </div>
  );
}

export default App;
