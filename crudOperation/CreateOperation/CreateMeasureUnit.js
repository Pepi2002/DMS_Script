// --- SUCCESS-5: Inserimento Unità di Misura Valida ---
db.measure_unit.insertOne({
    id: 900001,
    name: "test spoon"
});
// Risultato atteso: Inserimento OK.

// --- FAILURE-5: Violazione Campo Obbligatorio (name) ---
db.measure_unit.insertOne({
    id: 900002,
    // <<< Fallimento: manca 'name'
});
// Risultato atteso: Write Concern Error (Schema validation failed).