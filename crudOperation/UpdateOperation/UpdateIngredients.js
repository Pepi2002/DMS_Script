/* === UPDATE: COLLEZIONE ingredients === */

// SETUP-2: Inserimento Dati di Test (food_ref: 900010)
db.ingredients.insertOne({
    food_ref: 900010,
    seq_num: 1,
    unit: "G",
    gram_weight: 100.3, 
    amount: 1.5, 
    portion_code: 1,           
    portion_description: "Sample", 
    retention_code: 1,         
    sr_code: 1,                
    sr_description: "Sample description", 
    nutritional_profile: [{
        nutrient_ref: 203,
        nutrient_value: 1.5, 
        nutrient_value_source: "Calculated",
        foundation_year_acquired: 2024,
        start_date: ISODate("2024-01-01T00:00:00Z"), 
        end_date: ISODate("2024-06-01T00:00:00Z")
    }]
});

// SUCCESS-2: Aggiorna il valore nutrizionale del PRIMO elemento [0] nell'array
db.ingredients.updateOne(
    { food_ref: 900010 },
    { $set: { "nutritional_profile.0.nutrient_value": 5.5 } }
);

// FAILURE-2: Tenta di impostare una stringa nel campo numerico dell'array (Risultato atteso: ValidationError)
db.ingredients.updateOne(
    { food_ref: 900010 },
    { $set: { "nutritional_profile.0.nutrient_value": "cinque_virgola_cinque" } }
);