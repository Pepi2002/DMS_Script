// SETUP-3: Inserimento Dati di Test
db.nutrients.insertMany([
    { id: 9000001, nutrient_nbr: 203, name: "Proteine", unit_name: "G", rank: 10000000 }, // Rank comune
    { id: 9000002, nutrient_nbr: 301, name: "Calcio", unit_name: "MG", rank: 10000000 }  // Rank comune
]);

// ID-3: Lettura Diretta per ID (id:  9000001)
db.nutrients.find(
    { id:  9000001 }
).pretty();

// HIGH-3: Query per attributo (Filtra per rank: 10000000)
db.nutrients.find(
    { rank: 10000000 }
).pretty();
