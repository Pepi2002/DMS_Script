db.foods.aggregate([
    {
        "$match": {
            "survey_data.wweia_category_code": { "$ne": null, "$exists": true }
        }
    },
    {
        "$group": {
            "_id": "$survey_data.wweia_category_code",
            "category_description": { "$first": "$survey_data.wweia_category_description" }, 
            "total_count": { "$sum": 1 }
        }
    },
    {
        "$sort": { "total_count": -1 }
    },
    {
        "$limit": 10
    },
    {
        "$project": {
            "_id": 0,
            "wweia_category_code": "$_id",
            "category_description": 1,
            "total_count": 1
        }
    }
]);

