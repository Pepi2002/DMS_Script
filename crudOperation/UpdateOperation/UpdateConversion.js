// SETUP-4: Inserimento Dati di Test (nutrient_ref: 5000000)
db.conversion_factors.insertOne({
    nutrient_factor_id_: 5000000,
    fdc_id: 900010,
    protein_factor: {
        value: 5.75
    } 
});

// TEST SUCCESS-4: Aggiorna il valore di protein_factor (nutrient_ref: 5000000)
db.conversion_factors.updateOne(
    { nutrient_factor_id_: 5000000 },
    { $set: { "protein_factor.value": 6.5 } }
);

// TEST FAILURE-4: Tenta di impostare una stringa in un campo numerico 
// Risultato atteso: Document failed validation
db.conversion_factors.updateOne(
    { nutrient_factor_id_: 5000000 },
    { $set: { protein_factor: "sei_virgola_cinque" } }
);
