/* === UPDATE: COLLEZIONE foods === */

// SETUP-1: Inserimento Dati di Test (Due documenti per UpdateMany)
db.foods.insertMany([
    {
        fdc_id: 900010, 
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
        fdc_id: 900011, 
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

// SUCCESS-1: Aggiornamento in Blocco - Aggiorna la data di pubblicazione a una data PASSATA (es. 2023)
db.foods.updateMany(
    { description: "Cibo base test" }, 
    { $set: { publication_date: ISODate("2023-01-01T00:00:00Z") } } 
);

// FAILURE-1: Tenta di impostare una stringa su un campo ID numerico (Risultato atteso: ValidationError)
db.foods.updateOne(
    { fdc_id: 900010 },
    { $set: { fdc_id: "nuovo_id_sbagliato" } }
);