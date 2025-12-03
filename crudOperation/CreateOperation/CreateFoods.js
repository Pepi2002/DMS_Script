// TEST SUCCESS-1: Inserimento valido 
db.foods.insertOne({
    _id: new ObjectId(), 
    fdc_id: 900003, 
    description: "Alimento Test Legacy Definitivo",
    data_type: "sr_legacy_food",
    publication_date: ISODate("2024-11-19T00:00:00.000Z"), 
    acquisitions: [],
    survey_data: {}, 
    portions: [{ 
        gram_weight: 100.3, 
        measure_unit_ref: 1000,
        modifier: "1 cup", 
        amount: 1.5,        
        seq_num: 1 
    }]
});

// TEST FAILURE-1: Violazione del vincolo anyOf (portions vuoto)
// Risultato atteso: MongoServerError: Document failed validation
db.foods.insertOne({
    fdc_id: 900002,
    description: "Alimento Fallito",
    data_type: "sr_legacy_food",
    publication_date: ISODate("2025-11-19T00:00:00.000Z"),
    acquisitions: [],
    survey_data: {},
    portions: [] // Fallimento Atteso: minItems non soddisfatto
}); 
