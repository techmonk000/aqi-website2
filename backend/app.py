from flask import Flask, jsonify, request
from flask_cors import CORS
import traceback
import logging
import sys
import sqlite3

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['GET'])
def predict():
    try:
        logger.info("Predict endpoint called")

        import model_runner
        logger.info("model_runner imported successfully")

        logger.info("Calling predict_from_db")
        result = model_runner.predict_from_db()
        logger.info(f"Got prediction result: {result}")

        return jsonify(result)
    except Exception as e:
        error_detail = traceback.format_exc()
        logger.error(f"Error in prediction: {str(e)}\n{error_detail}")
        return jsonify({"error": str(e), "traceback": error_detail}), 500

@app.route('/update', methods=['POST'])
def update_data():
    try:
        data = request.get_json()
        required_keys = ["NO", "NO2", "NOX", "NH3", "CO", "BENZENE", "TOLUENE", "XYLENE", "AQI"]

        if not all(k in data for k in required_keys):
            return jsonify({"error": "Missing required gas values"}), 400

        conn = sqlite3.connect('aqi_data.db')
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM aqi_readings")
        count = cursor.fetchone()[0]
        if count >= 24:
            cursor.execute("DELETE FROM aqi_readings WHERE id = (SELECT id FROM aqi_readings ORDER BY id LIMIT 1)")

        cursor.execute("""
            INSERT INTO aqi_readings (NO, NO2, NOx, NH3, CO, Benzene, Toluene, Xylene, AQI)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data["NO"],
            data["NO2"],
            data["NOX"],
            data["NH3"],
            data["CO"],
            data["BENZENE"],
            data["TOLUENE"],
            data["XYLENE"],
            data["AQI"]
        ))

        conn.commit()
        conn.close()

        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "API is running"})

if __name__ == '__main__':
    logger.info("Starting Flask app")
    app.run(host='0.0.0.0', port=5000, debug=True)
