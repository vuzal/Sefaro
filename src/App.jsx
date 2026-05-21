
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DestinationPage from './pages/DestinationPage.';
import Header from './components/Header/Header';
import HeroSearch from './components/HeroSearch/HeroSearch';
import DestinationGrid from './components/DestinationGrid/DestinationGrid';
import TravelQuizModal from './components/TravelQuizModal/TravelQuizModal';
import { getDestinationData } from './services/mockDestinationData';
import ComparePage from './pages/ComparePage';
import './App.css';


function Home(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleSearch(query) {
    console.log('Search for:', query);
  }

  return(
    <>
    <Header />
    <HeroSearch onSearch={handleSearch} onOpenQuiz={() => setIsModalOpen(true)} />
    <DestinationGrid />
    <TravelQuizModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:city" element={<DestinationPage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </Router>
  );
}

export default App;