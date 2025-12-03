// SETUP-2: Inserimento Dati di Test
db.ingredients.insertMany([
    {
        food_ref: 9900004,
        seq_num: 1,
        unit: "G",
        gram_weight: 50.2,
        amount: 0.5,
        portion_code: 1,
        portion_description: "Sample",
        retention_code: 1,
        sr_code: 1,
        sr_description: "Sample description",
        nutritional_profile: [{
            fndds_id: 50000,
            nutrient_ref: 203,
            nutrient_value: 1.5, 
            nutrient_value_source: "Testing", // Filtro comune
            foundation_year_acquired: 2024,
            start_date: ISODate("2024-01-01T00:00:00Z"), 
            end_date: ISODate("2024-06-01T00:00:00Z")
        }]
    },
    {
        food_ref: 9900005, 
        seq_num: 1,
        unit: "G",
        gram_weight: 100.2,
        amount: 1.2,
        portion_code: 1,
        portion_description: "Sample",
        retention_code: 1,
        sr_code: 1,
        sr_description: "Sample description",
        nutritional_profile: [{
            fndds_id: 500001,
            nutrient_ref: 203,
            nutrient_value: 5.3, 
            nutrient_value_source: "Testing", // Filtro comune
            foundation_year_acquired: 2024,
            start_date: ISODate("2024-01-01T00:00:00Z"), 
            end_date: ISODate("2024-06-01T00:00:00Z")
        }]
    }
]);

// TEST SUCCESS-2: Cancellazione Multipla basata su dato incorporato
db.ingredients.deleteMany(
    { "nutritional_profile.nutrient_value_source": "Testing" } 
);

// TEST FAILURE-2: Cancellazione di un ID non esistente
// Risultato atteso: deletedCount: 0
db.ingredients.deleteOne(
    { food_ref: 999999 } 
);
