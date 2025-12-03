db.foods.aggregate([
    {
        //1. Trova i dati che hanno un category_code
        "$match": {
            "survey_data.wweia_category_code": { "$ne": null, "$exists": true }
        }
    },
    {
        //2. Raggruppa in base al category_code e ne conta gli utilizzi
        "$group": {
            "_id": "$survey_data.wweia_category_code",
            "category_description": { "$first": "$survey_data.wweia_category_description" }, 
            "total_count": { "$sum": 1 }
        }
    },
    {
        //3. Ordina in ordine decrescente
        "$sort": { "total_count": -1 }
    },
    {
        //4. Limita a 10 elementi
        "$limit": 10
    },
    {
        //5. Proietta fornendo il category_code, la descrizione e il numero di utilizzo
        "$project": {
            "_id": 0,
            "wweia_category_code": "$_id",
            "category_description": 1,
            "total_count": 1
        }
    }
]);


