/* === UPDATE: COLLEZIONE conversion_factor === */

// SETUP-4: Inserimento Dati di Test (nutrient_ref: 203)
db.conversion_factors.insertOne({
    nutrient_factor_id_: 203,
    fdc_id: 900010,
    protein_factor: {
        value: 5.75
    } // Fattore iniziale
});

// SUCCESS-4: Aggiorna il valore di protein_factor (nutrient_ref: 203)
db.conversion_factors.updateOne(
    { nutrient_factor_id_: 203 },
    { $set: { "protein_factor.value": 6.5 } }
);

// FAILURE-4: Tenta di impostare una stringa in un campo numerico (Risultato atteso: ValidationError)
db.conversion_factors.updateOne(
    { nutrient_factor_id_: 203 },
    { $set: { protein_factor: "sei_virgola_cinque" } }
);