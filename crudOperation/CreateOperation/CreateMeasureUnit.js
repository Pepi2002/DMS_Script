// TEST SUCCESS-5: Inserimento Unità di Misura Valida
db.measure_units.insertOne({
    id: 900001,
    name: "test spoon"
});

// TEST FAILURE-5: Violazione Campo Obbligatorio (name)
// Risultato atteso: MongoServerError: Document failed validation
db.measure_units.insertOne({
    id: 900002,
    // Fallimento: manca 'name'
});
