import { useState } from "react";

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';

const data = [
  // bar terms
  {
    term: 'With a twist',
    definition: 'Signals the bartender to add a "twist" of the zest of a citrus fruit to the cocktail.',
  },
  {
    term: 'Straight Up',
    definition: 'An alcoholic drink that is shaken or stirred with ice and then strained and served in a (usually stemmed) glass without ice.',
  },
  {
    term: 'Neat',
    definition: 'A single unmixed liquor served without being chilled and without any water, ice or other mixer.',
  },
  {
    term: 'Straight',
    definition: 'Sometimes used as a synonym for either "straight up" or "neat".',
  },
  {
    term: 'On The Rocks',
    definition: 'A liquor that is served in a glass poured over ice cubes.',
  },
  {
    term: 'Chaser',
    definition: 'A mild drink consumed after a shot of hard liquor.',
  },

  // aperitif vs digestif
  {
    term: 'Apéritif',
    definition: 'An alcoholic beverage usually served before a meal to stimulate the appetite and is usually dry rather than sweet.',
  },
  {
    term: 'Digestif',
    definition: 'An alcoholic beverage served after a meal to aid digestion and is usually taken neat.',
  },

  // orange liqueur
  {
    term: 'Cointreau',
    definition: 'An orange-flavoured triple sec liqueur produced in Saint-Barthélemy-d\'Anjou, France.',
  },
  {
    term: 'Triple Sec',
    definition: 'An orange-flavoured liqueur that originated in France made by macerating sun-dried orange skins in alcohol for at least 24 hours before undergoing a three-step distillation process.',
  },

  // whiskey
  {
    term: 'Bourbon',
    definition: 'A type of American whiskey, a barrel-aged distilled liquor made primarily from corn.',
  },
  {
    term: 'Rye',
    definition: 'Similar to bourbon but must be distilled from at least 51 percent rye grain.',
  },

  // gin
  {
    term: 'Gin',
    definition: 'A distilled alcoholic drink that derives its predominant flavour from juniper berries.',
  },
  {
    term: 'Old Tom Gin',
    definition: 'A gin that is slightly sweeter than London Dry but slightly drier than the Dutch Jenever.',
  },
  {
    term: 'Schnapps',
    definition: 'An alcoholic beverage that may take several forms including distilled fruit brandies, herbal liqueurs, infusions and "flavored liqueurs".',
  },
  {
    term: 'Bitters',
    definition: 'An alcoholic preparation flavored with botanical matter for a bitter or bittersweet flavor.',
  },

  // rum
  {
    term: 'Rum',
    definition: 'A liquor made by fermenting then distilling sugarcane molasses or sugarcane juice. The distillate, a clear liquid, is usually aged in oak barrels.',
  },
  {
    term: 'Rhum agricole',
    definition: 'The French term for sugarcane juice rum, a style of rum originally distilled in the French Caribbean islands from freshly squeezed sugarcane juice rather than molasses.',
  },

  // vermouth
  {
    term: 'Vermouth',
    definition: 'An aromatized fortified wine flavoured with various botanicals and sometimes colored.',
  },

  // vodka
  {
    term: 'Vodka',
    definition: 'A clear distilled alcoholic beverage composed mainly of water and ethanol but sometimes with traces of impurities and flavorings.',
  },
  // {
  //   term: '',
  //   definition: '',
  // },
];


const Dictionary = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="dictionary">
      <h2>Dictionary</h2>
      <hr />
      <div className="search">
        <SearchIcon />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          placeholder="Search"
        />
      </div>
      <ul>
        {data.filter((item) => query === '' || item.term.toLowerCase().includes(query)).map((item) => (
          <li key={item.term}>
            <b>{item.term}</b>:&nbsp;{item.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dictionary;
