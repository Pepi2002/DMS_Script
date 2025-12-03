// SETUP-5: Inserimento Dati di Test (id: 1000)
db.measure_units.insertOne({
    id: 1000,
    name: "Test Spoon",
});

// TEST SUCCESS-5: Aggiorna l'abbreviazione dell'unità (id: 1000)
db.measure_units.updateOne(
    { id: 1000 },
    { $set: { name: "Test Cup" } }
);

// TEST FAILURE-5: Tenta di impostare una stringa nel campo ID numerico 
// Risultato atteso: Document failed validation
db.measure_units.updateOne(
    { id: 1000 },
    { $set: { id: "nuovo_id" } }
);

