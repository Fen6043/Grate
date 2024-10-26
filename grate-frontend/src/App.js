import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage';
import GameProvider from './context/GameProvider';
import SearchBar from './components/SearchBar';
import AboutPage from './components/AboutPage';
import AddForm from './components/AddForm';

function App() {
  return (
    <Router>
    <Routes>
      <Route path = "/" element = {<GameProvider>
      <NavigationBar/>
      <SearchBar/>
      <HomePage/>
    </GameProvider>}/>
      <Route path = "/addForm" element = {<AddForm/>}/>
    </Routes>
    </Router>
  );
}

export default App;
