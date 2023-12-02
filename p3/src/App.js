import logo from './logo.svg';
import './App.css';
import React from 'react';
import { ReactDOM } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
       <Header />
       <main>Main</main>
       <Footer />
    </div>
  );
}

export default App;
