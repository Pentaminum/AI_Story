import './App.css';
import MainPage from './pages/MainPage';
import StoryBook from './pages/StoryBook';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/storybook' element ={<StoryBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;