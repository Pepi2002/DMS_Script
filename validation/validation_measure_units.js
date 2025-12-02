{
    $jsonSchema: {
      bsonType: 'object',
      required: [
        '_id',
        'id',
        'name'
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
        }
      }
    }
  }