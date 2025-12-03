db.foods.aggregate([
    {
        //1. Trova i dati di tipo market_acquistion
        "$match": {
            "data_type": "market_acquistion"
        }
    },
    {
        //2. Srotola l'array in cui sono presenti i dati di acquisizione
        "$unwind": "$acquisitions"
    },
    {
        //3. Raggruppa tramite nome dello store e conta il numero di acquisizioni 
        "$group": {
            "_id": "$acquisitions.store_name",
            "total_acquisitions": { "$sum": 1 },
            "example_city": { "$first": "$acquisitions.store_city" },
            "sample_food_item": { "$first": "$description" }
        }
    },
    {
        //4. Toglie quelli uguali a null o stringa vuota
        "$match": {
            "_id": { "$ne": null, "$ne": "" }
        }
    },
    {
        //5. Ordina in ordine decrescente
        "$sort": { "total_acquisitions": -1 }
    },
    {
        //6. Limita a 10 elementi
        "$limit": 10
    },
    {
        //7. Proietta fornendo nome dello store, numero di acquisizioni ed esempi di dati circostanti
        "$project": {
            "_id": 0,
            "store_name": "$_id",
            "acquisition_count": "$total_acquisitions",
            "city_example": "$example_city",
            "sample_food_item": "$sample_food_item"
        }
    }
]);


