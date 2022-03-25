import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './routes/Home';
import Room from './routes/Room';
import Leaderboard from './routes/Leaderboard';
import './App.css';

function App() {
  return (
    <>
    <div className="App">

      <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Leaderboard">Leaderboard</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Leaderboard" element={<Leaderboard/>}/>
          <Route exact path="/Room" element={<Room/>}/>
        </Routes>
      </main>
      </Router>

      <footer>

      </footer>
    </div>
    </>
  );
}

export default App;
