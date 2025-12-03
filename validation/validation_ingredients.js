{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      '_id',
      'amount',
      'food_ref',
      'gram_weight',
      'nutritional_profile',
      'portion_code',
      'portion_description',
      'retention_code',
      'seq_num',
      'sr_code',
      'sr_description'
    ],
    properties: {
      _id: {
        bsonType: 'objectId'
      },
      amount: {
        bsonType: [
          'double',
          'int',
          'null'
        ]
      },
      food_ref: {
        bsonType: 'int',
        minimum: 0
      },
      gram_weight: {
        bsonType: [
          'double',
          'int,
          'null'
        ],
        minimum: 0
      },
      nutritional_profile: {
        bsonType: 'array',
        items: {
          bsonType: 'object',
          required: [
            'fndds_id',
            'foundation_year_acquired',
            'nutrient_ref',
            'nutrient_value',
            'nutrient_value_source'
          ],
          properties: {
            end_date: {
              bsonType: [
                'date',
                'null'
              ]
            },
            fndds_id: {
              bsonType: 'int',
              minimum: 0
            },
            foundation_year_acquired: {
              bsonType: 'int',
              minimum: 0
            },
            nutrient_ref: {
              bsonType: 'int',
              minimum: 0
            },
            nutrient_value: {
              bsonType: [
                'double',
                'int',
              ],
              minimum: 0
            },
            nutrient_value_source: {
              bsonType: 'string'
            },
            sr_add_mod_year: {
              bsonType: [
                'int',
                'null'
              ],
              minimum: 0
            },
            start_date: {
              bsonType: [
                'date',
                'null'
              ]
            }
          }
        }
      },
      portion_code: {
        bsonType: 'int',
        minimum: 0
      },
      portion_description: {
        bsonType: 'string'
      },
      retention_code: {
        bsonType: 'int',
        minimum: 0
      },
      seq_num: {
        bsonType: 'int',
        minimum: 0
      },
      sr_code: {
        bsonType: 'int',
        minimum: 0
      },
      sr_description: {
        bsonType: 'string'
      },
      unit: {
        bsonType: [
          'string',
          'null'
        ]
      }
    }
  },
  $expr: {
    $allElementsTrue: {
      $map: {
        input: '$nutritional_profile',
        as: 'n',
        'in': {
          $and: [
            {
              $cond: {
                'if': {
                  $ne: [
                    '$$n.start_date',
                    null
                  ]
                },
                then: {
                  $lt: [
                    '$$n.start_date',
                    '$$NOW'
                  ]
                },
                'else': true
              }
            },
            {
              $cond: {
                'if': {
                  $and: [
                    {
                      $ne: [
                        '$$n.end_date',
                        null
                      ]
                    },
                    {
                      $ne: [
                        '$$n.start_date',
                        null
                      ]
                    }
                  ]
                },
                then: {
                  $gt: [
                    '$$n.end_date',
                    '$$n.start_date'
                  ]
                },
                'else': true
              }
            }
          ]
        }
      }
    }
  }
}
