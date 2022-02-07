import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/cocktails');
        
        if (response.status === 200) {
          setCocktails(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const toggleDarkMode = () => {
    // const link = document.getElementById('theme');
    
    // if (link.href.includes('light')) {
    //   link.href = 'http://localhost:8000/public/css/dark.css';
    // } else {
    //   link.href = 'http://localhost:8000/public/css/light.css';
    // }
  };

  return (
    <div className="sidebar">
      <h1 onClick={toggleDarkMode}>Barman 🍸</h1>
      <div style={{'display': 'flex'}}>
        <div>📒</div>
        <div>📊</div>
        <div>🔍</div>
      </div>
      <h3>Tools</h3>
      <ul>
        <li>
          <Link to="/cabinet">Cabinet</Link>
        </li>
        <li>
          <Link to="/dictionary">Dictionary</Link>
        </li>
        <li>
          <Link to="/statistics">Statistics</Link>
        </li>
      </ul>
      <h3>Cocktails</h3>
      <ul className="recipes">
        {cocktails.map((cocktail) => (
          <li key={cocktail.id}>
            <NavLink to={`/cocktails/${cocktail.id}`} className={({ isActive }) => (isActive ? 'active' : null)}>{cocktail.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
