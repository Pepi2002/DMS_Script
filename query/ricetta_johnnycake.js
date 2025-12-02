
{}
db.foods.aggregate([
  // 1. Trova Johnnycake
  { 
    $match: { "fdc_id": 2343300 } 
  },

  // 2. Unisce Johnnycake con gli ingredienti
  {
    $lookup: {
      from: "ingredients",
      localField: "fdc_id",
      foreignField: "food_ref",
      as: "ingredienti_raw"
    }
  },

  // 3. Scompatta (necessario per poter ordinare gli ingredienti)
  { $unwind: "$ingredienti_raw" },

  // 4. Ordina per sequenza
  { 
    $sort: { "ingredienti_raw.seq_num": 1 } 
  },

  // 5- Ricompone il tutto in un unico documento
  {
    $group: {
      _id: "$_id", // Raggruppa per l'ID originale del cibo
      "Nome ricetta": { $first: "$description" }, // Prende il nome una volta sola
      "Lista ingredienti": { 
        $push: { // Spinge i dettagli degli ingredienti in un nuovo array ordinato
          "Step": "$ingredienti_raw.seq_num",
          "Ingrediente": "$ingredienti_raw.sr_description",
          "Peso (g)": "$ingredienti_raw.gram_weight"
        } 
      }
    }
  },

  // 6. Pulizia finale 
  {
    $project: {
      _id: 0,
      "Nome ricetta": 1,
      "Lista ingredienti": 1
    }
  }
])