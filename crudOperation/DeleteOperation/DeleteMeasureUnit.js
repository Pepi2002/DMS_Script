/* === DELETE: COLLEZIONE measure_unit === */

// SETUP: Inserimento Dati di Test
db.measure_unit.insertOne({
    id: 99999, name: "UnitaToRemove"
});

// DELETE SUCCESS: Cancellazione Singola per ID
db.measure_unit.deleteOne(
    { id: 99999 }
);

// DELETE FAILURE: Cancellazione con filtro non corrispondente
db.measure_unit.deleteOne(
    { name: "name Inesistente" } // Risultato: deletedCount: 0
);