/* === DELETE: COLLEZIONE foods === */

// SETUP-1: Inserimento Dati di Test
db.foods.insertMany([
    {
        fdc_id: 9000010, 
        description: "Cibo base test", // Filtro comune
        data_type: "sr_legacy_food",
        publication_date: ISODate("2024-11-01T00:00:00Z"), 
        acquisitions: [],
        survey_data: { start_date: null, end_date: null }, 
        portions: [{ 
            gram_weight: 100.3, 
            measure_unit_ref: 1000, 
            modifier: "cup" 
        }]
    },
    {
        fdc_id: 9000011, 
        description: "Cibo base test", // Filtro comune
        data_type: "sr_legacy_food",
        publication_date: ISODate("2024-11-01T00:00:00Z"), 
        acquisitions: [],
        survey_data: { start_date: null, end_date: null }, 
        portions: [{ 
            gram_weight: 100.3, 
            measure_unit_ref: 1000, 
            modifier: "cup" 
        }]
    }
]);

// DELETE SUCCESS: Cancellazione Singola per ID
db.foods.deleteOne(
    { fdc_id: 9000011 } 
);

// DELETE FAILURE: Cancellazione con filtro non corrispondente
db.foods.deleteMany(
    { data_type: "Data Inesistente" } // Risultato: deletedCount: 0
);