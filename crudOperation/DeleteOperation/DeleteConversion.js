/* === DELETE: COLLEZIONE conversion_factor === */

// SETUP: Inserimento Dati di Test
db.conversion_factors.insertOne({
    fdc_id: 9900005, nutrient_factor_id_: 203, 
    protein_factor: { value: 1.4 }
});

// DELETE SUCCESS: Cancellazione Singola per ID
db.conversion_factors.deleteOne(
    { fdc_id: 9900005 }
);

// DELETE FAILURE: Cancellazione con tipo di ID errato (fdc_id richiede numero)
db.conversion_factors.deleteOne(
    { fdc_id: "ID_NON_NUMERICO" } // Risultato: deletedCount: 0
);