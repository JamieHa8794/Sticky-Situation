import { Routes, Route } from 'react-router';

import BoardsList from './components/Boards/BoardsList';
import BoardPage from './components/Boards/BoardPage';
import NavBar from './components/Navbar';
import Homepage from './components/Homepage';

import './styles/base/App.css';

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
          <Route path="/boards/new" element={<BoardsList />} />

          <Route path="/boards/:boardId" element={<BoardPage />} />
          <Route path="/boards/:boardId/edit" element={<BoardsList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
