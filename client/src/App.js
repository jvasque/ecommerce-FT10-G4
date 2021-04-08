import React from 'react'
import './scss/_App.scss';
import ProductCard from './components/ProductCard/ProductCard.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'



function App() {
  return (
    <div className="App">
        <SearchBar></SearchBar>
        <ProductCard></ProductCard>
    </div>
  );
}

export default App;
