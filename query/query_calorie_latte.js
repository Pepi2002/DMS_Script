db.foods.aggregate([
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        fdc_id: 2340761
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
        from: "ingredients",
        localField: "fdc_id",
        foreignField: "food_ref",
        as: "lista_ingredienti"
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
        path: "$lista_ingredienti"
      }
  },
  {
    $addFields: {
      nutrienti_base: {
        $filter: {
          input:
            "$lista_ingredienti.nutritional_profile",
          as: "n",
          cond: {
            $and: [
              {
                $in: [
                  "$$n.nutrient_ref",
                  [203, 204, 205]
                ]
              },
              {
                $gte: [
                  "$$n.start_date",
                  ISODate(
                    "2019-01-01T00:00:00.000Z"
                  )
                ]
              }
            ]
          }
        }
      }
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
        from: "conversion_factors",
        let: {
          ids_ingredienti:
            "$nutrienti_base.fndds_id"
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: [
                  "$fdc_id",
                  "$$ids_ingredienti"
                ]
              },
              "calorie_factors.protein_value": {
                $exists: true
              }
            }
          },
          {
            $project: {
              _id: 0,
              fdc_id: 1,
              calorie_factors: 1
            }
          }
        ],
        as: "tutti_fattori_raw"
      }
  },
  {
    $addFields:
      /**
       * newField: The new field name.
       * expression: The new field expression.
       */
      {
        peso_grammi:
          "$lista_ingredienti.gram_weight",
        kcal_P: {
          $let: {
            vars: {
              nutriente: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$nutrienti_base",
                      as: "n",
                      cond: {
                        $eq: [
                          "$$n.nutrient_ref",
                          203
                        ]
                      }
                    }
                  },
                  0
                ]
              }
            },
            in: {
              $let: {
                vars: {
                  fattore_doc: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input:
                            "$tutti_fattori_raw",
                          as: "f",
                          cond: {
                            $eq: [
                              "$$f.fdc_id",
                              "$$nutriente.fndds_id"
                            ]
                          }
                        }
                      },
                      0
                    ]
                  }
                },
                in: {
                  $multiply: [
                    {
                      $ifNull: [
                        "$$nutriente.nutrient_value",
                        0
                      ]
                    },
                    {
                      $ifNull: [
                        "$$fattore_doc.calorie_factors.protein_value",
                        null
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        kcal_F: {
          $let: {
            vars: {
              nutriente: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$nutrienti_base",
                      as: "n",
                      cond: {
                        $eq: [
                          "$$n.nutrient_ref",
                          204
                        ]
                      }
                    }
                  },
                  0
                ]
              }
            },
            in: {
              $let: {
                vars: {
                  fattore_doc: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input:
                            "$tutti_fattori_raw",
                          as: "f",
                          cond: {
                            $eq: [
                              "$$f.fdc_id",
                              "$$nutriente.fndds_id"
                            ]
                          }
                        }
                      },
                      0
                    ]
                  }
                },
                in: {
                  $multiply: [
                    {
                      $ifNull: [
                        "$$nutriente.nutrient_value",
                        0
                      ]
                    },
                    {
                      $ifNull: [
                        "$$fattore_doc.calorie_factors.fat_value",
                        null
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        kcal_C: {
          $let: {
            vars: {
              nutriente: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$nutrienti_base",
                      as: "n",
                      cond: {
                        $eq: [
                          "$$n.nutrient_ref",
                          205
                        ]
                      }
                    }
                  },
                  0
                ]
              }
            },
            in: {
              $let: {
                vars: {
                  fattore_doc: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input:
                            "$tutti_fattori_raw",
                          as: "f",
                          cond: {
                            $eq: [
                              "$$f.fdc_id",
                              "$$nutriente.fndds_id"
                            ]
                          }
                        }
                      },
                      0
                    ]
                  }
                },
                in: {
                  $multiply: [
                    {
                      $ifNull: [
                        "$$nutriente.nutrient_value",
                        0
                      ]
                    },
                    {
                      $ifNull: [
                        "$$fattore_doc.calorie_factors.carbohydrate_value",
                        null
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      }
  },
  {
    $addFields:
      /**
       * newField: The new field name.
       * expression: The new field expression.
       */
      {
        calorie_ingrediente_totali: {
          $multiply: [
            {
              $divide: ["$peso_grammi", 100]
            },
            // Scala: (Peso usato / 100)
            {
              $sum: [
                "$kcal_P",
                "$kcal_F",
                "$kcal_C"
              ]
            }
          ]
        }
      }
  },
  {
    $group:
      /**
       * _id: The id of the group.
       * fieldN: The first field name.
       */
      {
        _id: "$_id",
        Nome: {
          $first: "$description"
        },
        Calorie_totali: {
          $sum: "$calorie_ingrediente_totali"
        }
      }
  }
])
