// SETUP: Inserimento Dati di Test
db.measure_units.insertOne({
    id: 99999, name: "UnitaToRemove"
});

// TEST SUCCESS-5: Cancellazione Singola per ID
db.measure_units.deleteOne(
    { id: 99999 }
);

// TEST FAILURE-5: Cancellazione con filtro non corrispondente
// Risultato atteso: deletedCount: 0
db.measure_units.deleteOne(
    { name: "name Inesistente" } 
);
