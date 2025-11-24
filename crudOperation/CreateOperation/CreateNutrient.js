// --- SUCCESS-4: Inserimento Nutriente Valido ---
db.nutrients.insertOne({
    id: 900001,
    name: "Test Nutriente",
    unit_name: "UG",
    nutrient_nbr: 900001,
    rank: 99
});
// Risultato atteso: Inserimento OK.

// --- FAILURE-4: Violazione del tipo di dato su nutrient_nbr ---
db.nutrients.insertOne({
    id: 900002,
    name: "Test Nutriente Fallito",
    unit_name: "UG",
    nutrient_nbr: "900002", // <<< Fallimento: deve essere un numero
    rank: 99
});
// Risultato atteso: Write Concern Error (Schema validation failed).