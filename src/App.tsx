import { Routes, Route } from 'react-router';

import BoardsList from './components/BoardsList';
import BoardPage from './components/BoardPage';
import NavBar from './components/Navbar';
import Homepage from './components/Homepage';

import './styles/App.css';

function App() {
  return (
    <div>
      <div className="main-header">
        <NavBar />
      </div>
      <div className="main-body">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/boards" element={<BoardsList />} />
          <Route path="/boards/:boardId" element={<BoardPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
