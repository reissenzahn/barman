import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const renderIngredient = (ingredient) => {
  switch (ingredient.unit) {
    case 'none':
    case 'top':
      return `${ingredient.name}`;
    case 'unit':
      return `${ingredient.quantity1} x ${ingredient.name}`;
    default:
      return `${ingredient.quantity2 ? `${ingredient.quantity1}.${ingredient.quantity2}` : ingredient.quantity1} ${ingredient.symbol} ${ingredient.name}`;
  }
};

const Cocktail = () => {
  const [cocktail, setCocktail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/cocktails/${id}`);

        console.log(response.data);

        if (response.status === 200) {
          setCocktail(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <div className="cocktail">
      <h2>{cocktail.name}</h2>
      <hr />
      {cocktail.image && <img width="250" src={`http://localhost:8000/public/img/${cocktail.image}`}></img>}
      {cocktail.recipes && cocktail.recipes.map((recipe, index) => (
        <div className="recipe" key={recipe.order}>
          <div>
            <h3 className={recipe.ingredients.every((ingredient) => ingredient.have) ? 'have' : null}>Recipe #{index + 1}</h3>
            <a href={recipe.url}>source</a>
          </div>
          <hr />
          {recipe.drinkware && <p><b>Drinkware:</b>&nbsp;{recipe.drinkware}</p>}
          <p><b>Ingredients:</b></p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li className={ingredient.have ? 'have' : null} key={ingredient.order}>{renderIngredient(ingredient)}
              </li>
            ))}
          </ul>
          {recipe.garnishes.length > 0 && <p><b>Garnishes:</b>&nbsp;{recipe.garnishes.map((garnish) => garnish.name).join(', ')}</p>}
          <p><b>Method:</b>&nbsp;{recipe.method}</p>
          {recipe.notes && <p><b>Notes:</b>&nbsp;{recipe.notes}</p>}
        </div>
      ))}
    </div>
  );
};

export default Cocktail;
