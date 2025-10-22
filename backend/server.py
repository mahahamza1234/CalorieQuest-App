from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- MongoDB Connection ---
MONGO_URI = "mongodb+srv://mahakhalid_db_user:mwQGpfNd2wA7PREB@cluster0.wq9siz.mongodb.net/?retryWrites=true&w=majority"
DB_NAME = "pakistan_food_app"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
users = db["users"]
restaurants = db["restaurants"]
menu_items = db["menu_items"]

# Ensure GeoJSON index exists
restaurants.create_index([("location", "2dsphere")])

# --- API Endpoints ---

@app.route('/api/user', methods=['POST'])
def handle_user():
    data = request.get_json()
    name, email, weight = data.get('name'), data.get('email'), data.get('weight')

    if not all([name, email, weight]):
        return jsonify({"error": "Missing required fields"}), 400

    existing = users.find_one({"email": email})
    if existing:
        existing["_id"] = str(existing["_id"])
        return jsonify({"message": "User already exists", "user": existing}), 200

    new_user = {
        "name": name,
        "email": email,
        "current_weight_kg": weight,
        "preferences": []
    }
    result = users.insert_one(new_user)
    return jsonify({"message": "User created", "user_id": str(result.inserted_id)}), 201


@app.route('/api/restaurants/nearby', methods=['GET'])
def get_restaurants():
    postal_code = request.args.get('postal_code')
    if not postal_code:
        return jsonify({"error": "postal_code is required"}), 400

    # Find restaurants matching postal code
    matches = list(restaurants.find({"postal_code": postal_code}))
    if not matches:
        return jsonify({"error": "No restaurants found for this postal code"}), 404

    results = []
    for rest in matches:
        rest['_id'] = str(rest['_id'])
        # Add location field if missing (GeoJSON)
        if 'location' not in rest:
            rest['location'] = {
                "type": "Point",
                "coordinates": [rest['longitude'], rest['latitude']]
            }
            restaurants.update_one({"_id": rest['_id']}, {"$set": {"location": rest['location']}})

        # Fetch menu items linked by restaurant_id
        menus = list(menu_items.find({"restaurant_id": rest['_id']}))
        for m in menus:
            m['_id'] = str(m['_id'])
            m['restaurant_id'] = str(m['restaurant_id'])

        results.append({
            "restaurant": rest,
            "menu_items": menus
        })

    return jsonify(results), 200


if __name__ == '__main__':
    app.run(debug=True)
