db.foods.aggregate([
    {
        // FASE 1: FILTRO DI ESISTENZA CRITICO (IXSCAN vs COLLSCAN)
        // Seleziona solo i documenti che hanno un codice categoria WWEIA valido e non nullo.
        // L'indice su 'survey_data.wweia_category_code' viene applicato qui.
        "$match": {
            "survey_data.wweia_category_code": { "$ne": null, "$exists": true }
        }
    },
    {
        // FASE 2: RAGGRUPPAMENTO E CONTEGGIO
        // Raggruppa tutti i documenti in base al codice di categoria e conta la frequenza.
        "$group": {
            "_id": "$survey_data.wweia_category_code",
            "category_description": { "$first": "$survey_data.wweia_category_description" }, // Aggiunge la descrizione per chiarezza
            "total_count": { "$sum": 1 }
        }
    },
    {
        // FASE 3: ORDINAMENTO (Ranking)
        // Ordina in base alla frequenza (decrescente).
        "$sort": { "total_count": -1 }
    },
    {
        // FASE 4: LIMITE (Top 10)
        "$limit": 10
    },
    {
        // FASE 5: PROIEZIONE
        "$project": {
            "_id": 0,
            "wweia_category_code": "$_id",
            "category_description": 1,
            "total_count": 1
        }
    }
]);
