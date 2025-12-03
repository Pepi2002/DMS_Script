// SETUP: Inserimento Dati di Test
db.conversion_factors.insertOne({
    fdc_id: 9900005,
    nutrient_factor_id_: 203, 
    protein_factor: { 
        value: 1.4 
    }
});

// TEST SUCCESS-4: Cancellazione Singola per ID
db.conversion_factors.deleteOne(
    { fdc_id: 9900005 }
);

// TEST FAILURE-4: Cancellazione con tipo di ID errato (fdc_id richiede numero)
// Risultato atteso: deletedCount: 0
db.conversion_factors.deleteOne(
    { fdc_id: "ID_NON_NUMERICO" } 
);
