import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Cabinet from './components/Cabinet';
import Statistics from './components/Statistics';
import Cocktail from './components/Cocktail';
import Dictionary from './components/Dictionary';

function App() {
  

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<h1></h1>} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/cocktails/:id" element={<Cocktail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
