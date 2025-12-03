// TEST SUCCESS-3: Inserimento valido
db.ingredients.insertOne({
    food_ref: 900001,
    seq_num: 1,
    portion_description: "100g",
    gram_weight: 100.4, 
    portion_code: 0,
    retention_code: 0,
    sr_code: 0,
    sr_description: "Test",
    amount: null,
    nutritional_profile: [{ 
        fndds_id: 1000,
        foundation_year_acquired: 2025,
        nutrient_ref: 203, 
        nutrient_value: 3.5,
        nutrient_value_source: "Calculated",
        start_date: ISODate("2025-10-19T00:00:00.000Z"),
        end_date: ISODate("2025-11-12T00:00:00.000Z")
    }]
});

// TEST FAILURE-3: Violazione del Campo Obbligatorio nell'Array Incorporato
// Risultato atteso: MongoServerError: Document failed validation
db.ingredients.insertOne({
    food_ref: 900002,
    seq_num: 1,
    portion_description: "100g",
    gram_weight: 100.4,
    portion_code: 0,
    retention_code: 0,
    sr_code: 0,
    sr_description: "Test",
    amount: null,
    nutritional_profile: [{ 
        foundation_year_acquired: 2025,
        nutrient_ref: 203,
        nutrient_value: 3.5 
        // <<< Fallimento: manca 'nutrient_value_source'
    }]
})
});

