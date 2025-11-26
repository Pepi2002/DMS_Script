db.food.aggregate([
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
        from: "food_portion",
        localField: "fdc_id",
        foreignField: "fdc_id",
        as: "portions_temp"
      }
  },
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
        from: "market_acquisition",
        localField: "fdc_id",
        foreignField: "fdc_id",
        as: "acquisitions_temp"
      }
  },
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
        from: "survey_fndds_food",
        localField: "fdc_id",
        foreignField: "fdc_id",
        as: "survey_temp"
      }
  },
  {
    $unwind:
      /**
       * path: Path to the array field.
       * includeArrayIndex: Optional name for index.
       * preserveNullAndEmptyArrays: Optional
       *   toggle to unwind null and empty values.
       */
      {
        path: "$survey_temp",
        preserveNullAndEmptyArrays: true
      }
  },
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
        from: "wweia_food_category",
        localField:
          "survey_temp.wweia_category_code",
        foreignField: "wweia_food_category",
        as: "category_temp"
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
        fdc_id: "$fdc_id",
        description: "$description",
        data_type: "$data_type",
        publication_date: "$publication_date",
        portions: {
          $map: {
            input: "$portions_temp",
            as: "p",
            in: {
              amount: "$$p.amount",
              modifier: "$$p.modifier",
              gram_weight: "$$p.gram_weight",
              measure_unit_ref:
                "$$p.measure_unit_id",
              seq_num: "$$p.seq_num"
            }
          }
        },
        acquisitions: {
          $map: {
            input: "$acquisitions_temp",
            as: "a",
            in: {
              expiration_date:
                "$$a.expiration_date",
              location: "$$a.location",
              acquisition_date:
                "$$a.acquisition_date",
              sample_lot_nbr:
                "$$a.sample_lot_nbr",
              store_city: "$$a.store_city",
              store_name: "$$a.store_name",
              store_state: "$$a.store_state",
              upc_code: "$$a.upc_code"
            }
          }
        },
        survey_data: {
          $cond: {
            if: {
              $eq: [
                {
                  $type: "$survey_temp"
                },
                "missing"
              ]
            },
            then: {},
            else: {
              food_code: "$survey_temp.food_code",
              wweia_category_code:
                "$survey_temp.wweia_category_code",
              start_date:
                "$survey_temp.start_date",
              end_date: "$survey_temp.end_date",
              wweia_category_description: {
                $arrayElemAt: [
                  "$category_temp.wweia_food_category_description",
                  0
                ]
              }
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
        coll: "foods"
      }
  }
])
