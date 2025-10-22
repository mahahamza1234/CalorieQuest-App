import json
from pymongo import MongoClient

# --- Connection Details ---
MONGO_URI = "mongodb+srv://mahakhalid_db_user:mwQGpfNd2wA7PREB@cluster0.wq9siz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DB_NAME = "pakistan_food_app"
JSON_FILE_PATH = "backend/pakistan_restaurants_dataset.json"

# --- Collection Names ---
RESTAURANTS_COLLECTION = "restaurants"
MENU_ITEMS_COLLECTION = "menu_items"
USERS_COLLECTION = "users"

def import_data():
    client = None
    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        print(f"✅ Connected to MongoDB: {DB_NAME}")

        # --- 1. Load JSON ---
        with open(JSON_FILE_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)

        restaurants_data = data.get("restaurants", [])
        menu_items_data = data.get("menu_items", [])
        users_data = data.get("users", [])

        # --- 2. Clear Existing Data (Optional) ---
        db[RESTAURANTS_COLLECTION].delete_many({})
        db[MENU_ITEMS_COLLECTION].delete_many({})
        db[USERS_COLLECTION].delete_many({})
        print("🧹 Cleared old collections.")

        # --- 3. Insert Data ---
        if restaurants_data:
            db[RESTAURANTS_COLLECTION].insert_many(restaurants_data)
            print(f"🏬 Inserted {len(restaurants_data)} restaurants.")
        
        if menu_items_data:
            db[MENU_ITEMS_COLLECTION].insert_many(menu_items_data)
            print(f"🍔 Inserted {len(menu_items_data)} menu items.")
        
        if users_data:
            db[USERS_COLLECTION].insert_many(users_data)
            print(f"👤 Inserted {len(users_data)} users.")

        # --- 4. Verify ---
        for col in db.list_collection_names():
            print(f"📊 {col}: {db[col].count_documents({})} documents")

    except Exception as e:
        print(f"⚠️ Error: {e}")
    finally:
        if client:
            client.close()
            print("🔒 Connection closed.")

if __name__ == "__main__":
    import_data()
