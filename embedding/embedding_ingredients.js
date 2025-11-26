db.input_food.aggregate([
  {
    $lookup:
      /**
       * from: The target collection.
       * localField: The local join field.
       * foreignField: The target join field.
       * as: The name for the results.
       * pipeline: Optional pipeline to run on the foreign collection.
       * let: Optional variables to use in the pipeline field stages.
       */
      {
        from: "fndds_ingredient_nutrient_value",
        localField: "sr_code",
        foreignField: "ingredient code",
        as: "nutritional_temp"
      }
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _id: 0,
        food_ref: "$fdc_id",
        seq_num: "$seq_num",
        amount: "$amount",
        sr_code: "$sr_code",
        sr_description: "$sr_description",
        unit: "$unit",
        portion_code: "$portion_code",
        portion_description:
          "$portion_description",
        gram_weight: "$gram_weight",
        retention_code: "$retention_code",
        nutritional_profile: {
          $map: {
            input: "$nutritional_temp",
            as: "n",
            in: {
              fndds_id: "$$n.FDC ID",
              nutrient_ref: "$$n.Nutrient code",
              nutrient_value:
                "$$n.Nutrient value",
              nutrient_value_source:
                "$$n.Nutrient value source",
              sr_add_mod_year:
                "$$n.SR AddMod year",
              foundation_year_acquired:
                "$$n.Foundation year acquired",
              start_date: "$$n.Start date",
              end_date: "$$n.End date"
            }
          }
        }
      }
  },
  {
    $out:
      /**
       * Provide the name of the output database and collection.
       */
      {
        db: "food_db_definitivo",
        coll: "ingredients"
      }
  }
], 
{ allowDiskUse: true })
