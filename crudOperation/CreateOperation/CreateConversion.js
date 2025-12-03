// TEST SUCCESS-2: Inserimento Fattore Proteico Valido
db.conversion_factors.insertOne({
    fdc_id: 900001,
    nutrient_factor_id_: 50000,
    protein_factor: { 
        value: 6.25 
    }
});

// TEST FAILURE-2: Gestione Errore con InsertMany() (Uno solo degli elementi viola lo schema)
// Risultato atteso: Il Documento 1 viene inserito con successo. L'operazione ritorna un errore di validazione solo per il Documento 2, dimostrando l'integrità del database anche in operazioni batch non ordinate.
db.conversion_factors.insertMany([
    {
        fdc_id: 900003,
        nutrient_factor_id_: 50002,
        calorie_factors: {
            carbohydrate_value: 4.07,
            fat_value: 8.37,
            protein_value: 3.47
        }
    },
    {
        fdc_id: 900004,
        nutrient_factor_id_: 50003
    }
]); 
