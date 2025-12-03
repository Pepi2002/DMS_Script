// SETUP-1: Inserimento Dati di Test (Due documenti con modifier 'cup')
db.foods.insertMany([
    {
        fdc_id: 9000010, 
        description: "Cibo base test", // Per usare solo i dati di test
        data_type: "sr_legacy_food",
        publication_date: ISODate("2024-11-01T00:00:00Z"), 
        acquisitions: [],
        survey_data: {}, 
        portions: [{ 
            gram_weight: 100.3, 
            measure_unit_ref: 1000, 
            modifier: "cup" // Filtro comune
        }]
    },
    {
        fdc_id: 9000011, 
        description: "Cibo base test", // Per usare solo i dati di test
        data_type: "sr_legacy_food",
        publication_date: ISODate("2024-11-01T00:00:00Z"), 
        acquisitions: [],
        survey_data: {}, 
        portions: [{ 
            gram_weight: 100.3, 
            measure_unit_ref: 1000, 
            modifier: "cup" // Filtro comune
        }]
    }
]);

// TEST ID-1: Lettura Diretta per ID (fdc_id: 900010)
db.foods.find(
    { fdc_id: 9000010 }
).pretty();

// TEST HIGH-1: Query su dati incorporati (Filtra per modifier 'cup' all'interno di portions)
db.foods.find(
    { $and: [{description: "Cibo base test"}, {"portions.modifier": "cup" }]}
).pretty();
