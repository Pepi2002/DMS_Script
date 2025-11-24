/* === READ: COLLEZIONE conversion_factor - SETUP === */

// SETUP-4: Inserimento Dati di Test (con valore > 6.0)
db.conversion_factors.insertOne({
    fdc_id: 9000010,
    nutrient_factor_id_: 203,
    protein_factor: { 
        value: 6.75 // Valore alto per READ-E4
    } 
});

/* === READ: COLLEZIONE conversion_factor - QUERY === */

// READ-D4: Lettura Diretta per ID (fdc_id: 900010)
db.conversion_factors.find(
    { fdc_id: 9000010 }
).limit(1).pretty();

// READ-E4: Query su dati incorporati (Filtra per protein_factor.value > 6.0)
db.conversion_factors.find(
    { "protein_factor.value": { $gt: 6.0 } }
).limit(5).pretty();