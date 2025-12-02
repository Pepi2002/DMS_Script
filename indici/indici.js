// --- 1. Collezione: nutrients ---
db.nutrients.createIndex(
  { "id": 1 }, 
  { unique: true }
);
db.nutrients.createIndex(
  { "name": 1 }
);
// --- 2. Collezione: measure_units ---
db.measure_units.createIndex(
  { "id": 1 }, 
  { unique: true }
);
db.measure_units.createIndex(
  { "name": 1 }
);
// --- 3. Collezione: foods ---
db.foods.createIndex(
  { "fdc_id": 1 }, 
  { unique: true }
);
db.foods.createIndex(
  { "portions.measure_unit_ref": 1 }
);
db.foods.creatIndex(
  {"data_type": 1},
  {unique:true}
);
db.foods.createIndex(
  {"wweia_category_code": 1},
  {unique:true}
);
// --- 4. Collezione: conversion_factors ---
db.conversion_factors.createIndex(
  { "nutrient_factor_id_": 1 }, 
  { unique: true }
);
db.conversion_factors.createIndex(
  { "fdc_id": 1 }
);
// --- 5. Collezione: ingredients ---
db.ingredients.createIndex(
  { "food_ref": 1, "seq_num": 1 }, 
  { unique: true }
);
db.ingredients.createIndex(
  { "nutritional_profile.nutrient_ref": 1 }
);

