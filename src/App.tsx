import Board from './components/Board';
import NavBar from './components/Navbar';

import './styles/App.css';

function App() {
  return (
    <div>
      <div className="main-header">
        <NavBar />
      </div>
      <div className="main-body">
        <Board />
      </div>
    </div>
  );
}

export default App;
