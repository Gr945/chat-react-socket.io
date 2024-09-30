import React from 'react';
import './App.css';
import AppRoutes from '../AppRoutes/AppRoutes';

function App() {
  console.log('App')
  return (
    <div className="App" id='App'>
      <header>CHAT SOCKET.IO</header>
      <AppRoutes/>
    </div>
  );
}

export default App;
