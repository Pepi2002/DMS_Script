/* === DELETE: COLLEZIONE nutrients === */

// SETUP: Inserimento Dati di Test
db.nutrients.insertMany([
    { id: 9999991, nutrient_nbr: 999, name: "NutriToRemove", unit_name: "G", rank: 50 },
    { id: 9999992, nutrient_nbr: 998, name: "NutriToRemove", unit_name: "G", rank: 50 }
]);

// DELETE SUCCESS: Cancellazione Multipla per attributo
db.nutrients.deleteMany(
    { name: "NutriToRemove" } // Rimuove 999 e 998
);

// DELETE FAILURE: Cancellazione di un ID non esistente
db.nutrients.deleteOne(
    { nutrient_nbr: 9999999999 } // Risultato: deletedCount: 0
);