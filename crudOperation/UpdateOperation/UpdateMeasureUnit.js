/* === UPDATE: COLLEZIONE measure_unit === */

// SETUP-5: Inserimento Dati di Test (id: 1000)
db.measure_unit.insertOne({
    id: 1000,
    name: "Test Spoon",
});

// SUCCESS-5: Aggiorna l'abbreviazione dell'unità (id: 1000)
db.measure_unit.updateOne(
    { id: 1000 },
    { $set: { name: "Test Cup" } }
);

// FAILURE-5: Tenta di impostare una stringa nel campo ID numerico (Risultato atteso: ValidationError)
db.measure_unit.updateOne(
    { id: 1000 },
    { $set: { id: "nuovo_id" } }
);