// SETUP-2: Inserimento Dati di Test (con un valore alto per il filtro)
db.ingredients.insertOne({
    food_ref: 9000010,
    seq_num: 1, 
    gram_weight: 100.3, 
    amount: 1.5,
    portion_code: 1, 
    portion_description: "Sample", 
    retention_code: 1, 
    sr_code: 1, 
    sr_description: "Sample description",
    nutritional_profile: [{
        fndds_id: 500000,
        nutrient_ref: 203,
        nutrient_value: 100000000000, // Valore alto per la Query HIGH-2
        nutrient_value_source: "Calculated", 
        foundation_year_acquired: 2024,
        start_date: ISODate("2024-01-01T00:00:00Z"), 
        end_date: ISODate("2024-06-01T00:00:00Z")
    }]
});

// TEST ID-2: Lettura Diretta per ID (food_ref: 900010)
db.ingredients.find(
    { food_ref: 9000010 }
).pretty();

// TEST HIGH-2: Query su dati incorporati (Filtra per nutrient_value > 90000000000)
db.ingredients.find(
    { "nutritional_profile.nutrient_value": { $gt: 90000000000 } }
).pretty();


