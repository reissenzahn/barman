import axios from 'axios';
import { useState, useEffect } from 'react';

const Statistics = () => {
  const [statistics, setStatistics] = useState({
    totals: [],
    ingredients: [],
    garnishes: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/statistics');

        console.log(response.data);

        setStatistics(response.data);
      } catch (error) {
        console.log(error)
      }
    })();
  }, []);

  return (
    <div className="statistics">
      <h2>Statistics</h2>
      <hr />
      <h3>Totals</h3>
      <hr />
      <table>
        <tbody>
          {statistics.totals.map((ingredient) => (
            <tr key={ingredient.name}>
              <td>{ingredient.name}</td>
              <td>{ingredient.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Ingredients</h3>
      <hr />
      <table>
        <tbody>
          {statistics.ingredients.map((ingredient) => (
            <tr key={ingredient.name}>
              <td>{ingredient.name}</td>
              <td>{ingredient.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Garnishes</h3>
      <hr />
      <table>
        <tbody>
          {statistics.garnishes.map((garnish) => (
            <tr key={garnish.name}>
              <td>{garnish.name}</td>
              <td>{garnish.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
