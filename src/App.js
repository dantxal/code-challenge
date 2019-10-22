import React from 'react';
import { ToastContainer } from 'react-toastify';

import Chat from './components/Chat';
import GlobalStyle from './styles/global';

function App() {
  return (
    <div className="App">
      <Chat />
      <ToastContainer />
      <GlobalStyle />
    </div>
  );
}

export default App;
