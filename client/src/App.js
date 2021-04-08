import React from 'react'
import './scss/_App.scss';
import Catalogo from './components/Catalogo/Catalogo.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'

function App() {
  return (
    <div className="App">
        <SearchBar></SearchBar>
        <Catalogo></Catalogo>
    </div>
  );
}

export default App;
