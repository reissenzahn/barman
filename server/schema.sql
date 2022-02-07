PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS cocktail;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS drinkware;
DROP TABLE IF EXISTS ingredient_category;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS unit;
DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS garnish;
DROP TABLE IF EXISTS recipe_garnish;

PRAGMA foreign_keys = ON;


CREATE TABLE "cocktail" (
  "cocktail_id" INTEGER PRIMARY KEY NOT NULL,
  "name" TEXT UNIQUE NOT NULL,
  "image" TEXT
);

CREATE TABLE "recipe" (
  "recipe_id" INTEGER PRIMARY KEY NOT NULL,
  "cocktail_id" INTEGER NOT NULL,
  "drinkware_id" INTEGER,
  "method" INTEGER NOT NULL,
  "notes" TEXT,
  "url" TEXT,
  "order" INTEGER,

  FOREIGN KEY ("cocktail_id") REFERENCES "cocktail" ("cocktail_id"),
  FOREIGN KEY ("drinkware_id") REFERENCES "drinkware" ("drinkware_id")
);

CREATE TABLE "drinkware" (
  "drinkware_id" INTEGER PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL
);

CREATE TABLE "ingredient_category" (
  "ingredient_category_id" INTEGER PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL
);

CREATE TABLE "ingredient" (
  "ingredient_id" INTEGER PRIMARY KEY NOT NULL,
  "ingredient_category_id" INTEGER,
  "name" TEXT UNIQUE NOT NULL,
  "description" TEXT,
  "have" INTEGER DEFAULT 0,

  FOREIGN KEY ("ingredient_category_id") REFERENCES "ingredient_category" ("ingredient_category_id")
);

CREATE TABLE "unit" (
  "unit_id" INTEGER PRIMARY KEY NOT NULL,
  "name" TEXT UNIQUE NOT NULL,
  "symbol" TEXT NOT NULL
);

CREATE TABLE "recipe_ingredient" (
  "recipe_id" INTEGER NOT NULL,
  "ingredient_id" INTEGER NOT NULL,
  "unit_id" INTEGER,
  "quantity1" INTEGER,
  "quantity2" INTEGER,
  "optional" INTEGER DEFAULT 0,
  "order" INTEGER,

  FOREIGN KEY ("recipe_id") REFERENCES "recipe" ("recipe_id"),
  FOREIGN KEY ("ingredient_id") REFERENCES "ingredient" ("ingredient_id"),
  FOREIGN KEY ("unit_id") REFERENCES "unit" ("unit_id")
);

CREATE TABLE "garnish" (
  "garnish_id" INTEGER PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL,
  "have" INTEGER DEFAULT 0
);

CREATE TABLE "recipe_garnish" (
  "recipe_id" INTEGER NOT NULL,
  "garnish_id" INTEGER NOT NULL,
  "optional" INTEGER DEFAULT 0,
  "order" INTEGER,

  FOREIGN KEY ("recipe_id") REFERENCES "recipe" ("recipe_id"),
  FOREIGN KEY ("garnish_id") REFERENCES "garnish" ("garnish_id")
);

-- INSERT INTO "drinkware" ("name")
-- VALUES ('collins glass'),
--   ('highball glass'),
--   ('lowball glass'),
--   ('shot glass'),
--   ('champagne coupe'),
--   ('champagne flute'),
--   ('cocktail glass'),
--   ('glencairn whisky glass'),
--   ('hurricane glass'),
--   ('margarita glass'),
--   ('snifter'),
--   ('wine glass'),
--   ('nick & nora glass'),
--   ('poco grande glass'),
--   ('irish coffee mug'),
--   ('copper mug'),
--   ('julep cup'),
--   ('stein glass');

INSERT INTO "unit" ("name", "symbol")
VALUES ('milliliter', 'ml'),
  ('gram', 'g'),
  ('ounce', 'oz.'),
  ('teaspoon', 'tsp.'),
  ('tablespoon', 'tbsp.'),
  ('dash', 'dash(es)'),
  ('splash', 'splash'),
  ('pinch', 'pinch'),
  ('drop', 'drop'),
  ('barspoon', 'barspoon(s)'),
  ('unit', 'unit'),
  ('none', 'none');

INSERT INTO "ingredient_category" ("name")
VALUES ('liquor'),
  ('liqueur'),
  ('wine'),
  ('bitters'),
  ('syrup'),
  ('juice'),
  ('other');

-- INSERT INTO "ingredient" ("name", "ingredient_category_id")
-- VALUES ('test_liquor1', 1),
-- ('test_liquor2', 1),
-- ('test_liquor3', 1),
-- ('test_liquor4', 1),
-- ('test_liquor5', 1),
-- ('test_liqueur1', 2),
-- ('test_liqueur2', 2),
-- ('test_liqueur3', 2),
-- ('test_liqueur4', 2),
-- ('test_liqueur5', 2);

-- INSERT INTO "ingredient" ("name")
-- VALUES ('bourbon'),
--   ('rye'),
--   ('scotch'),
--   ('irish whiskey'),
--   ('vodka'),
--   ('vodka citron'),
--   ('gin'),
--   ('london dry gin'),
--   ('old tom gin'),
--   ('navy strength gin'),
--   ('light rum'),
--   ('dark rum'),
--   ('gold rum'),
--   ('aged rum'),
--   ('malibu rum'),
--   ('jamaica pot still black rum'),
--   ('tequila'),
--   ('blanco tequila'),
--   ('reposado tequila'),
--   ('añejo tequila'),
--   ('brandy'),
--   ('cognac'),
--   ('absinthe'),
--   ('campari'),
--   ('aperol'),
--   ('calvados'),
--   ('amaro nonino'),
--   ('sweet vermouth'),
--   ('dry vermouth'),
--   ('peach schnapps'),
--   ('champagne'),
--   ('sparkling wine'),
--   ('green chartreuse'),
--   ('dom bénédictine'),
--   ('galliano'),
--   ('kahlúa'),
--   ('baileys irish cream'),
--   ('dry sherry'),
--   ('lillet blanc'),
--   ('crème de mûre'),
--   ('crème de violette'),
--   ('crème de cassis'),
--   ('crème de cacao'),
--   ('white crème de cacao'),
--   ('coffee liqueur'),
--   ('drambuie'),
--   ('chambord'),
--   ('maraschino'),
--   ('red wine'),
--   ('prosecco'),
--   ('triple sec'),
--   ('cointreau'),
--   ('dry curaçao'),
--   ('blue curaçao'),
--   ('cherry liqueur'),
--   ('peach liqueur'),
--   ('fernet branca'),
--   ('151 proof alcohol'),
--   ('angostura bitters'),
--   ('peychaud''s bitters'),
--   ('aromatic bitters'),
--   ('orange bitters'),
--   ('soda water'),
--   ('tonic water'),
--   ('pink grapefruit soda'),
--   ('club soda'),
--   ('lemonade'),
--   ('cola'),
--   ('cold brew'),
--   ('ginger beer'),
--   ('ginger ale'),
--   ('hot coffee'),
--   ('milk'),
--   ('cream'),
--   ('coconut milk'),
--   ('light cream'),
--   ('lemon juice'),
--   ('lime juice'),
--   ('cranberry juice'),
--   ('grapefruit juice'),
--   ('pineapple juice'),
--   ('raspberry juice'),
--   ('orange juice'),
--   ('tomato juice'),
--   ('cream of coconut'),
--   ('grenadine'),
--   ('simple syrup'),
--   ('demerara syrup'),
--   ('raspberry syrup'),
--   ('maple syrup'),
--   ('agave syrup'),
--   ('honey syrup'),
--   ('orgeat syrup'),
--   ('gomme syrup'),
--   ('butterfly pea flower tea'),
--   ('raw honey'),
--   ('strawberry'),
--   ('sugar cube'),
--   ('superfine sugar'),
--   ('brown sugar'),
--   ('worcestershire sauce'),
--   ('tabasco sauce'),
--   ('egg white'),
--   ('mint leaf'),
--   ('black pepper'),
--   ('saline solution'),
--   ('citric acid solution'),
--   ('salt'),
--   ('water');

-- INSERT INTO "garnish" ("name")
-- VALUES ('maraschino cherry'),
--   ('cocktail cherry'),
--   ('cherry'),
--   ('lime wedge'),
--   ('lemon wedge'),
--   ('orange wedge'),
--   ('pineapple wedge'),
--   ('lemon slice'),
--   ('lime slice'),
--   ('orange slice'),
--   ('orange slice quarter'),
--   ('pineapple slice'),
--   ('lemon wheel'),
--   ('lime wheel'),
--   ('lemon swath'),
--   ('orange swath'),
--   ('lemon spiral'),
--   ('orange spiral'),
--   ('lime spiral'),
--   ('sugar rim'),
--   ('salt rim'),
--   ('lemon zest'),
--   ('orange zest'),
--   ('lemon twist'),
--   ('orange twist'),
--   ('olive'),
--   ('orange slice half'),
--   ('cinnamon stick'),
--   ('lemon zest spiral'),
--   ('grated nutmeg'),
--   ('mint sprig'),
--   ('lemon peel'),
--   ('celery stick'),
--   ('pineapple spear'),
--   ('pineapple frond'),
--   ('mint leaves'),
--   ('lime peel'),
--   ('raspberry'),
--   ('blackberry'),
--   ('fire'),
--   ('cocktail umbrella');

