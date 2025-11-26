{
  $and: [
    {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          '_id',
          'acquisitions',
          'data_type',
          'description',
          'fdc_id',
          'portions',
          'publication_date',
          'survey_data'
        ],
        properties: {
          _id: {
            bsonType: 'objectId'
          },
          acquisitions: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              properties: {
                acquisition_date: {
                  bsonType: [
                    'date',
                    'null'
                  ]
                },
                expiration_date: {
                  bsonType: [
                    'date',
                    'null'
                  ]
                },
                location: {
                  bsonType: [
                    'string',
                    'null'
                  ]
                },
                sample_lot_nbr: {
                  bsonType: [
                    'string',
                    'null'
                  ]
                },
                store_city: {
                  bsonType: [
                    'string',
                    'null'
                  ]
                },
                store_name: {
                  bsonType: [
                    'string',
                    'null'
                  ]
                },
                store_state: {
                  bsonType: [
                    'string',
                    'null'
                  ]
                },
                upc_code: {
                  bsonType: [
                    'long',
                    'null'
                  ],
                  minimum: 0
                }
              }
            }
          },
          data_type: {
            bsonType: 'string'
          },
          description: {
            bsonType: 'string'
          },
          fdc_id: {
            bsonType: 'int',
            minimum: 0
          },
          portions: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: [
                'gram_weight',
                'measure_unit_ref',
                'modifier'
              ],
              properties: {
                amount: {
                  bsonType: [
                    'int',
                    'double',
                    'null'
                  ]
                },
                gram_weight: {
                  bsonType: [
                    'int',
                    'double'
                  ],
                  minimum: 0
                },
                measure_unit_ref: {
                  bsonType: 'int',
                  minimum: 0
                },
                modifier: {
                  bsonType: [
                    'int',
                    'string'
                  ]
                },
                seq_num: {
                  bsonType: [
                    'int',
                    'null'
                  ],
                  minimum: 0
                }
              }
            }
          },
          publication_date: {
            bsonType: [
              'date',
              'null'
            ]
          },
          survey_data: {
            bsonType: 'object',
            properties: {
              end_date: {
                bsonType: [
                  'date',
                  'null'
                ]
              },
              food_code: {
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
              },
              wweia_category_code: {
                bsonType: [
                  'int',
                  'null'
                ],
                minimum: 0
              },
              wweia_category_description: {
                bsonType: [
                  'string',
                  'null'
                ]
              }
            }
          }
        },
        anyOf: [
          {
            properties: {
              data_type: {
                'enum': [
                  'survey_fndds_food'
                ]
              },
              portions: {
                minItems: 1,
                description: 'Per \'survey_fndds_food\', \'portions\' non può essere vuoto.'
              },
              survey_data: {
                minProperties: 1,
                description: 'Per \'survey_fndds_food\', \'survey_data\' non può essere vuoto.'
              }
            }
          },
          {
            properties: {
              data_type: {
                'enum': [
                  'sr_legacy_food'
                ]
              },
              portions: {
                minItems: 1,
                description: 'Per \'sr_legacy\', \'portions\' non può essere vuoto.'
              }
            }
          },
          {
            properties: {
              data_type: {
                'enum': [
                  'market_acquisition'
                ]
              },
              acquisitions: {
                minItems: 1,
                description: 'Per \'market_acquisition\', \'acquisitions\' non può essere vuoto.'
              }
            }
          },
          {
            properties: {
              data_type: {
                not: {
                  'enum': [
                    'survey_fndds_food',
                    'sr_legacy_food',
                    'market_acquisition'
                  ]
                }
              }
            }
          }
        ]
      }
    },
    {
      $expr: {
        $and: [
          {
            $cond: {
              'if': {
                $ne: [
                  '$publication_date',
                  null
                ]
              },
              then: {
                $lt: [
                  '$publication_date',
                  '$$NOW'
                ]
              },
              'else': true
            }
          },
          {
            $cond: {
              'if': {
                $eq: [
                  '$data_type',
                  'survey_fndds_food'
                ]
              },
              then: {
                $and: [
                  {
                    $cond: {
                      'if': {
                        $ne: [
                          '$survey_data.start_date',
                          null
                        ]
                      },
                      then: {
                        $lt: [
                          '$survey_data.start_date',
                          '$$NOW'
                        ]
                      },
                      'else': false
                    }
                  },
                  {
                    $cond: {
                      'if': {
                        $ne: [
                          '$survey_data.end_date',
                          null
                        ]
                      },
                      then: {
                        $and: [
                          {
                            $lt: [
                              '$survey_data.end_date',
                              '$$NOW'
                            ]
                          },
                          {
                            $gt: [
                              '$survey_data.end_date',
                              '$survey_data.start_date'
                            ]
                          }
                        ]
                      },
                      'else': false
                    }
                  }
                ]
              },
              'else': true
            }
          }
        ]
      }
    }
  ]
}