import React, {useState} from 'react';
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
  const [code, setCode] = useState("000000");
  const [inputCode, setInputCode] = useState();
  const [roomExists, setExists] = useState(null);

  function changeCode(theCode) {
      setCode(theCode.generatedCode)
  }

  function changeInput(theInput) {
      setInputCode(theInput)
  }

  function doesExist(data){
      setExists(data.roomExists)
  }


  return (
    <>
    <div className="App">

      <Router>
      <header>
        <nav>
          <ul className='flex flex-row bg-black'>
            <li className='pl-2 text-white'>
              <Link to="/">Home</Link>
            </li>
            <li className='pl-2 text-white'>
              <Link to="/Leaderboard">Leaderboard</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route exact path="/" element={<Home changeCode={changeCode} doesExist={doesExist} inputCode={inputCode} changeInput={changeInput} code={code} roomExists={roomExists} />}/>
          <Route path="Leaderboard" element={<Leaderboard/>}/>
          <Route path="Room" element={<Room/>}/>
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
