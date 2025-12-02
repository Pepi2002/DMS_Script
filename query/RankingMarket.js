db.foods.aggregate([
    {
        // FASE 1: FILTRO CRITICO (IXSCAN vs COLLSCAN)
        // Isola i documenti di tipo 'market_acquisition' che contengono i dati del negozio.
        // L'efficienza di questa fase dipende dall'indice su 'data_type'.
        "$match": {
            "data_type": "market_acquistion"
        }
    },
    {
        // FASE 2: SCOMPATTAZIONE
        // Separa ogni elemento dell'array 'acquisitions' in un documento distinto.
        "$unwind": "$acquisitions"
    },
    {
        // FASE 3: RAGGRUPPAMENTO E CONTEGGIO
        // Raggruppa per nome del negozio e conta la frequenza totale.
        "$group": {
            "_id": "$acquisitions.store_name",
            "total_acquisitions": { "$sum": 1 },
            // Campi di esempio per contesto
            "example_city": { "$first": "$acquisitions.store_city" },
            "sample_food_item": { "$first": "$description" }
        }
    },
    {
        // FASE 4: PULIZIA (Rimuove nomi di negozio nulli/vuoti)
        "$match": {
            "_id": { "$ne": null, "$ne": "" }
        }
    },
    {
        // FASE 5: ORDINAMENTO (Ranking)
        "$sort": { "total_acquisitions": -1 }
    },
    {
        // FASE 6: LIMITE (Top 10)
        "$limit": 10
    },
    {
        // FASE 7: PROIEZIONE E FORMATTAZIONE
        // Rinomina i campi per un output più leggibile.
        "$project": {
            "_id": 0,
            "store_name": "$_id",
            "acquisition_count": "$total_acquisitions",
            "city_example": "$example_city",
            "sample_food_item": "$sample_food_item"
        }
    }
]);