db.foods.aggregate([
    {
        "$match": {
            "data_type": "market_acquistion"
        }
    },
    {
        "$unwind": "$acquisitions"
    },
    {
        "$group": {
            "_id": "$acquisitions.store_name",
            "total_acquisitions": { "$sum": 1 },
            "example_city": { "$first": "$acquisitions.store_city" },
            "sample_food_item": { "$first": "$description" }
        }
    },
    {
        "$match": {
            "_id": { "$ne": null, "$ne": "" }
        }
    },
    {
        "$sort": { "total_acquisitions": -1 }
    },
    {
        "$limit": 10
    },
    {
        "$project": {
            "_id": 0,
            "store_name": "$_id",
            "acquisition_count": "$total_acquisitions",
            "city_example": "$example_city",
            "sample_food_item": "$sample_food_item"
        }
    }
]);

