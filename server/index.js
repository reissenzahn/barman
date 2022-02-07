const path = require('path');
const sqlite = require('better-sqlite3');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const migrate = require('./migrate');

const db = sqlite('db.sqlite', {
  verbose: console.log,
});

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ingredients', (request, response) => {
  const ingredients = db.prepare(`
    SELECT "i"."ingredient_id" AS "id", "i"."name", "ic"."name" AS "category", "i"."have"
    FROM "ingredient" AS "i"
    INNER JOIN "ingredient_category" AS "ic"
      ON "ic"."ingredient_category_id" = "i"."ingredient_category_id"
    ORDER BY lower("i"."name")
  `).all();

  for (let ingredient of ingredients) {
    ingredient.have = ingredient.have === 1 ? true : false;
  }

  return response.status(200).json(ingredients);
});

app.patch('/ingredients/:id', (request, response) => {
  db.prepare(`
    UPDATE "ingredient"
    SET "have" = ?
    WHERE "ingredient_id" = ?
  `).run(request.body.have ? 1 : 0, request.params['id']);

  return response.sendStatus(200);
});

app.get('/cocktails', (request, response) => {
  const cocktails = db.prepare(`
    SELECT "cocktail_id" AS "id", "name"
    FROM "cocktail"
    ORDER BY lower("name")
  `).all();

  return response.status(200).json(cocktails);
});

app.get('/cocktails/:id', (request, response) => {
  const cocktail = db.prepare(`
    SELECT "name", "image"
    FROM "cocktail"
    WHERE "cocktail_id" = ?
  `).get(request.params['id']);

  cocktail.recipes = db.prepare(`
    SELECT "r"."recipe_id" AS "id", "d"."name" AS "drinkware", "r"."method", "r"."notes", "r"."url", "r"."order"
    FROM "recipe" AS "r"
    INNER JOIN "drinkware" AS "d"
      ON "d"."drinkware_id" = "r"."drinkware_id"
    WHERE "cocktail_id" = ?
    ORDER BY "r"."order"
  `).all(request.params['id']);

  for (let recipe of cocktail.recipes) {
    recipe.ingredients = db.prepare(`
      SELECT "i"."name", "u"."name" AS "unit", "u"."symbol", "ri"."quantity1", "ri"."quantity2", "ri"."optional", "ri"."order", "i"."have"
      FROM "recipe_ingredient" AS "ri"
      INNER JOIN "ingredient" AS "i"
        ON "i"."ingredient_id" = "ri"."ingredient_id"
      INNER JOIN "unit" AS "u"
        ON "u"."unit_id" = "ri"."unit_id"
      WHERE "recipe_id" = ?
      ORDER BY "ri"."order"
    `).all(recipe.id) || [];

    recipe.garnishes = db.prepare(`
      SELECT "g"."name", "rg"."optional", "rg"."order"
      FROM "recipe_garnish" AS "rg"
      INNER JOIN "garnish" AS "g"
        ON "g"."garnish_id" = "rg"."garnish_id"
      WHERE "recipe_id" = ?
      ORDER BY "rg"."order"
    `).all(recipe.id) || [];
  }

  return response.status(200).json(cocktail);
});

app.get('/statistics', (request, response) => {

  // totals
  const totals = [];

  totals.push(db.prepare(`
    SELECT 'cocktails' AS "name", count(*) AS "count"
    FROM "cocktail"
  `).get());

  totals.push(db.prepare(`
    SELECT 'recipes' AS "name", count(*) AS "count"
    FROM "recipe"
  `).get());

  totals.push(db.prepare(`
    SELECT 'ingredients' AS "name", count(*) AS "count"
    FROM "ingredient"
  `).get());

  totals.push(db.prepare(`
    SELECT 'garnishes' AS "name", count(*) AS "count"
    FROM "garnish"
  `).get());

  // number of times each ingredient is used
  const ingredients = db.prepare(`
    SELECT "i"."name", count(*) AS "count"
    FROM "recipe_ingredient" AS "ri"
    INNER JOIN "ingredient" AS "i"
      ON "i"."ingredient_id" = "ri"."ingredient_id"
    GROUP BY "ri"."ingredient_id"
    ORDER BY "count" DESC
  `).all();

  const garnishes = db.prepare(`
    SELECT "g"."name", count(*) AS "count"
    FROM "recipe_garnish" AS "rg"
    INNER JOIN "garnish" AS "g"
      ON "g"."garnish_id" = "rg"."garnish_id"
    GROUP BY "rg"."garnish_id"
    ORDER BY "count" DESC
  `).all();

  return response.status(200).json({
    totals,
    ingredients,
    garnishes,
  });
});

// -- show number of times each item of drinkware is used
// SELECT d.name, count(*) AS count
// FROM recipe AS r
// INNER JOIN drinkware AS d
// ON r.drinkware_id = d.drinkware_id
// GROUP BY r.drinkware_id
// ORDER BY count DESC;

// -- show number of times each ingredient is used
// SELECT i.name, count(*) AS count
// FROM recipe_ingredient AS ri
// INNER JOIN ingredient AS i
// ON ri.ingredient_id = i.ingredient_id
// GROUP BY ri.ingredient_id
// ORDER BY count DESC;

// -- show ingredient ids
// SELECT ingredient_id, name
// FROM ingredient
// ORDER BY name ASC;

// -- show cocktails that can be made with listed ingredients
// SELECT r.name
// FROM recipe AS r
// WHERE (SELECT count(*) AS count
//        FROM recipe_ingredient AS ri
//        INNER JOIN ingredient AS i
//        ON ri.ingredient_id = i.ingredient_id
//        WHERE ri.recipe_id = r.recipe_id
//        AND i.name NOT IN ('tequila', 'grenadine syrup', 'Champagne', 'orange juice')) = 0;

(async () => {
  // await migrate(db);

  app.listen(8000);
})();


