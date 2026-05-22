import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HeroSearch from './components/HeroSearch/HeroSearch';
import DestinationGrid from './components/DestinationGrid/DestinationGrid';
import TravelQuizModal from './components/TravelQuizModal/TravelQuizModal';
import DestinationPage from "./pages/DestinationPage"
import ComparePage from './pages/ComparePage';
import MyTrips from './components/MyTrips/MyTrips';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = (query) => console.log('Search:', query);

  return (
    <>
      <HeroSearch onSearch={handleSearch} onOpenQuiz={() => setIsModalOpen(true)} />
      <DestinationGrid />
      <TravelQuizModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

// Əsas tətbiq strukturu
function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destination/:city" element={<DestinationPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/my-trips" element={<MyTrips />} />
            {/* Ən sonda * qoymaq vacibdir: bilinməyən URL-ləri tutur */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;