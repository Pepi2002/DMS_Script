{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      '_id',
      'fdc_id',
      'nutrient_factor_id_'
    ],
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: 'objectId'
      },
      fdc_id: {
        bsonType: 'int',
        minimum: 0
      },
      nutrient_factor_id_: {
        bsonType: 'int',
        minimum: 0
      },
      calorie_factors: {
        bsonType: 'object',
        required: [
          'carbohydrate_value',
          'fat_value',
          'protein_value'
        ],
        properties: {
          carbohydrate_value: {
            bsonType: 'double',
            minimum: 0
          },
          fat_value: {
            bsonType: 'double',
            minimum: 0
          },
          protein_value: {
            bsonType: 'double',
            minimum: 0
          }
        },
        additionalProperties: false
      },
      protein_factor: {
        bsonType: 'object',
        required: [
          'value'
        ],
        properties: {
          value: {
            bsonType: 'double',
            minimum: 0
          }
        },
        additionalProperties: false
      }
    },
    oneOf: [
      {
        required: [
          'calorie_factors'
        ]
      },
      {
        required: [
          'protein_factor'
        ]
      }
    ]
  }
}