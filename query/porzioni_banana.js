db.foods.aggregate([
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        data_type: "sr_legacy_food",
        description: {
          $regex: "Banana, raw",
          $options: "i"
        }
      }
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _id: 1,
        nome_cibo: "$description",
        // Mappa l'array portions per il frontend
        opzioni_porzione: {
          $map: {
            input: "$portions",
            as: "p",
            in: {
              nome: "$$p.modifier",
              // Es: "small (6\" to 6-7/8\" long)"
              peso_g: "$$p.gram_weight",
              // Es: 101
              id_porzione: "$$p.id" // Un ID interno se presente, o usa l'index
            }
          }
        }
      }
  }
]);
