// SETUP-3: Inserimento Dati di Test (Due documenti con rank comune)
db.nutrients.insertMany([
    { id: 9000001, nutrient_nbr: 50000, name: "Proteine", unit_name: "G", rank: 100 }, 
    { id: 9000002, nutrient_nbr: 301, name: "Calcio", unit_name: "MG", rank: 100 }  
]);

// TEST SUCCESS-3: Aggiorna il rank di un singolo nutriente (nutrient_nbr: 50000)
db.nutrients.updateOne(
    { nutrient_nbr: 50000 },
    { $set: { rank: 150 } }
);

// TEST FAILURE-3: Fallimento in Blocco - Tenta di impostare un numero su un campo stringa (unit_name) per tutti i documenti con rank 100
// Risultato Atteso: Document failed validation
db.nutrients.updateMany(
    { rank: 100 },
    { $set: { unit_name: 12345 } } 
);
