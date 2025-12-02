import pandas as pd
import os
from pymongo import MongoClient

cartella_csv = "C:/Users/anziv/Desktop/dataset"
porta_mongodb = 27018
nome_db = "food_db"

# --- CONNESSIONE A MONGODB ---
try:
    client = MongoClient(f"mongodb://localhost:{porta_mongodb}")
    db = client[nome_db]
    print(f"Connesso a MongoDB su porta {porta_mongodb}, DB: '{nome_db}'")
except Exception as e:
    print(f"Errore connessione: {e}")
    exit()

# --- ELABORAZIONE FILE ---
if not os.path.exists(cartella_csv):
    print(f"Cartella non trovata: {cartella_csv}")
    exit()

for file in os.listdir(cartella_csv):
    if file.endswith(".csv"):
        percorso_csv = os.path.join(cartella_csv, file)
        nome_collezione = file.replace(".csv", "")
        collezione = db[nome_collezione]
        
        print(f"Elaborazione: {file} -> Collezione: '{nome_collezione}'")

        try:
            # 1. Leggi il CSV (senza toccare i dati)
            df = pd.read_csv(percorso_csv, low_memory=False)

            # 2. Converti in lista di dizionari (formato JSON nativo)
            dati_da_inserire = df.to_dict(orient="records")

            # 3. Inserisci in MongoDB
            if dati_da_inserire:
                collezione.insert_many(dati_da_inserire)
                print(f" -> Inseriti {len(dati_da_inserire)} documenti.")
            else:
                print(" -> File vuoto, nessun inserimento.")

        except Exception as e:
            print(f" -> ERRORE su {file}: {e}")
        
        print("-" * 30)

print("\nOperazione completata.")
