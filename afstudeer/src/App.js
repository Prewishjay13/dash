import './App.css';
import Home from './components/Home'
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav'

function App() {
  return (
    <div className="App">
    <Header/>
    <Nav/>
    <Home/>
    <Footer/>
    </div>
  );
}

export default App;
