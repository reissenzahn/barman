import axios from 'axios';
import { useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';

const Cabinet = () => {
  const [ingredients, setIngredients] = useState([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/ingredients');
        console.log(response.data);
        setIngredients(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handle = async (id) => {
    const target = ingredients.find((ingredient) => ingredient.id === id);

    try {
      await axios.patch(`/ingredients/${id}`, {
        have: !target.have,
      });
  
      setIngredients(ingredients.map((ingredient) => ingredient.id === id ? { ...ingredient, have: !target.have } : ingredient));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cabinet">
      <h2>Cabinet</h2>
      <hr />
      <div className="controls">
        <select onChange={(event) => setFilter(event.target.value)}>
          <option value="all">all</option>
          {Array.from(new Set(ingredients.map((ingredient) => ingredient.category))).map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <div className="search">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <table>
        {/* <thead>
          <tr>
            <th>name</th>
            <th>category</th>
            <th></th>
          </tr>
        </thead> */}
        <tbody>
          {ingredients.filter((ingredient) => (query === '' || ingredient.name.includes(query)) && (filter === 'all' || ingredient.category === filter)).map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.name}</td>
              <td>{ingredient.category}</td>
              <td>
                <input type="checkbox" checked={ingredient.have} onChange={() => handle(ingredient.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cabinet;
