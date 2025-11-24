/* === UPDATE: COLLEZIONE nutrients === */

// SETUP-3: Inserimento Dati di Test (Due documenti con rank comune)
db.nutrients.insertMany([
    { id: 9000001, nutrient_nbr: 203, name: "Proteine", unit_name: "G", rank: 100 }, // Rank comune
    { id: 9000002, nutrient_nbr: 301, name: "Calcio", unit_name: "MG", rank: 100 }  // Rank comune
]);

// SUCCESS-3: Aggiorna il rank di un singolo nutriente (nutrient_nbr: 203)
db.nutrients.updateOne(
    { nutrient_nbr: 203 },
    { $set: { rank: 150 } }
);

// FAILURE-3: Fallimento in Blocco - Tenta di impostare un numero su un campo stringa (unit_name) per tutti i documenti con rank 100
db.nutrients.updateMany(
    { rank: 100 },
    { $set: { unit_name: 12345 } } // Valore numerico non valido per il tipo stringa
);