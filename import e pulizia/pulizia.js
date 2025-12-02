db.nutrient.updateMany(
  { "nutrient_nbr": NaN }, 
  { $set: { "nutrient_nbr": null } }
)

db.nutrient.updateMany(
  { "rank": NaN }, 
  { $set: { "rank": null } }
)

db.input_food.updateMany(
  { "unit": NaN }, 
  { $set: { "unit": null } }
)
