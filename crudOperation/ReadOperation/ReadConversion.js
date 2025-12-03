// SETUP-4: Inserimento Dati di Test
db.conversion_factors.insertOne({
    fdc_id: 9000010,
    nutrient_factor_id_: 203,
    protein_factor: { 
        value: 1000000000000 // Valore alto per HIGH-4
    } 
});

// TEST ID-4: Lettura Diretta per ID (fdc_id: 900010)
db.conversion_factors.find(
    { fdc_id: 9000010 }
).pretty();

// TEST HIGH-4: Query su dati incorporati (Filtra per protein_factor.value > 900000000000)
db.conversion_factors.find(
    { "protein_factor.value": { $gt: 900000000000 } }
).pretty();
