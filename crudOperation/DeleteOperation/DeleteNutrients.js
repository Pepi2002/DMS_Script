// SETUP: Inserimento Dati di Test
db.nutrients.insertMany([
    { id: 9999991, nutrient_nbr: 999, name: "NutriToRemove", unit_name: "G", rank: 50 },
    { id: 9999992, nutrient_nbr: 998, name: "NutriToRemove", unit_name: "G", rank: 50 }
]);

// TEST SUCCESS-3: Cancellazione Multipla per attributo
db.nutrients.deleteMany(
    { name: "NutriToRemove" } 
);

// TEST FAILURE-3: Cancellazione di un ID non esistente
// Risultato atteso: deletedCount: 0
db.nutrients.deleteOne(
    { nutrient_nbr: 9999999999 } 
);
