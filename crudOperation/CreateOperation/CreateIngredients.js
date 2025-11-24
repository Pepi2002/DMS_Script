// --- INSERIMENTO INGREDIENTI CON DATE REALI E VALIDE ---
db.ingredients.insertOne({
    food_ref: 900001,
    seq_num: 1,
    unit: "G",
    portion_description: "100g",
    gram_weight: 100.0, 
    portion_code: 0,
    retention_code: 0,
    sr_code: 0,
    sr_description: "Test",
    amount: null,
    nutritional_profile: [{ 
        foundation_year_acquired: 2025,
        nutrient_ref: 203, 
        nutrient_value: 3.5,
        nutrient_value_source: "Calculated",
        start_date: ISODate("2025-10-19T00:00:00.000Z"),
        end_date: ISODate("2025-11-12T00:00:00.000Z")
    }]
});

// --- FAILURE-3: Violazione del Campo Obbligatorio nell'Array Incorporato ---
db.ingredients.insertOne({
    food_ref: 900002,
    seq_num: 1,
    unit: "G",
    portion_description: "100g",
    gram_weight: 100.0,
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
});
// Risultato atteso: Write Concern Error (Schema validation failed).