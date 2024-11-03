import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from './components/NavigationBar'
import HomePage from './components/HomePage';
import GameProvider from './context/GameProvider';
import SearchBar from './components/SearchBar';
import Trial from './components/Trial';
import AddForm from './components/AddForm';
import AddTag from './components/AddTag';

function App() {
  return (
    <Router>
    <Routes>
      <Route path = "/" element = {<GameProvider>
      <div className='flex flex-col'>
      <NavigationBar/>
      <SearchBar/>
      </div>
      <HomePage/>
    </GameProvider>}/>
      <Route path = "/addForm" element = {<AddForm/>}/>
      <Route path = "/trial" element = {<Trial/>}/>
      <Route path = "/addTag" element= {<AddTag/>} />
    </Routes>
    </Router>
  );
}

export default App;
