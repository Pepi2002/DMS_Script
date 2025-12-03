// SETUP-5: Inserimento Dati di Test
db.measure_units.insertOne({
    id: 1000,
    name: "Test Cup",
});

// TEST ID-5: Lettura Diretta per ID (id: 1000)
db.measure_units.find(
    { id: 1000 }
).pretty();

// TEST HIGH-5: Query per attributo (Filtra per name: 'Test Cup')
db.measure_units.find(
    { name: "Test Cup" }
).pretty();

