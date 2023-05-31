import './App.css';
import Home from './components/Home'
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav'
import Models from './components/Models';
import Posts from './components/Posts';


function App() {
  return (
    <div className="App">
    <Header/>
    <Nav/>
    <Home/>
    <Models/>
    <Posts/>
    <Footer/>
    </div>
  );
}

export default App;
