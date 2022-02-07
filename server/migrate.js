const fs = require('fs').promises;

const ingredients = async (db) => {
  const ingredients = JSON.parse(await fs.readFile('seed/ingredients.json', 'utf-8'));

  for (let ingredient of ingredients) {
    if (!db.prepare(`
      SELECT "ingredient_category_id" FROM "ingredient_category"
      WHERE "name" = ?
    `).get(ingredient.category)) {
      console.log(`MIGRATE: unknown ingredient category "${ingredient.category}"`);
      return;
    }

    db.prepare(`
      INSERT INTO "ingredient" ("name", "ingredient_category_id")
      VALUES (?, (SELECT "ingredient_category_id" FROM "ingredient_category" WHERE "name" = ?))
    `).run(ingredient.name, ingredient.category);
  }
};

const cocktails = async (db) => {

};

const migrate = async (db) => {

  const schema = await fs.readFile('schema.sql', 'utf-8');

  db.exec(schema);

  await seed(db);

  // return;

  const cocktails = JSON.parse(await fs.readFile('raw.json', 'utf-8'));

  for (let cocktail of cocktails) {
    let info = db.prepare(`
      INSERT INTO "cocktail" ("name", "image")
      VALUES (?, ?);
    `).run(cocktail.name, cocktail.image);

    const cocktailId = info.lastInsertRowid;

    let count = 1;

    for (let recipe of cocktail.recipes) {

      if (!db.prepare(`
        SELECT "drinkware_id"
        FROM "drinkware"
        WHERE "name" = ?
      `).get(recipe.drinkware)) {
        console.log(`MIGRATE: unknown drinkware "${recipe.drinkware}"`);
        return;
      }

      info = db.prepare(`
        INSERT INTO "recipe" ("cocktail_id", "drinkware_id", "method", "notes", "url", "order")
        VALUES (?, (SELECT "drinkware_id" FROM "drinkware" WHERE "name" = ?), ?, ?, ?, ?);
      `).run(cocktailId, recipe.drinkware, recipe.method, recipe.notes, recipe.url, count);
      
      const recipeId = info.lastInsertRowid;
      
      let order1 = 1;

      for (let ingredient of recipe.ingredients) {
        if (!db.prepare(`
          SELECT "ingredient_id"
          FROM "ingredient"
          WHERE "name" = ?
        `).get(ingredient.name)) {
          console.log(`MIGRATE: unknown ingredient "${ingredient.name}"`);
          return;
        }

        if (!ingredient.unit) {
          ingredient.unit = 'none';
        }

        if (!db.prepare(`
          SELECT "unit_id"
          FROM "unit"
          WHERE "name" = ?
        `).get(ingredient.unit)) {
          console.log(`MIGRATE: unknown unit "${ingredient.unit}"`);
          return;
        }

        info = db.prepare(`
          INSERT INTO "recipe_ingredient" ("recipe_id", "ingredient_id", "unit_id", "quantity1", "order")
          VALUES (?, (SELECT "ingredient_id" FROM "ingredient" WHERE "name" = ?), (SELECT "unit_id" FROM "unit" WHERE "name" = ?), ?, ?)
        `).run(recipeId, ingredient.name, ingredient.unit, ingredient.quantity1, order1);

        order1++;
      }

      let order2 = 1;
      
      for (let garnish of recipe.garnishes) {
        if (!db.prepare(`
          SELECT "garnish_id"
          FROM "garnish"
          WHERE "name" = ?
        `).get(garnish)) {
          console.log(`MIGRATE: unknown garnish "${garnish}"`);
          return;
        }

        info = db.prepare(`
          INSERT INTO "recipe_garnish" ("recipe_id", "garnish_id", "optional", "order")
          VALUES (?, (SELECT "garnish_id" FROM "garnish" WHERE "name" = ?), ?, ?);
        `).run(recipeId, garnish, 0, order2);

        order2++;
      }

      count++;
    }
  }
};

module.exports = migrate;
