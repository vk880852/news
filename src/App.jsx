import { Routes, Route,Outlet} from 'react-router-dom';
import HomePage from './Page/HomePage.jsx';
import './App.css';
import Category from './components/Category.jsx';
import Navbar from './components/Navbar.jsx';
import SinglePage from './Page/SinglePage.jsx';
function App() {
  return (
    <div className="App">
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/:category" element={<Category/>}/>
        <Route path="/singlenews/:index" element={<SinglePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
