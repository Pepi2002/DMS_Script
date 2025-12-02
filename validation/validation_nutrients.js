{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      '_id',
      'id',
      'name',
      'unit_name',
      'nutrient_nbr',
      'rank'
    ],
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: 'objectId'
      },
      id: {
        bsonType: 'int',
        minimum: 0
      },
      name: {
        bsonType: 'string'
      },
      nutrient_nbr: {
        bsonType: [
          'int',
          'double',
          'null'
        ],
        minimum: 0
      },
      rank: {
        bsonType: [
          'double',
          'int',
          'null'
        ],
        minimum: 0
      },
      unit_name: {
        bsonType: 'string'
      }
    }
  }
}