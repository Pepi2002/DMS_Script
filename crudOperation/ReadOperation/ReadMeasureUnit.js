/* === READ: COLLEZIONE measure_unit - SETUP === */

// SETUP-5: Inserimento Dati di Test
db.measure_unit.insertOne({
    id: 1000,
    name: "Test Cup",
});

/* === READ: COLLEZIONE measure_unit - QUERY === */

// READ-D5: Lettura Diretta per ID (id: 1000)
db.measure_unit.find(
    { id: 1000 }
).limit(1).pretty();

// READ-E5: Query per attributo (Filtra per abbreviation: 'tz')
db.measure_unit.find(
    { name: "Test Cup" }
).limit(5).pretty();