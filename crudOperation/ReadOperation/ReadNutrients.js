/* === READ: COLLEZIONE nutrients - SETUP === */

// SETUP-3: Inserimento Dati di Test
db.nutrients.insertMany([
    { id: 9000001, nutrient_nbr: 203, name: "Proteine", unit_name: "G", rank: 100 }, // Rank comune
    { id: 9000002, nutrient_nbr: 301, name: "Calcio", unit_name: "MG", rank: 100 }  // Rank comune
]);

/* === READ: COLLEZIONE nutrients - QUERY === */

// READ-D3: Lettura Diretta per ID (nutrient_nbr: 203)
db.nutrients.find(
    { id:  9000001 }
).limit(1).pretty();

// READ-E3: Query per attributo (Filtra per unit_name: 'G')
db.nutrients.find(
    { unit_name: "G" }
).limit(5).pretty();