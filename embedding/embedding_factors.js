db.food_nutrient_conversion_factor.aggregate([
    {
      $lookup: {
        from: "food_calorie_conversion_factor",
        localField: "id",
        foreignField:
          "food_nutrient_conversion_factor_id",
        as: "calorie_temp"
      }
    },
    {
      $lookup: {
        from: "food_protein_conversion_factor",
        localField: "id",
        foreignField:
          "food_nutrient_conversion_factor_id",
        as: "protein_temp"
      }
    },
    {
      $addFields: {
        calorie_temp_obj: {
          $ifNull: [
            {
              $arrayElemAt: ["$calorie_temp", 0]
            },
            {}
          ]
        },
        protein_temp_obj: {
          $ifNull: [
            {
              $arrayElemAt: ["$protein_temp", 0]
            },
            {}
          ]
        }
      }
    },
    {
      $project: {
        _id: 0,
        fdc_id: "$fdc_id",
        nutrient_factor_id_: "$id",
        calorie_factors: {
          protein_value:
            "$calorie_temp_obj.protein_value",
          fat_value: "$calorie_temp_obj.fat_value",
          carbohydrate_value:
            "$calorie_temp_obj.carbohydrate_value"
        },
        protein_factor: {
          value: "$protein_temp_obj.value"
        }
      }
    },
    {
      $out: {
        db: "FoodData",
        coll: "conversion_factors"
      }
    }
  ])